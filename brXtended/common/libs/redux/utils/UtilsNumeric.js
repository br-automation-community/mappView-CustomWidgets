'use strict';
define([
    'brease'
], function ({ objects: { NumberFormat }, services, helper: { numberFormatter } }) {

    /**
     * @class widgets.brXtended.common.libs.redux.utils.UtilsNumeric
     * This Module should be used to get Formated Numerbers as well for getting the amount of decimalPlaces
     *
     * This Module uses the {@link brease.objects.NumberFormat Numberformat-Module} 
     */

    var UtilsNumeric = {};

    /**
     * @method 
     * This function returns the formated Number based on the Format and currently selected MeasurementSystem
     * @param {Number} value Number which should apply the format
     * @param {brease.config.MeasurementSystemFormat} format Format e.g. {'metric':{ 'decimalPlaces' : 1, 'minimumIntegerDigits' : 1 }, 'imperial' :{ 'decimalPlaces' : 1, 'minimumIntegerDigits' : 1 }, 'imperial-us' :{ 'decimalPlaces' : 1, 'minimumIntegerDigits' : 1 }}
     */
    UtilsNumeric.getFormatedNumber = function (value, format, useDigitGrouping = false) {
        var numberFormat = NumberFormat.getFormat(format, services.measurementSystem.getCurrentMeasurementSystem());
        value = numberFormatter.formatNumber(value, numberFormat, useDigitGrouping);
        return value;
    };

    /**
     * @method 
     * This function return the amount of DecimalPlaces based on the format and currently selected MeasurementSystem
     * @param {brease.config.MeasurementSystemFormat} format Format e.g. {'metric':{ 'decimalPlaces' : 1, 'minimumIntegerDigits' : 1 }, 'imperial' :{ 'decimalPlaces' : 1, 'minimumIntegerDigits' : 1 }, 'imperial-us' :{ 'decimalPlaces' : 1, 'minimumIntegerDigits' : 1 }}
     */
    UtilsNumeric.getDecimalPlaces = function (format) {
        var decimalPlaces = NumberFormat.getFormat(format, services.measurementSystem.getCurrentMeasurementSystem());
        return decimalPlaces.decimalPlaces;
    };

    return UtilsNumeric;
});
