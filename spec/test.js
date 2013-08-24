define(function (require) {

  var Placeholder = require('jquery.placeholder')
    , $ = require('jquery')
    , options = {force: true, className: 'placeholder'}


  describe('jQuery placeholder plugin', function () {

    var $textInputWithoutValue
      , $textInputWithValue
      , $passwordInputWithoutValue
      , $passwordInputWithValue

    beforeEach(function () {
      $textInputWithoutValue = $('<input id="text1" placeholder="test placeholder" type="text">')
      $textInputWithValue = $('<input id="text2" value="test value" placeholder="test placeholder" type="text">')
      $passwordInputWithoutValue = $('<input id="password1" placeholder="test placeholder" type="password">')
      $passwordInputWithValue = $('<input id="password2" value="test value" placeholder="test placeholder" type="password">')

      $('#test').append(
        $textInputWithoutValue
      , $textInputWithValue
      , $passwordInputWithoutValue
      , $passwordInputWithValue
      )
    })

    it('should register as jquery plugin', function () {
      expect($.fn.placeholder).to.exist
      expect($textInputWithoutValue.placeholder(options)).to.equal($textInputWithoutValue)
    })

    it('should store itself in data', function () {
      var placeholderData = $textInputWithoutValue.placeholder(options).data('placeholder')
      expect(placeholderData).to.be.an.instanceof(Placeholder)
    })

    it('should set empty text input value to placeholder', function () {
      expect($textInputWithoutValue.attr('placeholder')).to.equal($textInputWithoutValue.placeholder(options)[0].value)
    })

    it('should set input value to placeholder if value is set to empty', function () {
      var placeholderAttr = $passwordInputWithoutValue.attr('placeholder')
      $textInputWithValue.placeholder(options)
      $textInputWithValue.val('')
      expect($textInputWithValue[0].value).to.equal(placeholderAttr)
      expect($textInputWithValue.hasClass(options.className)).to.be.true
    })

    it('should return empty value if placeholder is active', function () {
      expect($textInputWithoutValue.placeholder(options).val()).to.equal('')
      expect($passwordInputWithoutValue.placeholder(options).val()).to.equal('')
    })

    it('should replace empty password input with text input which value is set to placeholder', function () {
      var placeholderAttr = $passwordInputWithoutValue.attr('placeholder')
        , idAttr = $passwordInputWithoutValue.attr('id')
      $passwordInputWithoutValue.placeholder(options)
      expect($('#' + idAttr).attr('type')).to.equal('text')
      expect($('#' + idAttr)[0].value).to.equal(placeholderAttr)
    })

    it('should keep input value', function () {
      expect($textInputWithValue[0].value).to.equal($textInputWithValue.placeholder(options)[0].value)
      expect($passwordInputWithValue[0].value).to.equal($passwordInputWithValue.placeholder(options)[0].value)
    })

    afterEach(function () {
      $('#test').empty()
    })

  })

});
