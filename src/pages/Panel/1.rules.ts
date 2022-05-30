/**
 * Namespace with validation rules
 * @namespace
 * @property {object}  regex    - Regex patterns
 */
const commonRules = {
    regex: {
        universal_analytics_url: /^https?:\/\/(www|ssl)\.google-analytics.com\/([a-z]\/)?collect\??/i,
        // analytics4_url: /^https?:\/\/analytics.google.com\/([a-z]\/)?collect\??/i,
        analytics4_url: /^https?:\/\/(www|ssl)\.google-analytics.com\/([a-z]\/)?collect\??/i,
        trackingID: /^UA-\d+-\d{1,2}$/,
        hitType: /^(pageview|appview|event|transaction|item|social|exception|timing)$/
    },


    /**
    * Checks if "url" matches regex.universal_analytics_url pattern
    * @param  {String} url  Url to test
    * @return {Boolean}     true if the url macthes universal_analytics_url pattern. False otherwise.
    */
    universal_analytics(url: string) {
        return this.regex.universal_analytics_url.test(url);
    },


    /**
    * Checks if "url" matches regex.analytics4_url pattern
    * @param  {String} url  Url to test
    * @return {Boolean}     true if the url macthes analytics4_url pattern. False otherwise.
    */
    analytics4(url: string) {
        return this.regex.analytics4_url.test(url);
    },


    /**
    * Check if a string 'valueString' can be converted to a base 10 integer.
    * Atention: valueString='1.0' will result in false!
    * String(parseInt('1.0', 10)) results in '1'.
    * @param  {String} value String to parse as integer.
    * @return {Boolean}      true if 'valueString' equals the parsed string reconverted to String. False otherwise.
    */
    integer(valueString: string) {
        return valueString === String(parseInt(valueString, 10));
    },


    /**
    * Checks if 'value' is of type String AND it's length is lower than 'length' or 2048.
    * @param  {?} value value to check.
    * @param  {Integer} length Expected length of 'value' string.
    * @return {Boolean}      true if 'value' is of type String and lower than 'length' or 2048. False otherwise.
    */
    string(value: any, length: number) {
        return typeof value === 'string' && value.length <= (length || 2048);
    },


    /**
    * Checks if 'value' equals '0' or '1' and is a String.
    * @param  {String} value value to check.
    * @return {Boolean}      True if 'value' is '0' or '1'. False otherwise.
    */
    boolean(value: string) {
        return value === '0' || value === '1';
    },


    /**
    * Checks if 'value' can be correctly parsed as float.
    * @param  {String} value value to check.
    * @return {Boolean}      True if 'value' is a Float formatted as String. False otherwise.
    */
    // currency: value => value === String(parseFloat(value, 10)),
    currency(value: string) {
        return value === String(parseFloat(value)) || value === parseFloat(value).toFixed(value.length - 2);
    },


    /**
    * Checks if 'value' equals 'start' or 'end'.
    * @param  {String} value value to check.
    * @return {Boolean}      True if 'value' equals 'start' or 'end'. False otherwise.
    */
    session(value: string) {
        return value === 'start' || value === 'end';
    },


    /**
    * Checks if 'value' matches regex.trackingID pattern.
    * @param  {String} value String to check.
    * @return {Boolean}      True if 'value' matches regex.trackingID pattern. False otherwise.
    */
    trackingID(value: string) {
        return this.regex.trackingID.test(value);
    },


    /**
    * Checks if 'value' is one of 'pageview', 'appview', 'event', 'transaction', 'item', 'social', 'exception' or 'timing'.
    * @param  {String} value value to check.
    * @return {Boolean}      True if 'value' is one of the options. False otherwise.
    */
    // hit(value) {
    //     return value.match(this.hitType);
    // },
    hit(value: string) {
        return ['pageview', 'appview', 'event', 'transaction', 'item', 'social', 'exception', 'timing'].includes(value);
    }
};


export { commonRules };