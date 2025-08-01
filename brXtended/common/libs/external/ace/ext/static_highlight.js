/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

define(function (require, exports, module) {
    'use strict';

    var EditSession = require('../edit_session').EditSession;
    var TextLayer = require('../layer/text').Text;
    // Stefan L. 24.01.2023 fix for webpack loading
    var baseStyles = require('../ext/static.css');
    var config = require('../config');
    var dom = require('../lib/dom');

    var simpleDom = {
        createTextNode: function (textContent) {
            return textContent;
        },
        createElement: function (type) {
            var element = {
                type: type,
                style: {},
                childNodes: [],
                appendChild: function (child) {
                    element.childNodes.push(child);
                },
                toString: function () {
                    var internal = {
                        type: 1,
                        style: 1,
                        className: 1,
                        textContent: 1,
                        childNodes: 1,
                        appendChild: 1,
                        toString: 1
                    };
                    var stringBuilder = [];
                
                    if (element.type != 'fragment') {
                        stringBuilder.push('<', element.type);
                        if (element.className) { stringBuilder.push(" class='", element.className, "'"); }
                        var styleStr = [];
                        for (var key in element.style) {
                            styleStr.push(key, ':', element.style[key]);
                        }
                        if (styleStr.length) { stringBuilder.push(" style='", styleStr.join(''), "'"); }
                        for (var key in element) {
                            if (!internal[key]) {
                                stringBuilder.push(' ', key, "='", element[key], "'");
                            }
                        }
                        stringBuilder.push('>');
                    }
                
                    if (element.textContent) {
                        stringBuilder.push(element.textContent);
                    } else {
                        for (var i = 0; i < element.childNodes.length; i++) {
                            var child = element.childNodes[i];
                            if (typeof child === 'string') { stringBuilder.push(child); } else { stringBuilder.push(child.toString()); }
                        }
                    }
                
                    if (element.type != 'fragment') {
                        stringBuilder.push('</', element.type, '>');
                    }
                
                    return stringBuilder.join('');
                }
            };
            return element;
        },
        createFragment: function () {
            return this.createElement('fragment');
        }
    };

    var SimpleTextLayer = function () {
        this.config = {};
        this.dom = simpleDom;
    };
    SimpleTextLayer.prototype = TextLayer.prototype;

    var highlight = function (el, opts, callback) {
        var m = el.className.match(/lang-(\w+)/);
        var mode = opts.mode || m && ('ace/mode/' + m[1]);
        if (!mode) { return false; }
        var theme = opts.theme || 'ace/theme/brace';
    
        var data = '';
        var nodes = [];

        if (el.firstElementChild) {
            var textLen = 0;
            for (var i = 0; i < el.childNodes.length; i++) {
                var ch = el.childNodes[i];
                if (ch.nodeType == 3) {
                    textLen += ch.data.length;
                    data += ch.data;
                } else {
                    nodes.push(textLen, ch);
                }
            }
        } else {
            data = el.textContent;
            if (opts.trim) { data = data.trim(); }
        }
    
        highlight.render(data, mode, theme, opts.firstLineNumber, !opts.showGutter, function (highlighted) {
            dom.importCssString(highlighted.css, 'ace_highlight');
            el.innerHTML = highlighted.html;
            var container = el.firstChild.firstChild;
            for (var i = 0; i < nodes.length; i += 2) {
                var pos = highlighted.session.doc.indexToPosition(nodes[i]);
                var node = nodes[i + 1];
                var lineEl = container.children[pos.row];
                lineEl && lineEl.appendChild(node);
            }
            callback && callback();
        });
    };

    /**
 * Transforms a given input code snippet into HTML using the given mode
 *
 * @param {string} input Code snippet
 * @param {string|mode} mode String specifying the mode to load such as
 *  `ace/mode/javascript` or, a mode loaded from `/ace/mode`
 *  (use 'ServerSideHiglighter.getMode').
 * @param {string|theme} theme String specifying the theme to load such as
 *  `ace/theme/twilight` or, a theme loaded from `/ace/theme`.
 * @param {number} lineStart A number indicating the first line number. Defaults
 *  to 1.
 * @param {boolean} disableGutter Specifies whether or not to disable the gutter.
 *  `true` disables the gutter, `false` enables the gutter. Defaults to `false`.
 * @param {function} callback When specifying the mode or theme as a string,
 *  this method has no return value and you must specify a callback function. The
 *  callback will receive the rendered object containing the properties `html`
 *  and `css`.
 * @returns {object} An object containing the properties `html` and `css`.
 */
    highlight.render = function (input, mode, theme, lineStart, disableGutter, callback) {
        var waiting = 1;
        var modeCache = EditSession.prototype.$modes;

        // if either the theme or the mode were specified as objects
        // then we need to lazily load them.
        if (typeof theme === 'string') {
            waiting++;
            config.loadModule(['theme', theme], function (m) {
                theme = m;
                --waiting || done();
            });
        }
        // allow setting mode options e.h {path: "ace/mode/php", inline:true}
        var modeOptions;
        if (mode && typeof mode === 'object' && !mode.getTokenizer) {
            modeOptions = mode;
            mode = modeOptions.path;
        }
        if (typeof mode === 'string') {
            waiting++;
            config.loadModule(['mode', mode], function (m) {
                if (!modeCache[mode] || modeOptions) { modeCache[mode] = new m.Mode(modeOptions); }
                mode = modeCache[mode];
                --waiting || done();
            });
        }

        // loads or passes the specified mode module then calls renderer
        function done() {
            var result = highlight.renderSync(input, mode, theme, lineStart, disableGutter);
            return callback ? callback(result) : result;
        }
        return --waiting || done();
    };

    /**
 * Transforms a given input code snippet into HTML using the given mode
 * @param {string} input Code snippet
 * @param {mode} mode Mode loaded from /ace/mode (use 'ServerSideHiglighter.getMode')
 * @param {string} r Code snippet
 * @returns {object} An object containing: html, css
 */
    highlight.renderSync = function (input, mode, theme, lineStart, disableGutter) {
        lineStart = parseInt(lineStart || 1, 10);

        var session = new EditSession('');
        session.setUseWorker(false);
        session.setMode(mode);

        var textLayer = new SimpleTextLayer();
        textLayer.setSession(session);

        session.setValue(input);
        var length = session.getLength();
    
        var outerEl = simpleDom.createElement('div');
        outerEl.className = theme.cssClass;
    
        var innerEl = simpleDom.createElement('div');
        innerEl.className = 'ace_static_highlight' + (disableGutter ? '' : ' ace_show_gutter');
        innerEl.style['counter-reset'] = 'ace_line ' + (lineStart - 1);
        outerEl.appendChild(innerEl);

        for (var ix = 0; ix < length; ix++) {
            var lineEl = simpleDom.createElement('div');
            lineEl.className = 'ace_line';
        
            if (!disableGutter) {
                var gutterEl = simpleDom.createElement('span');
                gutterEl.className = 'ace_gutter ace_gutter-cell';
                gutterEl.unselectable = 'on';
                gutterEl.textContent = ''; /*(ix + lineStart) + */
                lineEl.appendChild(gutterEl);
            }
            textLayer.$renderLine(lineEl, ix, false);
            innerEl.appendChild(lineEl);
        }

        //console.log(JSON.stringify(outerEl, null, 2));
        //console.log(outerEl.toString());
        textLayer.destroy();

        return {
            css: baseStyles + theme.cssText,
            html: outerEl.toString(),
            session: session
        };
    };

    module.exports = highlight;
    module.exports.highlight = highlight;
});
