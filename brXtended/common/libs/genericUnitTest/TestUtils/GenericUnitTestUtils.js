'use strict';
define([
    'brTest',
    'widgets/brXtended/common/libs/genericUnitTest/TestUtils/GenericUnitTestConstants'
], function ({ core: { BaseWidget },
    config: breaseConfig,
    controller: { uiController }, 
    TestUtils }, GenericUnitTestConstants) {
  
    var GenericUnitTestUtils = {};
    GenericUnitTestUtils.originalData = {};
    GenericUnitTestUtils.returnValues = {};

    GenericUnitTestUtils.initModule = function (initParams) {
        var MUT = initParams.module,
            args = initParams.args,
            functionsToSpyOn = initParams.functionsToSpyOn,
            moduleInstance,
            spyOnInitFunctions = jQuery.isEmptyObject(functionsToSpyOn);

        if (!spyOnInitFunctions) {
            GenericUnitTestUtils.addFunctionsSpies(MUT.prototype, functionsToSpyOn);
        }

        switch (args) {
            case GenericUnitTestConstants.OBJECT:
                moduleInstance = MUT;
                break;
            default:
                moduleInstance = new MUT(args.arg1, args.arg2, args.arg3, args.arg4, args.arg5, args.arg6, args.arg7, args.arg8);
        }
        
        return moduleInstance;
    };

    GenericUnitTestUtils.callTestFunction = function (mut, functionName, args) {
        var returnedValue;

        if (functionName === 'reducer') {
            returnedValue = mut.apply(mut, args);
        } else {
            if (TestUtils.isSpy(mut[functionName])) {
                mut[functionName].and.callThrough();
            }
            returnedValue = mut[functionName].apply(mut, args);
        }

        return returnedValue;
    };

    GenericUnitTestUtils._getModule = function (mut, moduleType, moduleName, parentmodule) {
        var selectedModule;
        switch (moduleType) {
            case GenericUnitTestConstants.MUT:       
                selectedModule = mut;
                break;
            case GenericUnitTestConstants.JQUERY:
                selectedModule = $;
                break;
            case GenericUnitTestConstants.JQUERY_PROTOTYPE:
                selectedModule = $.fn;
                break;  
            case GenericUnitTestConstants.CONSOLE:
                selectedModule = console;
                break;
            case GenericUnitTestConstants.OBJECT:
                selectedModule = Object;
                break;
            case GenericUnitTestConstants.EVENT:
                selectedModule = GenericUnitTestConstants.EVENTMOCK;
                break;
            case GenericUnitTestConstants.BASEWIDGET:
                selectedModule = BaseWidget.prototype;
                break;
            case GenericUnitTestConstants.BREASE_UICONTROLLER:
                selectedModule = uiController;
                break;
            case GenericUnitTestConstants.SUBMODULE:
                selectedModule = GenericUnitTestUtils._getSubModule(mut, moduleName);
                if (selectedModule === undefined) {
                    console.iatWarn("no Module with type :'" + moduleName + "' found in module under test. check init data");
                }
                break;
            case GenericUnitTestConstants.STAND_ALONE:
                if (moduleName === undefined) {
                    selectedModule = parentmodule;
                } else {
                    selectedModule = GenericUnitTestUtils._getSubModule(parentmodule, moduleName);
                }
                if (selectedModule === undefined) {
                    console.iatWarn('no Module standalone Module found. check cspec if module was defined');
                }
                break;
            default:
                console.iatWarn("unknowen moduletype set:'" + moduleType + "'!");
        }

        return selectedModule;
    };

    GenericUnitTestUtils._getSubModule = function (mut, moduleName) {
        var splitModuleName = moduleName.split('.'),
            selectedModule = mut[splitModuleName[0]];
        for (var i = 1; i < splitModuleName.length; i += 1) {
            selectedModule = selectedModule[splitModuleName[i]];
        }
        return selectedModule;
    };

    GenericUnitTestUtils._getMatcher = function (matcherName) {
        var matcher;
        switch (matcherName) {
            case GenericUnitTestConstants.COMPARE_JQUERYOBJECT:
                matcher = 'compareJQUERYObject';
                break;
            case GenericUnitTestConstants.COMPARE_HTML:
                matcher = 'compareHTMLNode';
                break;
            case GenericUnitTestConstants.ISFUNCTION:
                matcher = 'isFunction';
                break;
            default:
                matcher = 'toEqual';
        }
        return matcher;
    };

    GenericUnitTestUtils.addFunctionsSpies = function (mut, testFunctions) {
        var testFunctionName,
            testFunctionObj,
            moduleToSpyOn;

        for (testFunctionName in testFunctions) {
            
            if (testFunctions.hasOwnProperty(testFunctionName)) {
                testFunctionObj = testFunctions[testFunctionName];
                moduleToSpyOn = GenericUnitTestUtils._getModule(mut, testFunctionObj.parentModuleType, testFunctionObj.parentModuleName, testFunctionObj.parentModule);
               
                GenericUnitTestUtils.returnValues[testFunctionName] = testFunctionObj.return;
               
                (function (testFunctionName, moduleToSpyOn) {
                    
                    spyOn(moduleToSpyOn, testFunctionName).and.callFake(function () {
                        return GenericUnitTestUtils._getReturnValue(moduleToSpyOn, testFunctionName);
                    });
                    
                })(testFunctionName, moduleToSpyOn);
            }
        }
    };

    GenericUnitTestUtils._getReturnValue = function () {
        var mut = arguments[0],
            functionName = arguments[1],
            index = mut[functionName].calls.count() - 1;
        
        return GenericUnitTestUtils.returnValues[functionName][index];
    };

    GenericUnitTestUtils.checkSetterData = function (mut, setterData) {
        if (setterData instanceof jQuery) {
            expect(mut).compareJQUERYObject(setterData);
        } else {
            for (var key in setterData) {
                if (typeof (setterData[key]) === 'object') {
                    if (Object.keys(setterData[key]).length > 0) {
                        GenericUnitTestUtils.checkSetterData(mut[key], setterData[key]);
                    } else {
                        expect(mut[key]).toEqual(setterData[key]);
                    }
                } else {
                    expect(mut[key]).toEqual(setterData[key]);
                }
            }
        }
    };

    GenericUnitTestUtils.testSetup = function (mut, setUpData) {
        for (var entry in setUpData) {
            switch (setUpData[entry].type) {
                case GenericUnitTestConstants.BREASE_CONFIG:
                    GenericUnitTestUtils.originalData[entry] = breaseConfig[entry];
                    breaseConfig[entry] = setUpData[entry].value;
                    break;
                case GenericUnitTestConstants.SETTING:
                    GenericUnitTestUtils.originalData[entry] = mut.settings[entry];
                    mut.settings[entry] = setUpData[entry].value;
                    break;
                case GenericUnitTestConstants.BINDING:
                    GenericUnitTestUtils.originalData['bindings'] = mut.bindings;
                    mut.bindings = {};
                    mut.bindings[entry] = setUpData[entry].value;
                    break;
                case GenericUnitTestConstants.DATA:
                    GenericUnitTestUtils.originalData[entry] = mut[entry];
                    mut[entry] = setUpData[entry].value;
                    break;
                case GenericUnitTestConstants.EL:
                    mut.el = setUpData[entry].value;
                    break;
                case GenericUnitTestConstants.ELEM:
                    mut.elem = setUpData[entry].value;
                    break;
                default:
                    return undefined;
            }
        }
    };

    GenericUnitTestUtils.testTearDown = function (mut, setUpData) {
        for (var entry in setUpData) {
            switch (setUpData[entry].type) {
                case GenericUnitTestConstants.BREASE_CONFIG:       
                    breaseConfig[entry] = GenericUnitTestUtils.originalData[entry];
                    break;
                case GenericUnitTestConstants.SETTING:
                    mut.settings[entry] = GenericUnitTestUtils.originalData[entry];
                    break;
                case GenericUnitTestConstants.BINDING:
                    mut.bindings = GenericUnitTestUtils.originalData['bindings'];
                    break;
                case GenericUnitTestConstants.DATA:
                    mut[entry] = GenericUnitTestUtils.originalData[entry];
                    break;
                case GenericUnitTestConstants.EL:
                    mut.el = undefined;
                    break;
                case GenericUnitTestConstants.ELEM:
                    mut.elem = undefined;
                    break;
                default:
                    return undefined;
            }
        }
        GenericUnitTestUtils.originalData = {};
    };

    GenericUnitTestUtils.getTestCaseData = function (testCaseData, init) {
        var testCase = {
            init: init,
            data: testCaseData,
            returnValueRun: false,
            functionSpyRun: false,
            setterRun: false
        };

        if (testCaseData.return !== undefined) {
            testCase.returnValueRun = true;
        }
        if (testCaseData.functionsToSpyOn !== undefined && !jQuery.isEmptyObject(testCaseData.functionsToSpyOn)) {
            testCase.functionSpyRun = true;
        }
        if (testCaseData.setterData !== undefined && !jQuery.isEmptyObject(testCaseData.setterData)) {
            testCase.setterRun = true;
        }
        return testCase;
    };

    return GenericUnitTestUtils;
});
