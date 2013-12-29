define(function (require) {

  'use strict';

  var Placeholder = require('jquery.placeholder')
    , $ = require('jquery')
    , expect = require('expect')
    , options = {force: true, className: 'placeholder'}


  describe('jQuery placeholder', function () {

    var currentId = 0

    function makeInput (newAttrs) {
      var attrs = { id: 'input' + (++currentId)
                  , type: 'text'
                  , value: 'test value'
                  , placeholder: 'test placeholder'
                  }
      return $('<input>')
               .attr($.extend(attrs, newAttrs))
               .appendTo('#test')
    }

    it('should register as jquery plugin', function () {
      var $el = makeInput({value: ''})
      expect($.fn.placeholder).to.exist
      expect($el.placeholder(options)).to.equal($el)
    })

    it('should store itself in data', function () {
      var $el = makeInput({value: ''})
        , placeholderData = $el.placeholder(options).data('placeholder')
      expect(placeholderData).to.be.a(Placeholder)
    })

    it('should set empty text input value to placeholder', function () {
      var $el = makeInput({value: ''})
      expect($el.attr('placeholder')).to.equal($el.placeholder(options)[0].value)
      expect($el.hasClass(options.className)).to.be(true)
    })

    it('should show placeholder if value is set to empty', function () {
      var $el = makeInput()
        , placeholderAttr = $el.attr('placeholder')
      $el.placeholder(options).val('')
      expect($el[0].value).to.equal(placeholderAttr)
      expect($el.hasClass(options.className)).to.be(true)
    })

    it('should hide placeholder if value is set to non empty', function () {
      var value = 'test value'
        , $el = makeInput({value: ''}).placeholder().val(value)
      expect($el[0].value).to.equal(value)
      expect($el.hasClass(options.className)).to.be(false)
    })

    it('should return empty value if placeholder is active', function () {
      expect(makeInput({value: ''}).placeholder(options).val()).to.equal('')
      expect(makeInput({type: 'password', value: ''}).placeholder(options).val()).to.equal('')
    })

    it('should replace empty password input ' +
       'with input set to placeholder value', function () {
      var $el = makeInput({type: 'password', value: ''})
        , placeholderAttr = $el.attr('placeholder')
        , idAttr = $el.attr('id')
        , $replacement

      $el.placeholder(options)
      $replacement = $('#test').find('#' + idAttr)

      expect($replacement.attr('type')).to.equal('text')
      expect($replacement[0].value).to.equal(placeholderAttr)
      expect($replacement[0].name).to.equal('')
      expect($replacement.hasClass(options.className)).to.be(true)
    })

    it('should not show placeholder if value is not empty', function () {
      var $txtEl = makeInput()
        , $passEl = makeInput({type: 'password'})
      expect($txtEl[0].value).to.equal($txtEl.placeholder(options)[0].value)
      expect($passEl[0].value).to.equal($passEl.placeholder(options)[0].value)
    })

    it('should keep val and prop behavior before plugin init', function () {
      var $el = makeInput({value: 'test value'})
        , $emptyEl = makeInput({value: ''})
      expect($el.val()).to.equal('test value')
      expect($el.prop('value')).to.equal('test value')
      expect($emptyEl.val()).to.equal('')
      expect($emptyEl.val()).to.equal('')
    })

    it('should override val and prop behavior after plugin init', function () {
      var $el = makeInput({value: 'test value'}).placeholder(options)
        , $emptyEl = makeInput({value: ''}).placeholder(options)
      expect($el.val()).to.equal('test value')
      expect($el.prop('value')).to.equal('test value')
      expect($emptyEl.val()).to.equal('')
      expect($emptyEl.val()).to.equal('')
    })

    it('should not initialize in modern browsers', function () {
      var $el = makeInput().placeholder()
        , isInputSupported = 'placeholder' in document.createElement('input');
      expect(isInputSupported && !!$el.data('placeholder')).to.be(false)
    })

    it('should be able to change with $.fn.attr', function () {
      var $el = makeInput({value: ''}).placeholder(options)
      $el.attr('placeholder', 'new value')
      expect($el[0].value).to.equal('new value')
      expect($el.attr('placeholder')).to.equal('new value')
    })

    it('should be able to change with $.fn.attr for password field', function () {
      var $el = makeInput({value: '', type: 'password'})
        , idAttr = $el.attr('id')
        , $replacement

      $el.placeholder(options)
      $replacement = $('#test').find('#' + idAttr)
      $el.attr('placeholder', 'new value')
      expect($replacement[0].value).to.equal('new value')
      expect($el.attr('placeholder')).to.equal('new value')
    })

    it('should be able to change with $.fn.attr for modern browsers', function () {
      var $el = makeInput({value: ''}).placeholder()
      $el.attr('placeholder', 'new value')
      expect($el.attr('placeholder')).to.equal('new value')
    })

    afterEach(function () {
      $('#test').empty()
    })

  })

});
