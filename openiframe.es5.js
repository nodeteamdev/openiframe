"use strict";

function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}

function _classCallCheck(instance, Constructor) {
    if (!_instanceof(instance, Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

/**
 * Create a new OpenIframe element
 * @class OpenIframe
 */
var OpenIframe =
    /*#__PURE__*/
    function () {
        /**
         * Creates an instance of OpenIframe.
         * @param {Object} options
         * @param {DOM|string} options.container - css selector or DOM element
         * @param {Number} options.width - iframe width
         * @param {Number} options.height - iframe height
         * @param {Boolean} options.append - append iframe to container, prepend by default
         * @param {String} options.src - iframe src
         * @example 
         * new OpenIframe({
             container: '#header',
             height: 600,
             width: 800
             src: 'https://example.com',
             append: true
         })
         * @memberof OpenIframe
         * @returns iframe Element
         */
        function OpenIframe(options) {
            var _this = this;

            _classCallCheck(this, OpenIframe);

            this.container = options.container;
            this.iframeWidth = parseFloat(options.width) || 800;
            this.iframeHeight = parseFloat(options.height) || 600;
            this.append = options.append || false;
            this.src = options.src || '#';
            this.proxyUrl = 'https://serene-hamlet-82201.herokuapp.com/';
            this.runPolyfills();
            this.validationContainer(function () {
                _this.createIframeElement();
            });
        }

        _createClass(OpenIframe, [{
            key: "runPolyfills",
            value: function runPolyfills() {
                (function (arr) {
                    arr.forEach(function (item) {
                        if (item.hasOwnProperty('append')) {
                            return;
                        }

                        Object.defineProperty(item, 'append', {
                            configurable: true,
                            enumerable: true,
                            writable: true,
                            value: function append() {
                                // eslint-disable-next-line prefer-rest-params
                                var argArr = Array.prototype.slice.call(arguments);
                                var docFrag = document.createDocumentFragment();
                                argArr.forEach(function (argItem) {
                                    var isNode = _instanceof(argItem, Node);

                                    docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
                                });
                                this.appendChild(docFrag);
                            }
                        });
                    });
                    arr.forEach(function (item) {
                        if (item.hasOwnProperty('prepend')) {
                            return;
                        }

                        Object.defineProperty(item, 'prepend', {
                            configurable: true,
                            enumerable: true,
                            writable: true,
                            value: function prepend() {
                                // eslint-disable-next-line prefer-rest-params
                                var argArr = Array.prototype.slice.call(arguments);
                                var docFrag = document.createDocumentFragment();
                                argArr.forEach(function (argItem) {
                                    var isNode = _instanceof(argItem, Node);

                                    docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
                                });
                                this.insertBefore(docFrag, this.firstChild);
                            }
                        });
                    });
                })([Element.prototype, Document.prototype, DocumentFragment.prototype]);
            }
        }, {
            key: "validationContainer",
            value: function validationContainer(callback) {
                var valid = true;

                if (typeof this.container === 'string') {
                    try {
                        var container = document.querySelector(this.container);

                        if (container === null) {
                            valid = false;
                            console.error('OpenIframe: is not a valid selector or element not found');
                        } else {
                            this.container = document.querySelector(this.container);
                        }
                    } catch (error) {
                        valid = false;
                        console.error('OpenIframe: is not a valid selector.');
                    }
                }

                if (_instanceof(!this.container, HTMLElement)) valid = false;

                if (valid) {
                    callback();
                }
            }
        }, {
            key: "createIframeElement",
            value: function createIframeElement() {
                var iframe = document.createElement('iframe');
                iframe.src = "".concat(this.proxyUrl, "?proxyHost=").concat(this.src);
                iframe.width = this.iframeWidth;
                iframe.height = this.iframeHeight;

                if (this.append) {
                    return this.container.append(iframe);
                }

                return this.container.prepend(iframe);
            }
        }]);

        return OpenIframe;
    }();