window.commonRules = {
    regex: {
        universal_analytics_url: /^https?:\/\/(www|ssl)\.google-analytics.com\/([a-z]\/)?collect\??/i,
        analytics4_url: /^https?:\/\/analytics.google.com\/([a-z]\/)?collect\??/i,
        trackingID: /^UA\-\d+\-\d{1,2}$/,
        hitType: /^(pageview|appview|event|transaction|item|social|exception|timing)$/
    },
    universal_analytics(url) {
        return this.regex.universal_analytics_url.test(url);
    },
    analytics4(url) {
        return this.regex.analytics4_url.test(url);
    },

    integer: value => value === String(parseInt(value, 10)),
    string: (value, length) =>
        typeof value === 'string' && value.length <= (length || 2048),
    boolean: value => value === '0' || value === '1',
    currency: value => value === String(parseFloat(value, 10)),
    session: value => value === 'start' || value === 'end',
    trackingID(value) {
        return this.regex.trackingID.test(value);
    },
    hit(value) {
        return value.match(this.hitType);
    }
};