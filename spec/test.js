define(function (require) {

  var Placeholder = require('jquery.placeholder')

  describe('Test', function () {

    it('should register as jquery plugin', function() {
      expect($.fn.placeholder).to.exist
    })

  })

});
