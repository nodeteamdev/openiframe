/**
 * Create a new OpenIframe element
 * @class OpenIframe
 */
class OpenIframe {
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
    constructor(options) {
        this.container = options.container;
        this.iframeWidth = parseFloat(options.width) || 800;
        this.iframeHeight = parseFloat(options.height) || 600;
        this.append = options.append || false;
        this.src = options.src || '#';

        this.runPolyfills()
        this.validationContainer(() => {
            this.createIframeElement();
        });
    }

    runPolyfills() {
        ((arr) => {
            arr.forEach((item) => {
                if (item.hasOwnProperty('append')) {
                    return;
                }
                Object.defineProperty(item, 'append', {
                    configurable: true,
                    enumerable: true,
                    writable: true,
                    value: function append() {
                        // eslint-disable-next-line prefer-rest-params
                        const argArr = Array.prototype.slice.call(arguments);
                        const docFrag = document.createDocumentFragment();

                        argArr.forEach((argItem) => {
                            const isNode = argItem instanceof Node;

                            docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
                        });

                        this.appendChild(docFrag);
                    }
                });
            });

            arr.forEach((item) => {
                if (item.hasOwnProperty('prepend')) {
                    return;
                }
                Object.defineProperty(item, 'prepend', {
                    configurable: true,
                    enumerable: true,
                    writable: true,
                    value: function prepend() {
                        // eslint-disable-next-line prefer-rest-params
                        const argArr = Array.prototype.slice.call(arguments);
                        const docFrag = document.createDocumentFragment();

                        argArr.forEach((argItem) => {
                            const isNode = argItem instanceof Node;

                            docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
                        });

                        this.insertBefore(docFrag, this.firstChild);
                    }
                });
            });
        })([Element.prototype, Document.prototype, DocumentFragment.prototype]);
    }

    validationContainer(callback) {
        let valid = true;

        if (typeof this.container === 'string') {
            try {
                const container = document.querySelector(this.container);

                if (container === null) {
                    valid = false;
                    console.error('OpenIframe: is not a valid selector or element not found')
                } else {
                    this.container = document.querySelector(this.container);
                }
            } catch (error) {
                valid = false;
                console.error('OpenIframe: is not a valid selector.')
            }
        }

        if (!this.container instanceof HTMLElement) valid = false;

        if (valid) {
            callback()
        }
    }

    createIframeElement() {
        const iframe = document.createElement('iframe');

        iframe.src = this.src;
        iframe.width = this.iframeWidth;
        iframe.height = this.iframeHeight;

        if (this.append) {
            return this.container.append(iframe)
        }

        return this.container.prepend(iframe);
    }
}