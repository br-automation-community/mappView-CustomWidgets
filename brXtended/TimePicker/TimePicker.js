'use strict';
define([
    'widgets',
    'brease',
    './TimePicker.html',
    './SliderWheel'
], function (widgets, {
    system: {
        widgets: {
            Window: SuperClass, common: { window: { WindowType } }
        }
    },
    bodyEl,
    events: { BreaseEvent },
    helper: { dateFormatter },
    decorators: { CultureDependency },
    services
}, template, SliderWheel) {

    /**
     * @class widgets.brXtended.TimePicker
     * Time-only picker used by widgets.brXtended.TimeInput.
     *
     * It reproduces the behaviour and the public surface of the brease
     * DateTimePicker (same property names, same DateTimePickerObjArray layout,
     * so the inherited FocusHandler of DateTimeInput keeps working) but it
     * only enables the hour/minute/second columns and adds an optional
     * millisecond column.
     *
     * The date columns (year/month/day) are created but detached, exactly like
     * the original picker does when the format contains no date token.
     *
     * @extends system.widgets.Window
     * @singleton
     * @iatMeta studio:visible
     * false
     */

    var defaultSettings = {
            html: 'widgets/brXtended/TimePicker/TimePicker.html',
            stylePrefix: 'widgets_brXtended_TimePicker',
            dateTimeFormat: 'HH:mm:ss',
            showMilliseconds: false,
            millisecondStep: 1,
            modal: true,
            scale2fit: true // zoom widget, if it exceeds the display (=screen)
        },

        // eslint-disable-next-line no-unused-vars
        WidgetClass = SuperClass.extend(function TimePicker(elem, options, deferredInit, inherited) {
            if (inherited === true) {
                SuperClass.call(this, null, null, true, true);
            } else {
                if (instance === undefined) {
                    SuperClass.call(this, null, null, true, true);
                } else {
                    return instance;
                }
            }
        }, defaultSettings),

        p = WidgetClass.prototype;

    WidgetClass.minWidth = 84;
    WidgetClass.borderWidth = 9;

    // Not registered through the framework load() hook: TimeInput triggers the
    // template loading explicitly through ensureLoaded().
    WidgetClass.ensureLoaded = function () {
        if (instance.el === undefined) {
            instance.deferredInit(document.body, template);
            instance.readyHandler();
        }
    };

    var components = {
        year: {
            elName: 'DateTimePickerYear',
            pattern: ['y', 'Y']
        },
        month: {
            elName: 'DateTimePickerMonth',
            pattern: ['M']
        },
        day: {
            elName: 'DateTimePickerDay',
            pattern: ['d']
        },
        hour: {
            elName: 'DateTimePickerHour',
            pattern: ['h', 'H']
        },
        minute: {
            elName: 'DateTimePickerMinute',
            pattern: ['m']
        },
        second: {
            elName: 'DateTimePickerSecond',
            pattern: ['s']
        },
        millisecond: {
            elName: 'DateTimePickerMillisecond',
            pattern: []
        }
    };

    /*
    * Public Methods
    */

    p.init = function () {
        this.el.prependTo(document.body);
        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseTimePicker');
        }
        this.settings.windowType = WindowType.DATETIMEPICKER;
        SuperClass.prototype.init.call(this, true);

        this.value = new Date(1970, 0, 1, 0, 0, 0, 0);
        this.error = false;

        // Wheels are appended to the picker's own container (never to a global
        // selector), otherwise jQuery clones them into any other picker DOM
        // present in the document.
        var container = this.el.find('.dateTimePickerButtons');

        this.DateTimePickerYear = new SliderWheel(this.el.find('.dtfragment.year'), {
            range: {
                start: 1900,
                end: 2100,
                offset: 1
            },
            colIndex: 0,
            container: container
        }, this._bind('_setYear'));

        this.DateTimePickerMonth = new SliderWheel(this.el.find('.dtfragment.month'), {
            data: _getMonthData(),
            colIndex: 0,
            container: container
        }, this._bind('_setMonth'));

        this.DateTimePickerDay = new SliderWheel(this.el.find('.dtfragment.day'), {
            range: {
                start: 1,
                end: 31,
                offset: 1
            },
            digits: 2,
            colIndex: 0,
            container: container
        }, this._bind('_setDay'));

        this.DateTimePickerHour = new SliderWheel(this.el.find('.dtfragment.hour'), {
            range: {
                start: 0,
                end: 23,
                offset: 1
            },
            digits: 2,
            colIndex: 0,
            container: container
        }, this._bind('_setHour'));

        this.DateTimePickerMinute = new SliderWheel(this.el.find('.dtfragment.minute'), {
            range: {
                start: 0,
                end: 59,
                offset: 1
            },
            digits: 2,
            colIndex: 0,
            container: container
        }, this._bind('_setMinute'));

        this.DateTimePickerSecond = new SliderWheel(this.el.find('.dtfragment.second'), {
            range: {
                start: 0,
                end: 59,
                offset: 1
            },
            digits: 2,
            colIndex: 0,
            container: container
        }, this._bind('_setSecond'));

        // The millisecond wheel is (re)built in show(), because its step can
        // change for every opener.
        this.DateTimePickerMillisecond = new SliderWheel(this.el.find('.dtfragment.millisecond'), {
            range: {
                start: 0,
                end: 999,
                offset: 1
            },
            digits: 3,
            colIndex: 0,
            container: container
        }, this._bind('_setMillisecond'));
        this.DateTimePickerMillisecond.step = 1;

        resetComponentWidth.call(this);

        this.DateTimePickerString = this.el.find('.actDate');
        this.btnEnter = this.el.find('.dateTimePickerEnter').on(BreaseEvent.CLICK, this._bind('_submitValue')).on(BreaseEvent.MOUSE_DOWN, this._bind(_addEnter));
        this.btnReset = this.el.find('.dateTimePickerReset').on(BreaseEvent.CLICK, this._bind('_resetValue')).on(BreaseEvent.MOUSE_DOWN, this._bind(_addReset));

        // Same layout as the original picker (index 6 = enter, 7 = reset) so
        // that DateTimeInput's FocusHandler keeps working. The millisecond
        // wheel is appended at the end to preserve those indices.
        this.DateTimePickerObjArray = [this.DateTimePickerYear, this.DateTimePickerMonth, this.DateTimePickerDay,
            this.DateTimePickerHour, this.DateTimePickerMinute, this.DateTimePickerSecond,
            this.btnEnter, this.btnReset, this.DateTimePickerMillisecond];

        document.body.addEventListener(BreaseEvent.THEME_CHANGED, this._bind('themeChangeHandler'));
        _setButtonText(this);
    };

    function _addEnter() {
        this.btnEnter.addClass('active');
        bodyEl.on(BreaseEvent.MOUSE_UP, this._bind(_removeEnter));
    }

    function _removeEnter() {
        bodyEl.off(BreaseEvent.MOUSE_UP, this._bind(_removeEnter));
        this.btnEnter.removeClass('active');
    }

    function _addReset() {
        this.btnReset.addClass('active');
        bodyEl.on(BreaseEvent.MOUSE_UP, this._bind(_removeReset));
    }

    function _removeReset() {
        bodyEl.off(BreaseEvent.MOUSE_UP, this._bind(_removeReset));
        this.btnReset.removeClass('active');
    }

    function _setButtonText(widget) {
        widget.btnReset.html(services.language.getSystemText('BR/IAT/brease.common.reset'));
        widget.btnEnter.html(services.language.getSystemText('BR/IAT/brease.common.enter'));
    }

    p.langChangeHandler = function () {
        _setButtonText(this);
        SuperClass.prototype.langChangeHandler.apply(this, arguments);
    };

    p.cultureChangeHandler = function () {
        _setPickerValue.call(this, this.value);
    };

    p.setValue = function (value) {
        if (value !== undefined && value !== '') {
            this.value = new Date(value.valueOf());
            this.oldValue = new Date(value.valueOf());
            _setPickerValue.call(this, this.value);
        }
    };

    p.getValue = function () {
        return this.value;
    };

    /**
    * @method show
    * @inheritdoc
    */
    p.show = function (options, refElement) {
        options = _validatePositions(options);
        this.settings.showMilliseconds = options.showMilliseconds === true;
        this.settings.millisecondStep = options.millisecondStep || 1;
        // Rebuild the millisecond wheel so its granularity matches millisecondStep.
        _updateMillisecondWheel.call(this);
        // calculate the corresponding width depending on time-format
        options.format = this._addOptionsDateTimeFormat(options);
        _insertAllComponents.call(this);
        options.width = _calculateWidth.call(this, options.format);
        if (this.height === undefined || options.width === undefined) {
            options.height = this.el.outerHeight();
            this.height = options.height;
        }
        options.height = this.height;

        SuperClass.prototype.show.apply(this, arguments);
        this.closeOnLostContent(refElement);
        this._setTimeComponents();

        if (this.settings.time === undefined || typeof this.settings.time.getTime !== 'function' || isNaN(this.settings.time.getTime())) {
            this.settings.time = new Date();
        }
        this.setValue(this.settings.time);
    };

    p.themeChangeHandler = function () {
        resetComponentWidth.call(this);
        this.height = undefined;
    };

    function resetComponentWidth() {
        var instance = this;
        instance.dtpw = {};
        Object.keys(components).forEach(function (item) {
            instance.dtpw[item] = 0;
        });
    }

    p.dispose = function () {
        this.el.find('.dateTimePickerEnter, .dateTimePickerReset').off();
        bodyEl.off(BreaseEvent.MOUSE_UP, this._bind(_removeEnter));
        bodyEl.off(BreaseEvent.MOUSE_UP, this._bind(_removeReset));
        document.body.removeEventListener(BreaseEvent.THEME_CHANGED, this._bind('themeChangeHandler'));
        SuperClass.prototype.dispose.apply(this, arguments);
    };

    /*
    * Private Methods
    */

    p._submitValue = function (e) {
        this._handleEvent(e, true);
        this.dispatchEvent(new CustomEvent(BreaseEvent.SUBMIT, {
            detail: { value: this.getValue() }
        }));
        this.hide();
    };

    p._addOptionsDateTimeFormat = function (options) {
        var format;
        if (options.dateTimeFormat.length === 1) {
            format = dateFormatter.getFormat4Pattern(options.dateTimeFormat);
            if (format === undefined) {
                console.iatWarn('invalid pattern "' + options.dateTimeFormat + '" in dateTimeFormat -> take default pattern "' + defaultSettings['dateTimeFormat'] + '"');
                options.dateTimeFormat = defaultSettings['dateTimeFormat'];
                format = dateFormatter.getFormat4Pattern(options.dateTimeFormat);
            }
        } else {
            format = options.dateTimeFormat;
        }
        return format;
    };

    p._setTimeComponents = function () {
        var format;
        if (this.settings.dateTimeFormat.length === 1) {
            format = dateFormatter.getFormat4Pattern(this.settings.dateTimeFormat);
            if (format === undefined) {
                console.iatWarn('invalid pattern "' + this.settings.dateTimeFormat + '" in dateTimeFormat -> take default pattern "' + defaultSettings['dateTimeFormat'] + '"');
                this.settings.dateTimeFormat = defaultSettings['dateTimeFormat'];
                format = dateFormatter.getFormat4Pattern(this.settings.dateTimeFormat);
            }
        } else {
            format = this.settings.dateTimeFormat;
        }

        var instance = this;
        var counter = 0;
        Object.keys(components).forEach(function (item) {
            if (item === 'millisecond') {
                if (instance.settings.showMilliseconds === true) {
                    instance[components[item].elName].insert();
                    counter = counter + 1;
                    instance[components[item].elName].columnIndex = counter;
                } else {
                    instance[components[item].elName].detach();
                    instance[components[item].elName].columnIndex = 0;
                }
            } else if (_hasFormat.call(instance, item, format)) {
                instance[components[item].elName].insert();
                counter = counter + 1;
                instance[components[item].elName].columnIndex = counter;
            } else {
                instance[components[item].elName].detach();
                instance[components[item].elName].columnIndex = 0;
            }
        });

        this._setPosition();
    };

    p._resetValue = function () {
        this.setValue(this.oldValue);
    };

    p._setYear = function (val) {
        this.value.setFullYear(val);
    };

    p._setMonth = function (val) {
        this.value.setMonth(val - 1);
    };

    p._setDay = function (val) {
        this.value.setDate(val);
    };

    p._setHour = function (val) {
        this.value.setHours(val);
    };

    p._setMinute = function (val) {
        this.value.setMinutes(val);
    };

    p._setSecond = function (val) {
        this.value.setSeconds(val);
    };

    p._setMillisecond = function (val) {
        this.value.setMilliseconds(val);
    };

    function _updateMillisecondWheel() {
        var step = this.settings.millisecondStep || 1;
        if (step < 1) {
            step = 1;
        }
        // Guard against an invalid step (e.g. > 999) to avoid an empty wheel.
        if (step > 999) {
            step = 999;
        }
        if (this.DateTimePickerMillisecond.step !== step) {
            this.DateTimePickerMillisecond.step = step;
            this.DateTimePickerMillisecond.setRange({
                start: 0,
                end: 999,
                offset: step
            });
        }
    }

    function _setPickerValue(value) {
        this.check = false;
        this.DateTimePickerYear.setValue(value.getFullYear());
        this.DateTimePickerMonth.setValue(value.getMonth() + 1);
        this.DateTimePickerDay.setValue(value.getDate());
        this.DateTimePickerHour.setValue(value.getHours());
        this.DateTimePickerMinute.setValue(value.getMinutes());
        this.DateTimePickerSecond.setValue(value.getSeconds());
        if (this.settings.showMilliseconds === true) {
            var step = this.settings.millisecondStep || 1;
            if (step < 1) {
                step = 1;
            }
            var ms = value.getMilliseconds();
            // Snap to a value that actually exists on the wheel (multiple of step).
            var snappedMs = Math.floor(ms / step) * step;
            if (snappedMs > 999) {
                snappedMs = Math.floor(999 / step) * step;
            }
            this.value.setMilliseconds(snappedMs);
            this.DateTimePickerMillisecond.setValue(snappedMs);
        }
        var displayFormat = this.settings.dateTimeFormat;
        // Globalize (used by brease) formats milliseconds with f/ff/fff; S is
        // not a token and would be printed literally. A single character is a
        // culture pattern key, not a format string, so it is left untouched.
        if (this.settings.showMilliseconds === true && typeof displayFormat === 'string' &&
            displayFormat.length > 1 && !/[fF]/.test(displayFormat)) {
            displayFormat += '.fff';
        }
        var result = dateFormatter.format(this.value, displayFormat);
        this.DateTimePickerString.text(result);
        this.check = true;
    }

    function _getMonthData() {
        var monthData = [];
        for (var i = 1; i <= 12; i += 1) {
            monthData.push({ value: i, text: (i < 10 ? '0' : '') + i });
        }
        return monthData;
    }

    function _validatePositions(options) {
        if (options.position) {
            var position = options.position;
            options.arrow = options.arrow || {};
            if (position.horizontal === 'left') {
                position.vertical = 'middle';
                options.arrow.position = 'right';
                options.arrow.show = true;
            } else if (position.horizontal === 'right') {
                position.vertical = 'middle';
                options.arrow.position = 'left';
                options.arrow.show = true;
            } else {
                if (position.vertical === 'top') {
                    position.horizontal = 'center';
                    options.arrow.position = 'bottom';
                    options.arrow.show = true;
                } else if (position.vertical === 'bottom') {
                    position.horizontal = 'center';
                    options.arrow.position = 'top';
                    options.arrow.show = true;
                } else {
                    position.vertical = 'middle';
                    position.horizontal = 'center';
                    options.arrow.show = false;
                }
            }
        }
        return options;
    }

    function _hasFormat(item, format) {
        var pattern = components[item].pattern;
        for (var i = 0; i < pattern.length; i += 1) {
            if (format.indexOf(pattern[i]) !== -1) {
                return true;
            }
        }
        return false;
    }

    function _calcWidth(item, format) {
        // The millisecond column is not driven by a format token: it is shown
        // when showMilliseconds is enabled.
        var hasItem = (item === 'millisecond') ? this.settings.showMilliseconds === true : _hasFormat.call(this, item, format);

        if (!hasItem) {
            return 0;
        } else {
            if (this.dtpw[item] === 0) {
                return this[components[item].elName].$el.outerWidth();
            } else {
                return this.dtpw[item];
            }
        }
    }

    function _calculateWidth(format) {
        var instance = this;
        Object.keys(components).forEach(function (item) {
            instance.dtpw[item] = _calcWidth.call(instance, item, format);
        });

        var border = WidgetClass.borderWidth * 2,
            result = this.dtpw.hour + this.dtpw.minute + this.dtpw.second + this.dtpw.millisecond;

        return (result === 0) ? WidgetClass.minWidth : result + border;
    }

    function _insertAllComponents() {
        var instance = this;
        Object.keys(components).forEach(function (item) {
            instance[components[item].elName].insert();
        });
    }

    var instance = new WidgetClass();

    p.getInstance = function () {
        return WidgetClass;
    };

    return CultureDependency.decorate(WidgetClass, true);

});
