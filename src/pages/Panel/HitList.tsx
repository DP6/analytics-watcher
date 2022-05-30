import * as React from 'react';
import { commonRules } from './1.rules';
import * as RW from './3.hitParser';
import 'materialize-css';


// --------------------------------------------------------
// Hit element
// --------------------------------------------------------
interface HitProps {
    parameters: { [key: string]: string },
    queryString: string,
    status: 'error' | 'ok',
    contentTitle: string,
    hitType: string
    ga4: boolean
}


/**
 * Render a Hit component, with data from one single hit
 *
 * @param  props.parameters   - Object formed from qery string
 * @param  props.queryString  - Query string
 * @param  props.status       - 'error' if missing any "required parameters" or 'ok' otherwise
 * @param  props.contentTitle - Hit title
 * @param  props.hitType      - Type of hit
 * @param  props.ga4          - True if it's a GA4 hit. False if it's a UA hit.
 * @return              - JSX of <ul>, with a <table> inside <li> element
 */
function Hit(props: HitProps) {

    // Generate table rows
    const rows = RW.objectToRows(props.parameters);

    return (
        <ul
            className={`collapsible expandable track ${props.hitType}`}
            data-qs={props.queryString}
        >
            <hr className={`label ${props.status}`} />
            <li>
                {/* Header */}
                <div className="collapsible-header qsWrapper">
                    <i className={`material-icons hit-type ${props.hitType}`}>{RW.hitTypeImg[props.hitType]}</i>
                    <div className="content" title={props.contentTitle}>{props.contentTitle}</div>
                    <i className="material-icons delete">close</i>
                </div>
                {/* Body */}
                <div className="collapsible-body">
                    <table className="striped responsive tracktable queryString">
                        <tbody>{rows}</tbody>
                    </table>
                </div>
            </li>
        </ul>
    );
}


// --------------------------------------------------------
// HitList - List with all hits
// --------------------------------------------------------
interface HitListProps {
    updateHitlist: Function,
    hitList: any[],
    filterButtons: { [key: string]: boolean },
    filter: Function,
}


/** List with all hits displayed. */
class HitList extends React.Component<HitListProps, {}> {

    // Ref used to scroll into newest hit
    myRef: React.RefObject<HTMLDivElement>;

    constructor(props: HitListProps) {
        super(props);
        this.myRef = React.createRef();
    }

    /**
     * Append new hit information to Analytics Watcher devtools HTML page
     *
     * @param  parameters     - Object formed from qery string
     * @param  queryString    - Query string
     * @param  status         - 'error' if missing any "required parameters" or 'ok' otherwise
     * @param  contentTitle   - Hit title
     * @param  hitType        - Type of hit
     * @param  ga4            - true for ga4, false for UA
     */
    addNewHit({ parameters, queryString, status, contentTitle, hitType, ga4 }: HitProps) {

        // Create copy of hitList state array
        let hitList = this.props.hitList.slice();

        // Append new hit on hitList
        hitList.push(<Hit
            parameters={parameters}
            queryString={queryString}
            status={status}
            contentTitle={contentTitle}
            hitType={hitType}
            ga4={ga4}
            key={hitList.length}
        />);

        // Update hitList state
        this.props.updateHitlist(hitList);
    }


    /**
     * Handle method to add new hit
     *
     * @param  url          URL
     * @param  queryString  Query string
     * @param  ga4          True if it's a GA4 hit. False if it's a UA hit.
     */
    handler(url: string, queryString: string, ga4: boolean) {

        // Identify queryString, if empty
        if (queryString === '') {
            if (url.includes('?')) {
                queryString = url.slice(url.indexOf('?') + 1);
            } else return;
        };

        // Generate object from query string
        let params = RW.queryToObject(queryString);

        // content = Hit/event "title" on Analytics Watcher's HTML page
        let contentTitle = '';

        // Required parameters
        let requiredParametersToCheck;

        if (ga4) {
            // GA4 events

            // set contentTitle
            contentTitle = params.en ? params.en : params.dl;

            // Required parameters
            requiredParametersToCheck = [
                { type: 'analytics4', params: params },
            ];

        } else {
            // UA events

            // set contentTitle
            contentTitle = RW.setUAContent(params, contentTitle);

            // Required parameters
            requiredParametersToCheck = [
                { type: 'all', params: params },
                { type: params.t, params: params },
            ];
        }

        // Decode contentTitle
        contentTitle = RW.decode(contentTitle);

        // Identify required parameters that are undefined
        const missingRequiredParameters =
            requiredParametersToCheck
                .map(RW.identifyUndefinedRequiredParameters)
                .filter((error: string[]) => error.length > 0);

        // Hit type
        let hitType;
        if (ga4) {
            hitType = 'analytics4';
        } else {
            hitType = params.t;
        };


        // Insert new hit info on Analytics Watcher's HTML page
        this.addNewHit({
            parameters: params,
            queryString: queryString,
            status: missingRequiredParameters.length ? 'error' : 'ok',
            contentTitle: contentTitle,
            ga4: ga4,
            hitType: hitType
        });
    }


    /**
     * Start the handlers
     *
     * @param  url          URL
     * @param  method       HTTP Method
     * @param  requestBody  Body of request
     * @param  initiator    ????
     * @return              Void or string ...
     */
    init({ url, method, requestBody, initiator }: {
        url: string,
        method: string,
        requestBody: chrome.webRequest.WebRequestBody | null,
        initiator: string,
    }) {

        // Ignore requests comming from chrome extensions
        if (initiator.includes('chrome-extension://')) return;

        // Return void if requested url doesn't fit UA or GA4 patterns
        if (!commonRules.universal_analytics(url) && !commonRules.analytics4(url)) {
            return;
        }

        if (url.includes('v=1')) {
            // UA handler
            this.handler(url, '', false);

        } else if (url.includes('v=2')) {
            // GA4 handler
            this.handler(url, '', true);

        } else {
            // Measurement Protocol

            let ga4: boolean = false;

            // Checks if GA4
            if (url.includes('/mp/collect')) {
                ga4 = true;
            };

            // For each line in requestBody:
            //   Decodes Uint8Array array (from ArrayBuffer) into string
            //   Call handler function
            requestBody?.raw?.map(function (data) {
                return String.fromCharCode.apply(null, Array.from<number>(new Uint8Array(data.bytes!)));
            })
                .forEach((row) => this.handler(url, row, ga4));
        }
    }


    /**
     * Scrolls into newest hit
     */
    scrollToBottom() {
        const node = this.myRef.current;
        if (node) {
            node.scrollIntoView({ behavior: 'smooth' });
        }
    }

    /**
     * Requests listener
     *
     * @param hitlist this hitlist instance
     */
    requestListener(hitlist: HitList) {

        // Restrict to current tab
        chrome.tabs.query({ currentWindow: true, active: true, lastFocusedWindow: true }, function (tab) {

            // Add listener
            chrome.webRequest.onBeforeRequest.addListener(
                function (details) {
                    if (details.url.match(/.(google-analytics.com|analytics.google.com)(\/.)?\/collect.*$/)) {

                        hitlist.init({
                            url: details.url,
                            method: details.method,
                            requestBody: details.requestBody,
                            initiator: details.initiator ? details.initiator : ''
                        });
                    }
                },
                {
                    urls: ['<all_urls>'],
                    tabId: tab[0].id
                },
                ['requestBody']
            );
        });
    }

    /**
     * After component gets mounted
     */
    componentDidMount() {

        // Set up obBeforeRequest listener
        this.requestListener(this);

    }


    /**
     * After component gets updated
     */
    componentDidUpdate() {
        this.scrollToBottom();
        RW.collapse();
    }

    render() {
        return (
            <section id="panel">
                {/* Hitlist */}
                {this.props.filter(this.props.hitList, this.props.filterButtons)}
                {/* Reference used to scroll to bottom */}
                <div ref={this.myRef} />
            </section>
        );
    }
}

export default HitList;

