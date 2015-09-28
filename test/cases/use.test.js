// @common
import use from '../../src/use.function';
var fn = function(a,b,c) {
	a = use(a, 10);
	b = use(b, 20);
	c = use(c, 30);
	return a + b + c;
}

// @using


// @testing
var result = fn(1, 2, 3);	;; result == 6;
var result = fn(1, 2);		;; result == 33;
var result = fn(1);			;; result == 51;
var result = fn();			;; result == 60;
							
							