// @common
import Log from '../../src/log.class';
var log = new Log();

//@using
log.todo(message);
//@testing
var message = "abcdefg";		;; true

//@using
log.trace(message);
//@testing
var message = "abcdefg";		;; true

//@using
log.normal(message);
//@testing
var message = "abcdefg";		;; true

//@using
log.abnormal(message);
//@testing
var message = "abcdefg";		;; true

//@using
log.invalid(message);
//@testing
var message = "abcdefg";		;; true

//@using
log.security(message);
//@testing
var message = "abcdefg";		;; true

//@using
log.logic(message);
//@testing
var message = "abcdefg";		;; true
