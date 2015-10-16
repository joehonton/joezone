//=============================================================================
// File:         joezone/test/cases/log.test.js
// Language:     Bequiesce
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 13, 2015
//=============================================================================

// @common
import Log from '../../src/log.class';
var log = new Log();

//@using todo
log.todo(message);
//@testing todo
var message = "abcdefg";		;; true

//@using trace
log.trace(message);
//@testing trace
var message = "abcdefg";		;; true

//@using normal
log.normal(message);
//@testing normal
var message = "abcdefg";		;; true

//@using abnormal
log.abnormal(message);
//@testing abnormal
var message = "abcdefg";		;; true

//@using invalid
log.invalid(message);
//@testing invalid
var message = "abcdefg";		;; true

//@using security
log.security(message);
//@testing security
var message = "abcdefg";		;; true

//@using logic
log.logic(message);
//@testing logic
var message = "abcdefg";		;; true
