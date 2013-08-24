require.config({
  baseUrl: '../src/'
, paths: {
    jquery: '../lib/jquery/jquery'
  , mocha: '../lib/mocha/mocha'
  , chai: '../lib/chai/chai'
  }
, shim: {
    mocha: {
      init: function () {
        'use strict';
        this.mocha.ui('bdd')
        return this.mochaPhantomJS || this.mocha
      }
    }
  }
})

require(['chai', 'mocha'], function (chai, mocha) {

  'use strict';

  window.expect = chai.expect

  require(['../spec/test.js'], function () {
    mocha.run()
  })

})
