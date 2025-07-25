define([
    'widgets/brXtended/common/libs/genericUnitTest/TestUtils/GenericUnitTestUtils',
    'widgets/brXtended/common/libs/Test/Jasmine-moduleTest'
], function (GenericUnitTestUtils) {

    'use strict';

    return {
        suite: function (specParam) {    

            var mut, returnedValue, functionUnderTestData,
                functionName, testCaseData, subFunctionName;

            for (functionName in specParam.functions.functionUnderTest) {

                functionUnderTestData = specParam.functions.functionUnderTest[functionName];

                (function (functionName, functionUnderTestData) {

                    m.describe(functionUnderTestData.run, functionName, function () {

                        for (var testCaseIndex = 0; testCaseIndex < functionUnderTestData.testCases.length; testCaseIndex += 1) {
                        
                            testCaseData = GenericUnitTestUtils.getTestCaseData(functionUnderTestData.testCases[testCaseIndex], specParam.init);

                            (function (testCaseIndex, testCaseData) {

                                m.describe(true, 'testCase ' + (testCaseIndex + 1), function () {
                                
                                    beforeEach(function () {
                                        mut = GenericUnitTestUtils.initModule(testCaseData.init);
                                        GenericUnitTestUtils.testSetup(mut, testCaseData.data.setUpData);
                                        GenericUnitTestUtils.addFunctionsSpies(mut, testCaseData.data.functionsToSpyOn);
                                        returnedValue = GenericUnitTestUtils.callTestFunction(mut, functionName, testCaseData.data.args);
                                    });

                                    afterEach(function () {
                                        GenericUnitTestUtils.testTearDown(mut, testCaseData.data.setUpData);
                                        mut = null;
                                        returnedValue = null;
                                    });

                                    m.it(testCaseData.returnValueRun, 'the returned value should be ' + testCaseData.data.return, function () {
                                        expect(returnedValue).toEqual(testCaseData.data.return);
                                    });
                              
                                    m.describe(testCaseData.functionSpyRun, 'check if the calls of functions inside tested function are called correct', function () {

                                        for (subFunctionName in testCaseData.data.functionsToSpyOn) {

                                            (function (subFunctionName, testCaseData) {

                                                m.describe(testCaseData.functionSpyRun, subFunctionName, function () {

                                                    var expectedValue = testCaseData.data.functionsToSpyOn[subFunctionName].callsCount,
                                                        testFunctionData, testFunctionSpy, moduleToSpyOn;
                                            
                                                    beforeEach(function () {
                                                        testFunctionData = testCaseData.data.functionsToSpyOn[subFunctionName];
                                                        moduleToSpyOn = GenericUnitTestUtils._getModule(mut, testFunctionData.parentModuleType, testFunctionData.parentModuleName, testFunctionData.parentModule);
                                                        testFunctionSpy = moduleToSpyOn[subFunctionName];
                                                    });
    
                                                    afterEach(function () {
                                                        testFunctionData = null;
                                                        moduleToSpyOn = null;
                                                        testFunctionSpy = null;
                                                    });
                                                        
                                                    m.it(testCaseData.functionSpyRun, 'callcount should be ' + expectedValue, function () {
                                                        expect(testFunctionSpy.calls.count()).toBe(testFunctionData.callsCount);
                                                    });
                                                    
                                                    for (var callEntry in testCaseData.data.functionsToSpyOn[subFunctionName].callArgs) {

                                                        for (var argEntry in testCaseData.data.functionsToSpyOn[subFunctionName].callArgs[callEntry]) {

                                                            var argData = testCaseData.data.functionsToSpyOn[subFunctionName].callArgs[callEntry][argEntry];

                                                            (function (callEntry, argEntry, argData) {

                                                                var expectedValue = argData.expectedValue,
                                                                    argumentNumber = argEntry.substring(3, 4),
                                                                    callcountNumber = callEntry.substring(4, 5);

                                                                m.it(testCaseData.functionSpyRun, argumentNumber + '. argument of the ' + callcountNumber + '.call should be ' + expectedValue, function () {
                                                                    
                                                                    var matcher = GenericUnitTestUtils._getMatcher(argData.matcher),
                                                                        callIndex = parseInt(callcountNumber, 0) - 1,
                                                                        argIndex = parseInt(argumentNumber, 0) - 1;

                                                                    var actualValue = testFunctionSpy.calls.argsFor(callIndex)[argIndex];
                                                                    expect(actualValue)[matcher](argData.expectedValue);
                                                                });

                                                            })(callEntry, argEntry, argData);
                                                        }
                                                    }
                                                });

                                            })(subFunctionName, testCaseData);
                                        }
                                    });

                                    m.describe(testCaseData.setterRun, 'check if the setter data is set correct', function () {
                                        
                                        for (var setterEnty in testCaseData.data.setterData) {

                                            (function (setterEnty, testCaseData) {
                                            
                                                var expectedValue = testCaseData.data.setterData[setterEnty];

                                                m.it(testCaseData.setterRun, setterEnty + ' should be ' + expectedValue, function () {                                
                                                    GenericUnitTestUtils.checkSetterData(mut, testCaseData.data.setterData);
                                                });

                                            })(setterEnty, testCaseData);
                                        }
                                    });     
                                });
                            })(testCaseIndex, testCaseData);
                        }
                    });
                    
                })(functionName, functionUnderTestData);
            }

        }
    };
});
