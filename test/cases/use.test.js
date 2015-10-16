//=============================================================================
// File:         joezone/test/cases/use.test.js
// Language:     Bequiesce
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 27, 2015
//=============================================================================

// @common
import use from '../../src/use.function';
var fn = function(a,b,c) {
	a = use(a, 10);
	b = use(b, 20);
	c = use(c, 30);
	return a + b + c;
}

// @using simple addition

// @testing missing parameters
var result = fn(1, 2, 3);	;; result == 6;
var result = fn(1, 2);		;; result == 33;
var result = fn(1);			;; result == 51;
var result = fn();			;; result == 60;
							
							