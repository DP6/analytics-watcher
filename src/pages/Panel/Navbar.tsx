/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
// import '../../assets/css/materialize.css';
import 'materialize-css/dist/css/materialize.min.css';
import './Panel.css';


// --------------------------------------------------------
// FilterButton - Buttons used to filter hits
// --------------------------------------------------------
interface filterButtonProps {
    active: boolean,
    hitType: string,
    title: string,
    onClick: (e: string) => void,
    icon: string,
    addClass: string,
}

/**
 * Button used to filter hits
 *
 * @param props.active - If true, add css class "Cheked"
 * @param props.hitType - Hit type added as css class
 * @param props.title - Item title (on mouse hover)
 * @param props.onClick - onClick event handler
 * @param props.icon - Materialize CSS icon name
 * @param props.addClass - Other optional css classes
 */
function FilterButton(props: filterButtonProps) {
    return (
        <i className={`material-icons center-align ${props.addClass}` + (props.active ? ' checked' : '')}>
            <a className={props.hitType} title={props.title} href="#" onClick={() => props.onClick(props.hitType)}>{props.icon} </a>
        </i>
    );
}


// --------------------------------------------------------
// FilterList - All filter buttons
// --------------------------------------------------------
interface FilterListProps {
    filterListActive: boolean,
    filterListToggler: () => void,

    filterButtons: { [key: string]: boolean },
    toggleFilter: (e: string) => void,
}


/**
 * List with Buttons used to filter hits
 *
 * @param props.filterListActive - If true, show filter buttons
 * @param props.filterListToggler - FilterButtons list toggler function
 * @param props.filterButtons - Object mapping buttons state (true for active or false for inactive)
 * @param props.toggleFilter - Button's onClick event handler
 */
function FilterList(props: FilterListProps) {
    const hideClass = props.filterListActive ? ' not-hide' : 'hide';
    return (
        <li className={'add-filter' + (props.filterListActive ? ' active-filter' : '')}>

            <FilterButton title="All" icon="filter_list" hitType="All" addClass=""
                active={false}
                onClick={props.filterListToggler}
            />
            <FilterButton title="GA 4" icon="filter_4" hitType="analytics4" addClass={hideClass}
                active={props.filterButtons.analytics4}
                onClick={props.toggleFilter}
            />
            <FilterButton title="Pageview" icon="find_in_page" hitType="pageview" addClass={hideClass}
                active={props.filterButtons.pageview}
                onClick={props.toggleFilter}
            />
            <FilterButton title="App View" icon="apps" hitType="appview" addClass={hideClass}
                active={props.filterButtons.appview}
                onClick={props.toggleFilter}
            />
            <FilterButton title="Event" icon="flash_on" hitType="event" addClass={hideClass}
                active={props.filterButtons.event}
                onClick={props.toggleFilter}
            />
            <FilterButton title="Timing" icon="timelapse" hitType="timing" addClass={hideClass}
                active={props.filterButtons.timing}
                onClick={props.toggleFilter}
            />
            <FilterButton title="Social" icon="share" hitType="social" addClass={hideClass}
                active={props.filterButtons.social}
                onClick={props.toggleFilter}
            />
            <FilterButton title="Item" icon="shopping_basket" hitType="item" addClass={hideClass}
                active={props.filterButtons.item}
                onClick={props.toggleFilter}
            />
            <FilterButton title="Transaction" icon="monetization_on" hitType="transaction" addClass={hideClass}
                active={props.filterButtons.transaction}
                onClick={props.toggleFilter}
            />
            <FilterButton title="Exception" icon="report" hitType="exception" addClass={hideClass}
                active={props.filterButtons.exception}
                onClick={props.toggleFilter}
            />

        </li>
    );
}


// --------------------------------------------------------
// SearchButton - Button to enable/disable search bar
// --------------------------------------------------------
interface searchButtonProps {
    onClick: () => void
}

/**
 * Button toggler to enable the search bar input box
 *
 * @param props.onClick - Button's onClick event handler
 */
function SearchButton(props: searchButtonProps) {
    return (
        <li id="search-icon">
            <i className="material-icons center-align search">
                <a title="Search" href="#" onClick={() => props.onClick()}>search</a>
            </i>
        </li>
    );
}


// --------------------------------------------------------
// SearchBar - Search input box
// --------------------------------------------------------
interface SearchBarProps {
    active: boolean,
    searchBarChangeHandler: React.ChangeEventHandler<HTMLInputElement>,
    value: string
}


/**
 * Input for text filtering
 *
 * @param props.active - True if the search input is active
 * @param props.value - Current text on search box
 * @param props.searchBarChangeHandler - OnChange event handler
 */
function SearchBar(props: SearchBarProps) {
    return (
        <li id="search-input" className={props.active ? 'checked' : ''}>
            <form>
                <div className="input-field">
                    <input placeholder="Search..." type="text" id="busca" value={props.value} onChange={props.searchBarChangeHandler} />
                </div>
            </form>
        </li>
    );
}


// --------------------------------------------------------
// Navbar
// --------------------------------------------------------
interface NavbarProps {
    filterListActive: boolean,
    filterListToggler: () => void,

    filterButtons: { [key: string]: boolean }
    toggleFilter: (e: string) => void,
    clearFilters: (e: string) => void,
    clearHitlist: (e: string) => void,

    searchBarActive: boolean,
    searchedText: string,
    searchBarToggler: () => void,
    searchBarChangeHandler: React.ChangeEventHandler<HTMLInputElement>,
}


/**
 * Input for text filtering
 *
 * @param props.filterListActive - If true, show filter buttons
 * @param props.filterListToggler - FilterButtons list toggler function
 * @param props.filterButtons - Object mapping buttons states (true for active or false for inactive)
 * @param props.toggleFilter - Button's onClick event handler
 * @param props.clearFilters - Function to clear all filters
 * @param props.clearHitlist - Function to remove all hits
 * @param props.searchBarActive - True if the search bax input box is open/active
 * @param props.searchedText - Current text on search box
 * @param props.searchBarToggler - Search bar toggler function
 * @param props.searchBarChangeHandler - Search bar onChange event handler
 */
function Navbar(props: NavbarProps) {

    return (
        <nav>
            <div className="nav-wrapper">
                <ul className="left nav-buttons">
                    {/* Logo Analytics Watcher */}
                    <li>
                        <a href="panel_analytics-watcher.html" className="logo-dp6"><i className="material-icons"><img alt='' src={require('../../assets/icons/rect4069.png')} id="logo-dp6" /></i></a>
                    </li>
                    {/* Penguin switcher */}
                    <li>
                        <i className="material-icons center-align">
                            <a
                                className="modal-trigger"
                                title="Datalayer Penguin"
                                href="panel_penguin-datalayer.html"
                            >
                                settings_ethernet
                            </a>
                        </i>
                    </li>
                    {/* List with all filters */}
                    <FilterList
                        filterListActive={props.filterListActive}
                        filterListToggler={props.filterListToggler}
                        filterButtons={props.filterButtons}
                        toggleFilter={props.toggleFilter}
                    />
                    {/* Button to clear all active filters */}
                    <li>
                        <FilterButton
                            title="Clear Filters"
                            icon="clear_all"
                            hitType="clear-filter"
                            addClass=""
                            active={false}
                            onClick={props.clearFilters}
                        />
                    </li>
                    {/* Button to remove all hits */}
                    <li>
                        <FilterButton
                            title="Clear Report"
                            icon="delete"
                            hitType="clear-report"
                            addClass=""
                            active={false}
                            onClick={props.clearHitlist}
                        />
                    </li>
                    {/* Search bar input box */}
                    <SearchBar
                        active={props.searchBarActive}
                        value={props.searchedText}
                        searchBarChangeHandler={props.searchBarChangeHandler}
                    />
                    {/* Search bar toggler */}
                    <SearchButton
                        onClick={props.searchBarToggler}
                    />
                </ul>
            </div>
            {/* line with gradient - Navbar delimiter */}
            <div className="progress navbar-gradient">
                <div className="determinate"></div>
            </div>
        </nav>
    );
}


export default Navbar;
