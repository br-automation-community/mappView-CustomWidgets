'use strict';
define(['brTest'], 
    function ({ jasmine: { matcherFactory } }) {
  
        var matcherFn = {
            compareJQUERYObject: function (actual, expected) {
                var identicalClass = false,
                    identicalID = false,
                    identicalTag = false;

                if (actual.attr('class') === expected.attr('class')) {
                    identicalClass = true;
                }
                if (actual.attr('id') === expected.attr('id')) {
                    identicalID = true;
                }
                if (actual[0].tagName === expected[0].tagName) {
                    identicalTag = true;
                }
    
                if (identicalClass && identicalID && identicalTag) {
                    return {
                        pass: true
                    };
                } else {
                    return {
                        pass: false,
                        message: 'Expected HTML-Tag, id and classes to be equal'
                    };
                }
            },
            compareHTMLNode: function (actual, expected) {
                var identicalHTML = actual.outerHTML === expected,
                    message;
                if (!identicalHTML) {
                    message = 'Expected HTML to be equal';
                }
                return {
                    pass: identicalHTML,
                    message: message
                };
            },
            isFunction: function (actual) {
                var isFunction = typeof actual === 'function',
                    message;
                if (!isFunction) {
                    message = 'Expected ' + actual + ' to be a function';
                }
                return {
                    pass: isFunction,
                    message: message
                };
            }
        };

        var GenericUnitTestMatchers = {};

        for (var matcherName in matcherFn) {
            GenericUnitTestMatchers[matcherName] = matcherFactory.createMatcher(matcherFn[matcherName]);
        }
    
        return GenericUnitTestMatchers;
    });
