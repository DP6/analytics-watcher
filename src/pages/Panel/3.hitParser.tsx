import React from 'react';
import { metadata } from './2.metadata';


/**
 * Details about the app or extension from the manifest. The object returned is a serialization of the full manifest file.
 */
export const info: object = chrome.runtime.getManifest();


/**
 * Parameters that are required and cannot be undefined
 */
const requiredParameters: { [key: string]: string[] } = {
    all: ['v', 't', 'cid', 'tid'],
    social: ['sn', 'sa', 'st'],
    transaction: ['ti'],
    item: ['ti', 'in'],
    analytics4: ['v', 'en', 'cid', 'tid'],
};

/**
 * Render Materialize icon
 */
export const hitTypeImg: { [key: string]: string } = {
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


/**
 * Decodes an encoded URI. Replaces escape sequences with the character that it represents.
 * @param  {string} str  A value representing an encoded URI component.
 * @return {string}      The decoded URI
 */
export function decode(str: string): string {
    try {
        try {
            return decodeURIComponent(str);
        } catch (err) {
            return decodeURI(str);
        }
    } catch (err) {
        return str;
    }
}

/**
 * Encodes an URI. Replaces some characters with escape sequences.
 * @param  {string} str  A value representing an encoded URI component.
 * @return {string}      The decoded URI
 */
export function encode(str: string): string {
    try {
        return encodeURIComponent(str);
    } catch ($$e) {
        return encodeURI(str);
    }
}


/**
 * Makes elements collapsible
 */
export function collapse() {
    let elem = document.querySelectorAll('.collapsible.expandable');
    M.Collapsible.init(elem, {
        accordion: true,
        inDuration: 750,
        outDuration: 500,
    });
}


/**
 * Identify which required parameters are undefined, based on 'type' (requiredParameters properties)
 * @param  {string} type Property of requiredParameters
 * @param  {Object} params Object of parameters and values
 * @return {Array}      Array with the NAMES of required parameters that have UNDEFINED value
 */
export function identifyUndefinedRequiredParameters(obj: { type: string, params: any }): Array<string> {
    // return empty array if the property type doesn't exists on requiredParameters
    if (!requiredParameters[obj.type]) return [];

    // return  Array with the NAMES of required parameters that have UNDEFINED value
    return requiredParameters[obj.type].filter(
        (param) => obj.params[param] === undefined
    );
}


/**
 * Receives a query string and format it as object
 * @param  {string} url Query string
 * @return {Object}     Object generated from query string
 */
export function queryToObject(url: string = ''): { [key: string]: string } {
    // Remove first char '?', if present
    if (url.startsWith('?')) url = url.slice(1);

    // Map to object
    // return url.split('&').reduce((acc, next) => {
    //     const [key, ...val] = next.split('=');
    //     acc[key] = val.join('=');
    //     return acc;
    // }, {});
    return Object.fromEntries(new URLSearchParams(url));
}


/**
 * Receives an object and format it as query string
 * @param  {Ojectg} url Object to be formatted as query string
 * @return {String}     query string formed from 'url' object
 */
export function objectToQuery(obj: {}): string {
    // return Object.keys(obj)
    //     .reduce((acc, key) => acc.concat(`${key}=${escape(obj[key])}`), [])
    //     .join('&');
    return new URLSearchParams(obj).toString();
}


/**
 * Set "content" cariable for Universal Analytics hits
 * @param  {Ojectg} url Object to be formatted as query string
 * @return {String}     query string formed from 'url' object
 */
export function setUAContent(params: { [key: string]: string }, content: string) {
    let utp;
    switch (params.t) {
        case 'pageview':
            if (params.dp) {
                content = (params.dh || '') + params.dp;
            } else {
                content = params.dl;
            }
            break;
        case 'event':
            content = [params.ec, params.ea, params.el].map((val) => val || '<empty>').join(' > ');
            break;
        case 'transaction':
            content = `Trans: ${params.ti} > ${params.tr}`;
            break;
        case 'item':
            content = `${params.iv} > ${params.in}`;
            break;
        case 'social':
            content = `${params.sn} > ${params.sa}`;
            break;
        case 'timing':
            utp = [params.utc, params.utv, params.utl, params.utt];
            content = utp.some(Boolean) ? utp.join(' > ') : 'DOM Page Timing';
            break;
        default:
            content = '';
    }
    return content;
}


/**
 * Creates array of HTML table rows <tr> from object "obj".
*
 * Generates one row to Each 'key': 'value' pair from object, with 'key' and 'value' as two table datas <td> on each row.
 * @param obj  Object used to gerenate teble rows
 * @return Array of JSX table rows <tr>
 */
export function objectToRows(obj: { [key: string]: string }): JSX.Element[] {
    // Array of parameters names (keys) that doesn't start with underscore (_)
    const html = Object.keys(obj)
        // that doesn't start with underscore (_)
        .filter((key) => !key.startsWith('_'))

        // map to array of (strings representing 2 HTML <td>'s)
        .map((key) => {
            const keyName = decode(metadata[key] ? metadata[key].name : key);
            const value = decode(obj[key]);
            return (
                <tr key={key}>
                    <td className="key" title={key}>{keyName}</td>
                    <td className="value" title={value}>{value}</td>
                </tr>
            );
        });

    return html;
}
