//=============================================================================
//
// File:         joezone/src/use.class.js
// Language:     ECMAScript 2015
// Copyright:    Joe Honton © 2015
// License:      CC-BY-NC-ND 4.0
// Initial date: Sep 27, 2015
// Contents:     Use default value when parameter is undefined 
//
//=============================================================================

export default function use(param, value) {
	return (param == undefined) ? value : param;
}
