import React from 'react';
import Navbar from './Navbar';
import HitList from './HitList';


// --------------------------------------------------------
// Panel - Panel with <Navbar> and <HitList>
// --------------------------------------------------------

interface PanelProps {
}

interface PanelState {
    hitList: any[],
    filterButtons: { [key: string]: boolean }
    searchBarActive: boolean,
    searchedText: string,
    filterListActive: boolean
}


/** Main component with <Navbar> and <HitList> */
class Panel extends React.Component<PanelProps, PanelState> {

    // Ref used to scroll into newest hit
    myRef: React.RefObject<HTMLDivElement>;

    /**
     * Create panel
     *
     * @param state.searchBarActive - True if search bar is active
     * @param state.searchedText - Search bar input text
     * @param state.hitList - List with all hits
     * @param state.filterListActive - True if list of filterButtons is active
     * @param state.filterButtons - State of each filterButton (true for "active", false for "inactive")
     */
    constructor(props: PanelProps) {
        super(props);
        this.state = {
            searchBarActive: false,
            searchedText: '',
            hitList: [],
            filterListActive: true,
            filterButtons: {
                analytics4: false,
                pageview: false,
                appview: false,
                event: false,
                timing: false,
                social: false,
                item: false,
                transaction: false,
                exception: false
            }
        };
        this.myRef = React.createRef();


        // this Bindings
        this.updateHitlist = this.updateHitlist.bind(this);
        this.clearHitlist = this.clearHitlist.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
        this.searchBarToggler = this.searchBarToggler.bind(this);
        this.searchBarChangeHandler = this.searchBarChangeHandler.bind(this);
        this.filter = this.filter.bind(this);
        this.filterListToggler = this.filterListToggler.bind(this);
    }


    /**
    * Update list of hits
    *
    * @param  hitList  List with all Hits (from Panel state)
    */
    updateHitlist(hitList: []) {
        this.setState({
            hitList: hitList
        });
    }

    /**
    * Removes all hits
    *
    * @param  discarted  This string is discarted. Not used. Kept only for compatibility.
    */
    clearHitlist(discarted: string) {

        const hitList: any[] = [];

        this.setState({
            hitList: hitList
        });
    }


    /**
    * Toggle buttons filters on or off.
    *
    * @param  filter    Button filter name
    */
    toggleFilter(filter: string) {

        // Copy filters object state
        let filterButtons = Object.assign({}, this.state.filterButtons);

        // Toggle filter
        filterButtons[filter] = !filterButtons[filter];

        // Update state
        this.setState({
            filterButtons: filterButtons
        });
    }


    /**
    * Remove all filters
    *
    * @param  discarted    Button filter name. Not used. Kept only for compatibility.
    */
    clearFilters(discarted: string) {

        // Copy filters object state
        let filterButtons = Object.assign({}, this.state.filterButtons);

        // Reset searchedText state
        let searchedText = '';

        // Set all to false
        Object.keys(filterButtons).forEach(key => filterButtons[key] = false);

        // Update state
        this.setState({
            filterButtons: filterButtons,
            searchedText: searchedText
        });
    }


    /**
    * Filter displayed hits, based on active filterButtons and searched text
    *
    * @param  hitList        List with all Hits (from Panel state)
    * @param  filterButtons  State of each filter button
    */
    filter(hitList: any[], filterButtons: { [key: string]: boolean }) {

        // Get array of active filters
        const filters = Object.keys(filterButtons).filter(key => filterButtons[key] === true);

        // no filters
        if ((filters.length === 0) && (this.state.searchedText === '')) {
            return hitList;
        }

        // Only search filter
        if (filters.length === 0) {
            return hitList
                // .filter((obj) => Object.values(obj.props.parameters).includes(this.state.searchedText));
                .filter((obj) => Object.values(obj.props.parameters as { [key: string]: string }).some(val => val.includes(this.state.searchedText)));
        }

        // Only button filter
        if (this.state.searchedText === '') {
            return hitList
                .filter(item => filters.includes(item.props.hitType));
        }

        // Both filters
        return hitList
            .filter(item => filters.includes(item.props.hitType))
            // .filter((obj) => Object.values(obj.props.parameters).includes(this.state.searchedText))
            .filter((obj) => Object.values(obj.props.parameters as { [key: string]: string }).some(val => val.includes(this.state.searchedText)));
    }


    /**
    * Toggle the search bar
    */
    searchBarToggler() {
        this.setState({
            searchBarActive: !this.state.searchBarActive,
            searchedText: ''
        });
    }

    /**
    * Toggle the filterButtons list
    */
    filterListToggler() {
        this.setState({
            filterListActive: !this.state.filterListActive,
        });
    }


    /**
    * Search bar input's onChange event handler
    *
    * @param  e  event
    */
    searchBarChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {

        const filter = e.target.value.toLowerCase();

        this.setState({
            searchedText: filter
        });
    }


    render() {
        return (
            <div className="main-container">
                <Navbar
                    filterListActive={this.state.filterListActive}
                    filterListToggler={this.filterListToggler}
                    toggleFilter={this.toggleFilter}
                    filterButtons={this.state.filterButtons}
                    clearFilters={this.clearFilters}
                    clearHitlist={this.clearHitlist}
                    searchBarActive={this.state.searchBarActive}
                    searchBarToggler={this.searchBarToggler}
                    searchBarChangeHandler={this.searchBarChangeHandler}
                    searchedText={this.state.searchedText}
                />
                <HitList
                    updateHitlist={this.updateHitlist}
                    hitList={this.state.hitList}
                    filterButtons={this.state.filterButtons}
                    filter={this.filter}
                />
            </div>
        );
    }
}


export default Panel;
