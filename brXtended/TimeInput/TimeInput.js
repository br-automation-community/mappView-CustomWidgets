'use strict';
define([
    'widgets',
    'brease',
    '../TimePicker/TimePicker'
], function (widgets, {
    helper: { dateFormatter },
    decorators: { CultureDependency, DragAndDropCapability },
    events: { BreaseEvent }
}, TimePicker) {
    var DateTimeInput = widgets.brease.DateTimeInput;

    /**
     * @class widgets.brXtended.TimeInput
     * @extends widgets.brease.DateTimeInput
     *
     * A control for entering a time value (TIME type) with no date and no time zone.
     * The value is treated as a duration from 0 up to 24 hours (00:00:00.000 - 23:59:59.999).
     * To edit values, the widgets.brXtended.TimePicker is shown.
     *
     * @iatMeta category:Category
     * DateTime
     * @iatMeta description:short
     * Zeit-Eingabe (TIME)
     * @iatMeta description:de
     * Ermöglicht dem Benutzer einen Zeitwert (TIME) einzugeben
     * @iatMeta description:en
     * Enables the user to enter a time value (TIME)
     */

    /**
     * @cfg {Time} value=0
     * @bindable
     * @iatStudioExposed
     * @iatCategory Data
     * Set the Time value in milliseconds (TIME datatype), limited to 24 hours (0 up to 86399999 ms).
     */

    /**
     * @cfg {String} format='HH:mm:ss'
     * @localizable
     * @iatStudioExposed
     * @iatCategory Appearance
     * @bindable
     * Specifies the format of the time shown in the input field.
     * Milliseconds use the Globalize token f/ff/fff (e.g. HH:mm:ss.fff), not S.
     */

    /**
     * @cfg {Boolean} showMilliseconds=false
     * @iatStudioExposed
     * @iatCategory Appearance
     * Shows milliseconds in the display format and enables the millisecond wheel in the picker.
     */

    /**
     * @cfg {Integer} millisecondStep=100
     * @iatStudioExposed
     * @iatCategory Behavior
     * Step size for the millisecond wheel in the picker (e.g. 1, 10, 100).
     */

    /**
     * @event ValueChanged
     * @iatStudioExposed
     * Fired when the value changes.
     * @param {Time} value
     */

    var defaultSettings = {
            format: 'HH:mm:ss',
            showMilliseconds: false,
            millisecondStep: 100,
            value: 0
        },

        WidgetClass = DateTimeInput.extend(function TimeInput() {
            DateTimeInput.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;

    p.init = function () {
        DateTimeInput.prototype.init.call(this);
        // Use the TimePicker (hour/minute/second + optional millisecond wheel)
        // instead of the date oriented brease DateTimePicker.
        _useTimePicker(this);
        // Re-apply the value with TIME logic (no timezone correction, clamped to 24H)
        _updateTimeValue(this, this.settings.value);
        _showTimeValue(this);
    };

    /**
     * @method setValue
     * Set the value of input field as a time value (ms)
     * @iatStudioExposed
     * @param {Time} value
     */
    p.setValue = function (value) {
        if (value === undefined) {
            return;
        }
        _updateTimeValue(this, value);
        _showTimeValue(this);
    };

    /**
     * @method getValue
     * Get the value of input field as time (ms)
     * @iatStudioExposed
     * @return {Time}
     */
    p.getValue = function () {
        if (!isNaN(new Date(this.data.value).getTime())) {
            return this.data.value.getTime();
        }
        return undefined;
    };

    /**
     * @method setShowMilliseconds
     * Sets showMilliseconds
     * @param {Boolean} showMilliseconds
     */
    p.setShowMilliseconds = function (showMilliseconds) {
        this.settings.showMilliseconds = showMilliseconds;
        _showTimeValue(this);
    };

    /**
     * @method getShowMilliseconds
     * Returns showMilliseconds
     * @return {Boolean}
     */
    p.getShowMilliseconds = function () {
        return this.settings.showMilliseconds;
    };

    /**
     * @method setMillisecondStep
     * Sets millisecondStep
     * @param {Integer} millisecondStep
     */
    p.setMillisecondStep = function (millisecondStep) {
        this.settings.millisecondStep = millisecondStep;
    };

    /**
     * @method getMillisecondStep
     * Returns millisecondStep
     * @return {Integer}
     */
    p.getMillisecondStep = function () {
        return this.settings.millisecondStep;
    };

    p._generatePickerSettings = function () {
        DateTimeInput.prototype._generatePickerSettings.call(this);
        this.settings.pickerSettings.showMilliseconds = this.settings.showMilliseconds;
        this.settings.pickerSettings.millisecondStep = this.settings.millisecondStep;
    };

    p.setFormat = function (format) {
        DateTimeInput.prototype.setFormat.call(this, format);
        _showTimeValue(this);
    };

    p.cultureChangeHandler = function (e) {
        DateTimeInput.prototype.cultureChangeHandler.call(this, e);
        _showTimeValue(this);
    };

    p._timePickerSubmitHandler = function (e) {

        var submittedValue = new Date(e.detail.value);

        // Clamp to TIME range: 00:00:00.000 up to 23:59:59.999 (one day duration)
        var msInDay = 24 * 60 * 60 * 1000;
        var todMs = submittedValue.getHours() * 3600000 +
            submittedValue.getMinutes() * 60000 +
            submittedValue.getSeconds() * 1000 +
            submittedValue.getMilliseconds();
        if (todMs >= msInDay) {
            todMs = msInDay - 1;
        } else if (todMs < 0) {
            todMs = 0;
        }

        // timeZoneCorrectedValue: local fields = clamped time-of-day, so that
        // _showTimeValue displays the picked time correctly in any time zone.
        this.data.timeZoneCorrectedValue = _createLocalTime(todMs);

        // data.value: UTC instant representing the same time-of-day (PLC-friendly)
        this.data.value = new Date(todMs);
        this.data.timeZoneOffset = this.data.value.getTimezoneOffset();

        _showTimeValue(this);

        /**
         * @event change
         * Fired when value is changed by user
         * @param {Time} value
         */
        this.dispatchEvent(new CustomEvent(BreaseEvent.CHANGE, { detail: { value: this.data.value.getTime() } }));

        if (this.settings.submitOnChange) {
            this.submitChange();
        }
    };

    // Private
    function _useTimePicker(widget) {
        TimePicker.ensureLoaded();
        widget.timePicker = new TimePicker();
    }

    function _createLocalTime(todMs) {
        var localTime = new Date(1970, 0, 1, 0, 0, 0, 0);
        localTime.setMilliseconds(todMs);
        return localTime;
    }

    function _updateTimeValue(widget, value) {

        var msInDay = 24 * 60 * 60 * 1000;
        var todMs;

        // TIME values are durations in milliseconds. A DateTime (Date object or
        // ISO string) is also accepted and reduced to its UTC time-of-day.
        if (typeof value === 'number' || (typeof value === 'string' && value.trim() !== '' && !isNaN(Number(value)))) {
            todMs = Number(value);
        } else {
            var dateValue = new Date(value);
            if (isNaN(dateValue.getTime())) {
                todMs = 0;
            } else {
                todMs = dateValue.getUTCHours() * 3600000 +
                    dateValue.getUTCMinutes() * 60000 +
                    dateValue.getUTCSeconds() * 1000 +
                    dateValue.getUTCMilliseconds();
            }
        }

        // Clamp to TIME range: duration 00:00:00.000 up to 23:59:59.999 (one day)
        if (todMs >= msInDay) {
            todMs = msInDay - 1;
        } else if (todMs < 0) {
            todMs = 0;
        }

        // data.value: UTC instant representing the time-of-day (getValue returns it as ms)
        widget.data.value = new Date(todMs);
        widget.data.timeZoneOffset = widget.data.value.getTimezoneOffset();

        // timeZoneCorrectedValue: local fields = time-of-day, so that the value is
        // displayed correctly in any time zone.
        widget.data.timeZoneCorrectedValue = _createLocalTime(todMs);
    }

    function _showTimeValue(widget) {
        if (!widget.input) {
            return;
        }
        let format = widget.settings.format;
        // showMilliseconds adds the milliseconds to the display format, unless
        // the configured format already contains a millisecond token (e.g. .fff).
        // NOTE: brease formats with Globalize, where the millisecond token is
        // f/ff/fff (S is not a token and would be printed literally).
        if (widget.settings.showMilliseconds === true && typeof format === 'string' && format.length > 1 && !/[fF]/.test(format)) {
            format += '.fff';
        }
        let result = dateFormatter.format(widget.data.timeZoneCorrectedValue, format);
        widget.input.text(result);
    }

    return DragAndDropCapability.decorate(CultureDependency.decorate(WidgetClass, true), false);

});
