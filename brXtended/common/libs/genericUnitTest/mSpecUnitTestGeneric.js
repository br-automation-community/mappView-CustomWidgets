'use strict';
define([
    './Suites/mSpecUnitTestInit',
    './Suites/mSpecUnitTestFunctions',
    './TestUtils/GenericUnitTestMatchers',
    'brTest',
    '../Test/Jasmine-moduleTest'
], function (
    mSpecUnitTestInit, mSpecUnitTestFunctions, GenericUnitTestMatchers, { jasmine: { matcherFactory } }
) {

    return {
        suite: function (specParam) {    

            m.describe(specParam.run, 'UnitTest', function () {   
                
                var initRun = (specParam.init && specParam.init.run) ? specParam.init.run : false,
                    functionsRun = (specParam.functions && specParam.functions.run) ? specParam.functions.run : false;

                beforeEach(function () {
                    matcherFactory.addMatchers(this, GenericUnitTestMatchers);
                });
                m.describe(initRun, 'initialization', mSpecUnitTestInit.suite, [specParam]);

                m.describe(functionsRun, 'functions', mSpecUnitTestFunctions.suite, [specParam]);
            });
        }
    };
});
