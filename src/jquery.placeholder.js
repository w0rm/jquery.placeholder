/*
  jQuery placeholder plugin
  by Andrey Kuzmin, @unsoundscapes

  Based on existing plugin http://mths.be/placeholder by @mathias
  Adopted to toggle placeholder on user input instead of focus

  Released under the MIT license
*/

(function (factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as anonymous module.
    define(['jquery'], factory)
  } else {
    // Browser globals.
    factory(jQuery)
  }
}(function ($) {
  'use strict';

  var isInputSupported = 'placeholder' in document.createElement('input')
    , isTextareaSupported = 'placeholder' in document.createElement('textarea')
    , Placeholder
    , $placeholders = $()

  function getAttributes (elem) {
    // Return an object of element attributes
    var newAttrs = {}
      , rinlinejQuery = /^jQuery\d+$/

    $.each(elem.attributes, function () {
      if (this.specified && !rinlinejQuery.test(this.name)) {
        newAttrs[this.name] = this.value
      }
    })
    return newAttrs
  }

  function setCaretTo (el, index) {
    // Set caret to specified @index
    if (el.createTextRange) {
      var range = el.createTextRange()
      range.move('character', index)
      range.select()
    } else if (el.selectionStart !== null) {
      el.focus()
      el.setSelectionRange(index, index)
    }
  }


  Placeholder = function (element, options) {
    this.options = options || {}
    this.$replacement = this.$el = $(element)
    if ( this.$el.is('[placeholder]') && (this.options.force ||
        !isInputSupported && this.$el.is('input') ||
        !isTextareaSupported && this.$el.is('textarea'))
       ) {
      this.initialize.apply(this, arguments)
      // Cache all elements with placeholders
      $placeholders = $placeholders.add(element)
    }
  }

  Placeholder.prototype = {

    initialize: function () {
      this.isActive = false
      this.placeholderAttr = this.$el.attr('placeholder')
      // do not mess with default behavior
      this.$el.removeAttr('placeholder')
      this.isPassword = this.$el.is('[type=password]')
      if (this.isPassword) this.makeReplacement()
      this.$replacement.on({
        'keydown.placeholder': $.proxy(this.clearPlaceholder, this)
      , 'focus.placeholder drop.placeholder click.placeholder': $.proxy(this.setCaret, this)
      })
      this.$el.on({
        'blur.placeholder keyup.placeholder': $.proxy(this.restorePlaceholder, this)
      })
      this.restorePlaceholder()
    }

    // Set value and clear or restore placeholder
  , setValue: function (value) {
      if (value === '') {
        if (this.isActive) {
          return;
        } else {
          this.$el[0].value = value
          this.restorePlaceholder()
        }
      } else {
        if (this.isActive) this.clearPlaceholder()
        this.$el[0].value = value
      }
    }

    // Clear placeholder value at user input
  , clearPlaceholder: function (e) {
      var isActiveElement
      if (!this.isActive) return;
      if (!e || !(e.shiftKey && e.keyCode === 16) && e.keyCode !== 9) {
        this.isActive = false
        if (this.isPassword) {
          isActiveElement = this.$replacement.is(':focus')
          this.$replacement.after(this.$el).detach()
          if (isActiveElement) this.$el.focus()
        } else {
          this.$el[0].value = ''
          this.$el.removeClass(this.options.className)
        }
      }
    }

    // Restore placeholder on blur and keyup
  , restorePlaceholder: function () {
      var isActiveElement = this.$el.is(':focus')
      if (this.isActive) return;
      if (this.$el[0].value === '') {
        this.isActive = true
        if (this.isPassword) {
          this.$el.after(this.$replacement).detach()
          if (isActiveElement) this.$replacement.focus()
        } else {
          this.$el[0].value = this.placeholderAttr
          this.$el.addClass(this.options.className)
          if (isActiveElement) this.setCaret.apply(this, arguments)
        }
      }
    }

    // Set caret at the beginning of the input
  , setCaret: function (e) {
      if (this.isActive && e) {
        setCaretTo(this.$replacement[0], 0)
        e.preventDefault()
      }
    }

    // Make and return replacement element
  , makeReplacement: function () {
      // we can't use $.fn.clone because ie <= 8 doesn't allow type change
      var replacementAttributes =
        $.extend(
          getAttributes(this.$el[0])
        , { 'type': 'text'
          , 'value': this.placeholderAttr
          }
        )

      // replacement should not have input name
      delete replacementAttributes.name

      this.$replacement = $('<input>', replacementAttributes)
        .data('placeholder', this)
        .addClass(this.options.className)

      return this.$replacement;
    }

  }


  // Override jQuery val and prop hooks
  $.valHooks.input = $.valHooks.textarea = $.propHooks.value = {
    get: function (element) {
      var placeholder = $(element).data('placeholder')
      return placeholder && placeholder.isActive ? '' : element.value;
    }
  , set: function (element, value) {
      var placeholder = $(element).data('placeholder')
      if (!placeholder) {
        return element.value = value;
      } else {
        placeholder.setValue(value)
        // `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
        return element
      }
    }
  }


  // Plugin definition
  $.fn.placeholder = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('placeholder')
        , options = $.extend({}, $.fn.placeholder.defaults, typeof option === 'object' && option)
      if (!data) $this.data('placeholder', data = new Placeholder(this, options))
      if (typeof option === 'string') data[option]()
    })
  }
  $.fn.placeholder.defaults = {
    force: false
  , className: 'placeholder'
  }
  $.fn.placeholder.Constructor = Placeholder


  // Events
  $(document).on('submit.placeholder', 'form', function () {
    // Clear the placeholder values so they don't get submitted
    $placeholders.placeholder('clearPlaceholder')
    // And then restore them back
    setTimeout(function () { $placeholders.placeholder('restorePlaceholder') }, 10)
  })
  $(window).on('beforeunload.placeholder', function () {
    // Clear placeholders upon page reload
    $placeholders.placeholder('clearPlaceholder')
  })

  return Placeholder

}));
