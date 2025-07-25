define([
    'widgets/brXtended/common/libs/genericUnitTest/TestUtils/GenericUnitTestConstants'
], function (GenericUnitTestConstants) {

    'use strict';

    var cSpec = {
        run: true
    };

    cSpec.init = { // data for the init of the module under test
        run: true,
        args: { //arguments with wich the module will be instanziated (max args1 ... args7)
            args1: undefined,
            args2: undefined,
            args3: true
        },
        module: undefined, //the module under test, needs to be defined!
        functionsToSpyOn: {} // functions which will be called on instanziating the module
    };

    cSpec.functions = { //data for the functions to test in the module
        run: true,
        functionUnderTest: {
            functionUnderTestName: {
                run: true,
                testCases: [
                    {
                        setUpData: { //data which needs to be adjusted before so the test can be performed. eg: brease.config.editMode
                            dataName: { //the name of the data which needs to be set up
                                type: GenericUnitTestConstants.BREASE_CONFIG, // where the data is located.
                                value: undefined //the vale which should be set before the test
                            }
                        },
                        args: [], //arguments for the funtion under test
                        functionsToSpyOn: { //functions which are called in the function under test, spies will be added automatical to this function
                            functionName: {
                                parentModuleType: GenericUnitTestConstants.MUT, //the type of the parentModuleType where the function to spy on is located
                                parentModuleName: undefined, //the name of the parentModule if the parentModuleType is a sub module of the mut
                                parentModule: undefined, //the instance of the parentModule if the parentModuleType is standalone
                                callArgs: { //the arguments which the spied function should have been called
                                    call1: { //arguments of the first Call
                                        arg1: { //first argument of the first call
                                            matcher: undefined, //the used matcher for this argument, if undefinded "toEqual" is used
                                            expectedValue: undefined // the expected Value
                                        }
                                    }
                                },
                                callsCount: 0, //callcount of the spied function
                                return: [//an array of the mocked return values of the spied function.
                                    undefined // first entry is the returned value when the spy is called for the first time. for ever call one entry needs to be added
                                ] 
                            }
                        },
                        setterData: { //data which needs to be checked this object is always loctated at mut[setterDataName]
                            setterDataName: undefined //name of the setterData and the expected Data, may also be an object
                        },
                        return: undefined //return value of the funtion under test
                    }
                ]
            }
        }
    };

    return cSpec;
});
