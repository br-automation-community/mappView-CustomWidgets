define([], function () {

    'use strict';

    /* eslint-disable no-multi-spaces */
    var GenericUnitTestConstants = {
        //SetUp Constants
        BINDING: 'BINDING',                                                 //data located in "this.bindings[dataName] = setUpData"
        BREASE_CONFIG: 'BREASE_CONFIG',                                     //data located in "brease.config[dataName] = setUpData"
        SETTING: 'SETTING',                                                 //data located in "this.settings[dataName]"
        DATA: 'DATA',                                                       //data located in "this[dataName] = setUpData"
        EL: 'EL',                                                           //data located in "this.el = setUpData"
        ELEM: 'ELEM',                                                       //data located in "this.elem = setUpData"

        //used machters
        COMPARE_JQUERYOBJECT: 'COMPARE_JQUERYOBJECT',                       //check if the returned jQuery hast he same id,class and tag
        COMPARE_HTML: 'COMPARE_HTML',                                       //check if the outerHTML of the returned HTML node is correct
        ISFUNCTION: 'ISFUNCTION',                                           //check if the argument is a function

        //spy parents
        CONSOLE: 'CONSOLE',                                                 //the spied function is a console function
        EVENT: 'EVENT',                                                     //the spied function is part of an event
        JQUERY: 'JQUERY',                                                   //the spied function is part of "jQuery"
        JQUERY_PROTOTYPE: 'JQUERY_PROTOTYPE',                               //the spied function is part of the "jQuery.prototype"
        MUT: 'MUT',                                                         //the spied function is part the module under test
        OBJECT: 'OBJECT',                                                   //the spied function is part of "Object"
        STAND_ALONE: 'STAND_ALONE',                                         //the spied function is part of an standalone object use the "parentModule" property to hand over the module
        SUBMODULE: 'SUBMODULE',                                             //the spied function is part of the module under test,
        BASEWIDGET: 'BASEWIDGET',                                           //the spied function is part of the "BaseWidget"
        BREASE_UICONTROLLER: 'BREASE_UICONTROLLER',                         //the spied function is part of "brease.uiController"

        //MOCKS
        JQUERYMOCK: function (tagName, attr) {                              //create a mock for a jquery object
            var mock = $('<' + tagName + '></' + tagName + '>');
            if (attr) {
                for (var key in attr) {
                    mock.attr(key, attr[key]);
                }
            }
            return mock;
        },
        EVENTMOCK: { dispatch: function () { return 'EVENTMOCK'; } },       //event mock to verify if event was dispatched
        FUNCTIONMOCK: function () { return 'FUNCTIONMOCK'; },               //Mock of a function used for mocking in subModules
        CONSTRUCTORMOCK: { el: $('<div/>') },                               //Mock for a new construcktor
        REDUXMOCK: { createStore: function () {} },                         //Mock for Redux
        REDUCERMOCK: 'REDUCERMOCK',                                         //Mock for Reducer
        INITSTATEMOCK: { calculateInitState: function () {} },              //Mock for the init state of Redux
        STOREMOCK: { subscribe: function () {} },                           //Mock for a Redux store
        VIEWMOCK: { render: {                                               //Mock for a Redux View
            bind: function () {}
        } }
    };

    return GenericUnitTestConstants;

});
