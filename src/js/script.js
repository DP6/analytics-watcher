/* global jQuery: false, window: false, document: false, chrome: false */
const RW = (function() {
    const info = chrome.runtime.getManifest();
    const notifier = jQuery({});
    const panel = jQuery('#panel');
    const busca = jQuery('#busca');
    const requiredParameters = {
        all: ['v', 't', 'cid', 'tid'],
        social: ['sn', 'sa', 'st'],
        transaction: ['ti'],
        item: ['ti', 'in'],
        analytics4: ['v', 'en', 'cid', 'tid'],
    };
    const hitTypeImg = {
        event: 'flash_on',
        pageview: 'find_in_page',
        appview: 'apps',
        transaction: 'monetization_on',
        item: 'shopping_basket',
        social: 'share',
        exception: 'report',
        timing: 'timelapse',
        analytics4: 'filter_4',
    };

    const modules = {
        universal_analytics: {
            template: jQuery(jQuery('#template-universal').html()),
            parseByType(type, params) {
                if (!requiredParameters[type]) return [];

                return requiredParameters[type].filter((param) => params[param] === undefined);
            },
            appendNewHit(obj) {
                const clone = this.template.clone();
                const content = decode(obj.content);
                var type = obj.parameters.t;
                clone.addClass(type).data('qs', obj.queryString);
                clone.find('.label').addClass(obj.status);
                clone.find('.content').attr('title', content).text(content);
                clone.find('.hit-type').addClass(type);
                clone.find('.hit-type').text(hitTypeImg[type]);
                clone.find('table.queryString').html(objectToRows(obj.parameters));
                panel.append(clone);
                if (RW.autoscroll) clone.get(0).scrollIntoView({ behavior: 'smooth' });
            },
            handler(url = '', qs = '') {
                if (qs === '') {
                    if (url.includes('?')) {
                        qs = url.slice(url.indexOf('?') + 1);
                    } else return;
                }

                const params = queryToObject(qs);
                let content = '';

                switch (params.t) {
                    case 'pageview':
                        if (params.dp) {
                            content = (params.dh || '') + params.dp;
                        } else {
                            content = params.dl;
                        }
                        // color = "#3333CC";
                        break;
                    case 'event':
                        content = [params.ec, params.ea, params.el].map((val) => val || '<empty>').join(' > ');
                        // color = "#33CC33";
                        break;
                    case 'transaction':
                        content = `Trans: ${params.ti} > ${params.tr}`;
                        // color = "#CC33CC";
                        break;
                    case 'item':
                        content = `${params.iv} > ${params.in}`;
                        // color = "#CC3380";
                        break;
                    case 'social':
                        content = `${params.sn} > ${params.sa}`;
                        // color = "#33CCCC";
                        break;
                    case 'timing':
                        const utp = [params.utc, params.utv, params.utl, params.utt];
                        content = utp.some(Boolean) ? utp.join(' > ') : 'DOM Page Timing';
                        // color = "#A66F00";
                        break;
                }

                const errors = [
                        ['all', params],
                        [params.t, params],
                    ]
                    .map(this.parseByType)
                    .filter((error) => error.length > 0);

                this.appendNewHit({
                    parameters: params,
                    queryString: qs,
                    status: errors.length ? 'error' : 'ok',
                    content,
                });

                publish('newhit', url);

                if (panel.hasClass('filtrado') && !panel.hasClass(params.t)) {
                    panel.find();
                }
            },
        },
        analytics4: {
            template: jQuery(jQuery('#template-universal').html()),
            parseByType(type, params) {
                if (!requiredParameters[type]) return [];

                return requiredParameters[type].filter(
                    (param) => params[param] === undefined
                );
            },


            appendNewHit(obj) {
                const clone = this.template.clone();
                const content = decode(obj.content);
                var type = obj.parameters.t;
                clone.addClass('analytics4').data('qs', obj.queryString);
                clone.find('.label').addClass(obj.status);
                clone.find('.content').attr('title', content).text(content);
                clone.find('.hit-type').addClass(type);
                clone.find('.hit-type').text(hitTypeImg['analytics4']);
                clone.find('table.queryString').html(objectToRows(obj.parameters));
                panel.append(clone);
                if (RW.autoscroll) clone.get(0).scrollIntoView({ behavior: 'smooth' });
            },
            handler(url = '', qs = '') {
                if (qs === '') {
                    if (url.includes('?')) {
                        qs = url.slice(url.indexOf('?') + 1);
                    } else return;
                }

                const params = queryToObject(qs);

                let content = params.en ? params.en : params.dl;

                const errors = [
                        ['analytics4', params]
                    ]
                    .map(this.parseByType)
                    .filter((error) => error.length > 0);

                this.appendNewHit({
                    parameters: params,
                    queryString: qs,
                    status: errors.length ? 'error' : 'ok',
                    content,
                });

                publish('newhit', url);

                if (panel.hasClass('filtrado') && !panel.hasClass('analytics4')) {
                    panel.find();
                }
            },
        }
    };

    function clear() {
        jQuery('.track').remove();
        busca.val('');
    }

    function publish(type, data) {
        notifier.trigger(type, data);
    }

    function subscribe(type, func) {
        notifier.on(type, func);
    }

    function queryToObject(url = '') {
        if (url.startsWith('?')) url = url.slice(1);

        return url.split('&').reduce((acc, next) => {
            const [key, ...val] = next.split('=');
            acc[key] = val.join('=');
            return acc;
        }, {});
    }

    function objectToQuery(obj) {
        return Object.keys(obj)
            .reduce((acc, key) => acc.concat(`${key}=${escape(obj[key])}`), [])
            .join('&');
    }

    function objectToRows(obj) {
        const metadata = window.metadata.universal_analytics;
        const html = Object.keys(obj)
            .filter((key) => !key.startsWith('_'))
            .map((key) => {
                const keyName = decode(metadata[key] ? metadata[key].name : key);
                const value = decode(obj[key]);
                return `<td class="key" title="${key}">${keyName}</td>
					<td class="value" title="${value}">${value}</td>`;
            });
        return html.length ? '<tr>' + html.join('</tr><tr>') + '</tr>' : '';
    }

    function decode(str) {
        try {
            return decodeURIComponent(str);
        } catch ($$e) {
            return unescape(str);
        }
    }

    function encode(str) {
        try {
            return encodeURIComponent(str);
        } catch ($$e) {
            return escape(str);
        }
    }

    function init({ url, method, requestBody, initiator = '' }) {
        if (initiator.includes('chrome-extension://')) return;

        if (!commonRules.universal_analytics(url) && !commonRules.analytics4(url))
            return;
        if (url.includes('v=1')) {
            modules.universal_analytics.handler(url);
        } else if (url.includes('v=2')) {
            modules.analytics4.handler(url);
        } else {
            requestBody.raw
                .map(function(data) {
                    return String.fromCharCode(...new Uint8Array(data.bytes));
                })
                .forEach((row) => modules.universal_analytics.handler(url, row));
        }
        collapse();
        filterSearchInput();
    }

    function filterSearchInput() {

        let searchTerm = document.querySelector('#busca');
        let s = new RegExp(searchTerm.value, 'i');

        jQuery('.track:not(.history-change)').each(function() {
            const $this = jQuery(this);
            $this.toggleClass('hide', !s.test($this.find('td.value').text()));
        });

    }

    function collapse() {
        var elem = document.querySelectorAll('.collapsible.expandable');
        var instance = M.Collapsible.init(elem, {
            accordion: false,
            inDuration: 1500,
            outDuration: 1000,
        });
    }

    return {
        init,
        busca,
        panel,
        clear,
        info,
        collapse,
        autoscroll: true,
        util: {
            queryToObject,
            objectToQuery,
            pub: publish,
            sub: subscribe,
        },
    };
})();

chrome.webRequest.onBeforeRequest.addListener(
    RW.init, {
        urls: [
            '*://*.google-analytics.com/collect*',
            '*://*.google-analytics.com/*/collect*',
            '*://*.analytics.google.com/*/collect*',
            '*://*.analytics.google.com/collect*'
        ],
    }, ['requestBody'],
);
//chrome.devtools.network.onRequestFinished.addListener();

export default RW;