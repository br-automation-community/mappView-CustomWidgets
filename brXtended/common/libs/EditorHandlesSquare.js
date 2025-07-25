'use strict';
define([
    'brease'
], function ({ core: { Class: SuperClass, Utils } }) {

    /**
     * @class widgets.brXtended.common.libs.EditorHandlesSquare
     * Provides the Handles for Widgets which can only be Square
     * @extends brease.core.Class
     *
     * @iatMeta studio:visible
     * false
     */
    var ModuleClass = SuperClass.extend(function EditorHandlesSquare(widget) {
            SuperClass.call(this);
            this.widget = widget;
            this.initialPosition = {};
        }, null),

        p = ModuleClass.prototype,
        CSS_PROPS = ['width', 'height', 'top', 'left', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
            'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width'],
        CSS_MIN_MAX_PROPS = ['min-width', 'max-width', 'min-height', 'max-height'];

    p.getHandles = function () {

        var self = this;
        return {
            pointHandles: [],
            resizeHandles: [{

                start: function () {
                    var initialPosition = {},
                        $widget = self.widget.el,
                        $parent = $widget.parent(),
                        computedStyle = window.getComputedStyle($widget.get(0));
                    CSS_PROPS.forEach(function (prop) {
                        initialPosition[prop] = parseInt(computedStyle.getPropertyValue(prop), 10) || 0;
                    });
                    CSS_MIN_MAX_PROPS.forEach(function (prop) {
                        var value = computedStyle.getPropertyValue(prop);
                        initialPosition[prop] = parseInt(value, 10);
                        if (value.includes('%')) {
                            initialPosition[prop] = (prop.includes('width') ? $parent.width() : $parent.height()) / 100 * initialPosition[prop];
                        }
                    });
                    initialPosition['max-height'] = isNaN(initialPosition['max-height']) ? Number.POSITIVE_INFINITY : initialPosition['max-height'];
                    initialPosition['max-width'] = isNaN(initialPosition['max-width']) ? Number.POSITIVE_INFINITY : initialPosition['max-width'];
                    initialPosition['min-width'] = Math.max(initialPosition['min-width'], initialPosition['border-left-width'] + initialPosition['border-right-width'] + initialPosition['padding-left'] + initialPosition['padding-right']);
                    initialPosition['min-height'] = Math.max(initialPosition['min-height'], initialPosition['border-top-width'] + initialPosition['border-bottom-width'] + initialPosition['padding-top'] + initialPosition['padding-bottom']);
                    initialPosition['max-width'] = Math.max(initialPosition['max-width'], initialPosition['min-width']);
                    initialPosition['max-height'] = Math.max(initialPosition['max-height'], initialPosition['min-height']);
                    initialPosition['min-size'] = Math.max(initialPosition['min-width'], initialPosition['min-height']);
                    initialPosition['max-size'] = Math.min(initialPosition['max-width'], initialPosition['max-height']);
                    self.initialPosition = initialPosition;
                },

                update: function (newBox, direction) {
                    direction = typeof direction === 'string' ? direction : '';
                    newBox.width = Math.min(Math.max(newBox.width, self.initialPosition['min-size']), self.initialPosition['max-size']);
                    newBox.height = Math.min(Math.max(newBox.height, self.initialPosition['min-size']), self.initialPosition['max-size']);
                    var updatedBox = {
                            size: newBox.width,
                            top: newBox.top,
                            left: newBox.left
                        }, initialPosition = self.initialPosition;   
                        
                    let boxUpdater = updater[direction];
                    if (typeof boxUpdater === 'function') {
                        boxUpdater(newBox, updatedBox, initialPosition); 
                    } else {
                        console.iatWarn('Direction ' + direction + ' not valid');
                    }
                    //handling width
                    if (direction.includes('e')) {
                        updatedBox.size = Math.max(updatedBox.size, initialPosition['min-width']);
                    }
                    //handling height
                    if (direction.includes('s')) {
                        updatedBox.size = Math.max(updatedBox.size, initialPosition['min-height']);
                    }
                    //handling left
                    //don't allow negative width values to avoid moving widget to random positions
                    //TODO: instead of 0 we probably should use borderWidth
                    if (direction.includes('w')) {
                        updatedBox.size = Math.max(initialPosition['min-width'], Math.min(initialPosition['max-width'], updatedBox.size));
                        updatedBox.left = Math.max(initialPosition.left + initialPosition.width - updatedBox.size, Math.min(initialPosition.left + initialPosition.width - initialPosition['max-width'], updatedBox.left));
                    }

                    //handling top
                    if (direction.includes('n')) {
                        updatedBox.height = Math.max(initialPosition['min-height'], Math.min(initialPosition['max-height'], updatedBox.size));
                        updatedBox.top = Math.max(initialPosition.top + initialPosition.height - updatedBox.height, Math.min(initialPosition.top + initialPosition.height - initialPosition['max-height'], updatedBox.top));
                    }
                    self.widget.settings.top = updatedBox.top;
                    self.widget.settings.left = updatedBox.left;
                    self.widget.settings.width = updatedBox.size;
                    self.widget.settings.height = updatedBox.size;

                    if (Utils.isFunction(self.onResizeHandler)) {
                        self.onResizeHandler(self.widget);
                    }

                    _redrawWidget(self);
                },
                finish: function () {
                    var returnBox = {
                        top: self.widget.settings.top,
                        left: self.widget.settings.left,
                        height: self.widget.settings.height,
                        width: self.widget.settings.width
                    };
                    return returnBox;
                },
                handle: function () {
                    return self.widget.elem;
                }
            }]
        };
    };

    var updater = {
        's': function (newBox, updatedBox, initialPosition) {
            updatedBox.size = newBox.height;
            updatedBox.top = newBox.top;
            updatedBox.left = newBox.left - (updatedBox.size - initialPosition.width) / 2;
        },
        'n': function () { updater.s.apply(this, arguments); },
        'e': function (newBox, updatedBox, initialPosition) {
            updatedBox.size = newBox.width;
            updatedBox.top = newBox.top - (updatedBox.size - initialPosition.height) / 2;
            updatedBox.left = newBox.left;
        },
        'w': function () { updater.e.apply(this, arguments); },
        'se': function (newBox, updatedBox) {
            updatedBox.size = Math.max(newBox.width, newBox.height);
            updatedBox.top = newBox.top;
            updatedBox.left = newBox.left;
        },
        'sw': function (newBox, updatedBox, initialPosition) {
            updatedBox.size = Math.max(newBox.width, newBox.height);
            updatedBox.top = newBox.top;
            updatedBox.left = newBox.left - (updatedBox.size - initialPosition.width) / 2;
        },
        'ne': function (newBox, updatedBox, initialPosition) {
            updatedBox.size = Math.max(newBox.width, newBox.height);
            updatedBox.top = newBox.top - (updatedBox.size - initialPosition.height) / 2;
            updatedBox.left = newBox.left;
        },
        'nw': function (newBox, updatedBox, initialPosition) {
            updatedBox.size = Math.max(newBox.width, newBox.height);
            updatedBox.top = newBox.top - (updatedBox.size - initialPosition.height) / 2;
            updatedBox.left = newBox.left - (updatedBox.size - initialPosition.width) / 2;
        }
       
    };

    p.getSelectionDecoratables = function () {
        return [this.widget.elem];
    };

    p.onResize = function (handler) {
        this.onResizeHandler = handler;
    };

    function _redrawWidget(self) {
        self.widget.el.css('top', parseInt(self.widget.settings.top, 10));
        self.widget.el.css('left', parseInt(self.widget.settings.left, 10));
        self.widget.el.css('width', parseInt(self.widget.settings.width, 10));
        self.widget.el.css('height', parseInt(self.widget.settings.height, 10));

        if (Utils.isFunction(self.widget._redrawInEditor)) {
            self.widget._redrawInEditor(self.widget.settings.height, self.widget.settings.width);
        }
    }

    return ModuleClass;
});
