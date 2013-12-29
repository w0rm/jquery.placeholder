jquery.placeholder
==================

Yet another jQuery placeholder plugin


[![Build Status](https://api.travis-ci.org/w0rm/jquery.placeholder.png)](https://travis-ci.org/w0rm/jquery.placeholder)

## History

Modern broswers toggle placeholder based on user input, while existing polyfills and some browsers with native support (ie10) hide placeholder on focus.

This plugin is my attempt to bring modern placeholder behavior to the browsers that do not support it.

## Features

* Works for text and password inputs
* Hides placeholder only when user starts typing
* $.fn.val and $.fn.prop properly get/set values
* $.fn.attr() properly gets/sets placeholder attribute
* Supports AMD

## Usage

    $('[placeholder]').placeholder(options)

## Options

* `force (boolean, default false)` — forces plugin in all browsers (useful to enable it in ie10 because of different placeholder behavior)
* `className (string, default 'placeholder')` — input gets this className when placeholder is active

## Running tests

	npm i --save-dev
	grunt
