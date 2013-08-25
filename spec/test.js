define(function (require) {

  'use strict';

  var Placeholder = require('jquery.placeholder')
    , $ = require('jquery')
    , options = {force: true, className: 'placeholder'}


  describe('jQuery placeholder plugin', function () {

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
      expect(placeholderData).to.be.an.instanceof(Placeholder)
    })

    it('should set empty text input value to placeholder', function () {
      var $el = makeInput({value: ''})
      expect($el.attr('placeholder')).to.equal($el.placeholder(options)[0].value)
      expect($el.hasClass(options.className)).to.be.true
    })

    it('should set input value to placeholder if value is set to empty', function () {
      var $el = makeInput()
        , placeholderAttr = $el.attr('placeholder')
      $el.placeholder(options).val('')
      expect($el[0].value).to.equal(placeholderAttr)
      expect($el.hasClass(options.className)).to.be.true
    })

    it('should return empty value if placeholder is active', function () {
      expect(makeInput({value: ''}).placeholder(options).val()).to.equal('')
      expect(makeInput({type: 'password', value: ''}).placeholder(options).val()).to.equal('')
    })

    it('should replace empty password input ' +
       'with text input which value is set to placeholder', function () {
      var $el = makeInput({type: 'password', value: ''})
        , placeholderAttr = $el.attr('placeholder')
        , idAttr = $el.attr('id')
      $el.placeholder(options)
      expect($('#' + idAttr).attr('type')).to.equal('text')
      expect($('#' + idAttr)[0].value).to.equal(placeholderAttr)
      expect($('#' + idAttr).hasClass(options.className)).to.be.true
    })

    it('should keep input value', function () {
      var $txtEl = makeInput()
        , $passEl = makeInput({type: 'password'})
      expect($txtEl[0].value).to.equal($txtEl.placeholder(options)[0].value)
      expect($passEl[0].value).to.equal($passEl.placeholder(options)[0].value)
    })

    afterEach(function () {
      $('#test').empty()
    })

  })

});
