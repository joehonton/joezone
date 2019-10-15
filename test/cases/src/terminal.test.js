//=============================================================================
// File:         joezone/test/cases/terminal.test.js
// Language:     Bequiesce
// Copyright:    Joe Honton © 2019
// License:      CC-BY-NC-ND 4.0
// Initial date: Oct 15, 2019
//=============================================================================

// @common
import terminal from '../../../dbg/terminal.namespace';

//@using trace
terminal.trace(message);
//@testing trace
var message = "abcdefg";		;; true

//@using invalid
terminal.invalid(message);
//@testing invalid
var message = "abcdefg";		;; true

//@using warning
terminal.warning(message);
//@testing warning
var message = "abcdefg";		;; true

//@using error
terminal.error(message);
//@testing error
var message = "abcdefg";		;; true

//@using abnormal
terminal.abnormal(message);
//@testing abnormal
var message = "abcdefg";		;; true

//@using logic
terminal.logic(message);
//@testing logic
var message = "abcdefg";		;; true
