define(function () {

    'use strict';

    /**
     * @class widgets.brXtended.common.libs.wfUtils.SVGCache
     * Util used for caching svg xml string
    */

    var SVGCache = {

            contains: function (src) {
                return _cache[src] !== undefined;
            },
            add: function (src) {
                _cache[src] = {
                    deferred: $.Deferred(),
                    resolve: function (strXml) {
                        this.deferred.resolve(strXml);
                    }
                };
            },
            remove: function (src) {
                if (this.contains(src)) {
                    _cache[src] = undefined;
                }
            },
            resolve: function (src, strXml) {
                if (this.contains(src)) {
                    _cache[src].resolve(strXml);
                }
            },
            done: function (src, fn) {
                return _cache[src].deferred.done(fn);
            }
        },
        _cache = {};

    return SVGCache;

});
