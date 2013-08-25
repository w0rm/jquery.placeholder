require.config({
  baseUrl: '../src/'
, paths: {
    jquery: '../lib/jquery/jquery'
  , mocha: '../lib/mocha/mocha'
  , expect: '../lib/expect/expect'
  }
, shim: {
    expect: {exports: 'expect'}
  , mocha: {
      init: function () {
        'use strict';
        this.mocha.ui('bdd')
        return this.mochaPhantomJS || this.mocha
      }
    }
  }
})

require(['mocha', '../spec/test.js'], function (mocha) {
  'use strict';
  mocha.run()
})
