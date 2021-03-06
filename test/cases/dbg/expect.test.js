//=============================================================================
// File:         joezone/test/cases/expect.test.js
// Language:     Bequiesce
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 13, 2015
//=============================================================================

// @common
var expect = require('../../../dbg/expect.function.js');
class Simple {};
class SubClass extends Simple {}; 

// @using instantiate and check
var b = expect(obj, type, message);

// @testing basic JavaScript types
var obj = []; 				var type = 'Array'; 	var message = '';				;; b == true
var obj = ''; 				var type = 'String'; 	var message = '';				;; b == true
var obj = new Date(); 		var type = 'Date'; 		var message = '';				;; b == true
var obj = 1;			 	var type = 'Number'; 	var message = '';				;; b == true
var obj = function () {};	var type = 'Function'; 	var message = '';				;; b == true
var obj = /test/i; 			var type = 'RegExp'; 	var message = '';				;; b == true
var obj = true; 			var type = 'Boolean'; 	var message = '';				;; b == true
var obj = null; 			var type = 'null'; 		var message = '';				;; b == true
var obj = undefined; 		var type = 'undefined'; var message = '';				;; b == true

// @testing classes
var obj = new Simple(); 	var type = 'Simple'; 	var message = '';				;; b == true
var obj = new SubClass(); 	var type = 'SubClass'; 	var message = '';				;; b == true

// waiting for shuntErr(null)
//var obj = new SubClass(); 	var type = 'Simple'; 	var message = '';				;; b == false
