export interface HitInterface {
    url: string,
    hitParameters: { [key: string]: string },
    validationStatus: string,
    validationResult: any[],
    contentTitle: string,
    hitType: string,
    expanded: boolean,
    favIconUrl: string,
}

export interface HitInternalInterface extends HitInterface {
    hitKey: number,
    urlKey: number,
}


export interface URLInternalInterface {
    url: string,
    urlKey: number,
    expanded: boolean,
    favIconUrl: string,
}


/** Class that holds the logic for the Hits */
export class HitModel {
    urlMap: Map<number, URLInternalInterface>;
    dataMap: Map<number, HitInternalInterface>;

    /**
     * DataClass constructor
     * @param  {undefined | HitModel } baseInstance Optional HitModel instance. If passed, it generates a new DataClass instance copied from that base instance.
     */
    constructor(baseInstance: undefined | HitModel = undefined) {
        if (baseInstance === undefined) {
            this.urlMap = new Map();
            this.dataMap = new Map();
        } else {
            this.urlMap = baseInstance.urlMap;
            this.dataMap = baseInstance.dataMap;
        }
    }


    /**
    * Returns the max key in the urlMap.
    *
    * @return {number} Maximum key.
    */
    getMaxUrlKey(): number {
        return this.urlMap.size > 0 ? Math.max(...this.urlMap.keys()) : 0;
    }


    /**
    * Returns the max key in the dataMap.
    *
    * @return {number} Maximum key.
    */
    getMaxDataKey(): number {
        return this.dataMap.size > 0 ? Math.max(...this.dataMap.keys()) : 0;
    }


    /**
    * Adds a new entry.
    *
    * @param {HitInterface} data data to add.
    */
    addData(data: HitInterface) {

        //Generates a new Data key
        const newDataKey = this.dataMap.size > 0 ? this.getMaxDataKey() + 1 : 0;

        // Gets the maximum key in the urlMap
        const maxUrlKey = this.getMaxUrlKey();
        let newURLKey: number = 0;


        if (this.urlMap.size === 0) {
            // urlMap is empty
            newURLKey = 0;

        } else if (data.url !== this.urlMap.get(maxUrlKey)?.url) {
            // is a new URL, add the new data
            newURLKey = maxUrlKey + 1;
        } else {
            // Current URL
            newURLKey = maxUrlKey;
        }

        // Add new URL
        if ((newURLKey === 0) || (newURLKey === maxUrlKey + 1)) {
            this.urlMap.set(
                newURLKey,
                {
                    url: data.url,
                    urlKey: newURLKey,
                    expanded: true,
                    favIconUrl: data.favIconUrl,
                }
            );
        }

        // Add new Data
        this.dataMap.set(
            newDataKey,
            { ...data, hitKey: newDataKey, urlKey: newURLKey }
        );

    }


    /**
    * Gets an entry.
    *
    * @param {number} hitKey Hit key.
    * @return {HitInternalInterface} Data entry.
    */
    getHit(hitKey: number): HitInternalInterface | undefined {
        if (this.dataMap.has(hitKey)) {
            return this.dataMap.get(hitKey);
        }
    }


    /**
    * Gets an entry.
    *
    * @param {number} urlKey URL key.
    * @return {Map<number, HitInternalInterface>} Data entry.
    */
    getDataByUrl(urlKey: number): Map<number, HitInternalInterface> {
        return new Map([...this.dataMap].filter(([key, value]) => value.urlKey === urlKey));
    }


    /**
    * Gets array of unique URL keys.
    *
    * @return {Array<number>} URL keys.
    */
    getUniqueUrlKeys(): Array<number> {
        return [...this.dataMap].map(([key, value]) => value.urlKey)
            .filter((value, index, self) => self.indexOf(value) === index);
    }


    /**
    * Toggles an URL 'expanded' property.
    *
    * @param {number} urlKkey URL key.
    */
    toggleUrlExpanded(urlKkey: number) {
        // Check if key exists before toggle the 'expanded' key
        if (this.urlMap.has(urlKkey)) {
            this.urlMap.set(urlKkey, { ...this.urlMap.get(urlKkey)!, expanded: !this.urlMap.get(urlKkey)!.expanded });
        }
    }


    /**
    * Toggles an entry 'expanded' property.
    *
    * @param {number} hitKey Entry key.
    */
    toggleDataExpanded(hitKey: number) {
        // Check if key exists before toggle the 'expanded' key
        if (this.dataMap.has(hitKey)) {
            // Updata dataMap
            this.dataMap.set(hitKey, { ...this.dataMap.get(hitKey)!, expanded: !this.dataMap.get(hitKey)!.expanded });
        }
    }


    /**
    * Sets the 'expanded' property of all entries to 'expandedValue' (true or false).
    *
    * @param {boolean} expandedValue Value to set.
    */
    expandAll(expandedValue: boolean) {
        // Update urlMap
        for (const [key, value] of this.urlMap.entries()) {
            this.urlMap.set(key, { ...value, expanded: expandedValue });
        }

        // Update DataMap
        for (const [key, value] of this.dataMap.entries()) {
            this.dataMap.set(key, { ...value, expanded: expandedValue });
        }
    }


    /**
    * Removes an entry from a dataMap, if hitKay is passed. Otherwise, remove all data.
    *
    * @param {number} hitKey  Entry key.
    */
    removeData(hitKey?: number) {
        if (hitKey) {
            if (this.dataMap.has(hitKey)) {
                this.dataMap.delete(hitKey);
            }
        } else {
            this.urlMap = new Map();
            this.dataMap = new Map();
        }
    }


    /**
    * Removes an entry from a urlMap and all data from dataMap associated with that URL.
    *
    * @param {number} urlKey  URL key.
    */
    removeUrl(urlKey: number) {
        if (this.urlMap.has(urlKey)) {
            // removes URL
            this.urlMap.delete(urlKey);

            // Removes Data associated with that URL
            for (const [key, value] of this.dataMap.entries()) {
                if (value.urlKey === urlKey) {
                    this.dataMap.delete(key);
                }
            }
        }
    }


    /**
    * Returns the number of hits with the specified 'status', or the total, if 'status' is not provided.
    *
    * @param {string | undefined} status  Status to consider. Set to undefined to count all entries.
    */
    getValidationIndicators(status?: string) {

        let total = this.dataMap.size;
        if (status) {
            // Converts to Array -> Filter Array -> Gets length
            return [...this.dataMap]
                .filter(([key, value]) => value.validationStatus === status)
                .length;
        }
        return total;
    }


    /**
    * Returns the number of hits with the specified 'status', or the total, if 'status' is not provided.
    *
    * @param {string | undefined} status  Status to consider. Set to undefined to count all entries.
    */
    reverse() {

        let newHitModel = new HitModel();

        // Set same urlMapnew data
        newHitModel.urlMap = new Map([...this.urlMap].reverse());
        newHitModel.dataMap = new Map([...this.dataMap].reverse());

        return newHitModel;
    }


    /**
    * Filters displayed hits, based on 'filterTypesArray'.
    *
    * @param {Array<string>} filterTypesArray Arry with types to include.
    * @return {HitModel} filtered instance of HitModel
    */
    filterByType(filterTypesArray: Array<string>): HitModel {

        if (filterTypesArray.length > 0) {
            let newHitModel = new HitModel();

            // Set same urlMap
            newHitModel.urlMap = this.urlMap;

            // Filter entries
            newHitModel.dataMap = new Map(
                [...this.dataMap]
                    .filter(([key, value]) => filterTypesArray.includes(value.hitType))
            );
            return newHitModel;
        }
        return this;
    }


    /**
    * Filters displayed hits, based on searched text.
    *
    * @param {string} searchedText Searched string.
    * @return {HitModel} filtered instance of HitModel
    */
    filterBySearchText(searchedText: string): HitModel {
        // Converts to Array -> Filter Array -> Converts back to Map -> Converts back to DataClass
        if (searchedText.length > 0) {
            let newHitModel = new HitModel();

            // Set same urlMap
            newHitModel.urlMap = this.urlMap;

            // Filter entries
            newHitModel.dataMap = new Map(
                [...this.dataMap]
                    .filter(([key, value]) => Object.values(value.hitParameters).some(val => val.toLowerCase().includes(searchedText.toLowerCase())))
            );
            return newHitModel;
        }
        return this;
    }


    /**
    * Filters displayed hits, based on active status filtered.
    *
    * @param {Array<string>} filterStatus  Array of statuses to include.
    * @return {HitModel} filtered instance of HitModel
    */
    filterByStatus(filterStatus: Array<string>): HitModel {
        if (filterStatus.length > 0) {
            let newHitModel = new HitModel();

            // Set same urlMap
            newHitModel.urlMap = this.urlMap;

            // Filter entries
            newHitModel.dataMap = new Map(
                [...this.dataMap]
                    .filter(([key, value]) => filterStatus.includes(value.validationStatus))
            );
            return newHitModel;
        }
        return this;
    }


    /**
    * Filters entries, based on pagination size.
    *
    * @param {Object} pagination  Object indicating current page and the page size({ currentPage: number, pageSize: number }).
    * @return {HitModel} filtered instance of HitModel
    */
    filterByPage(pagination: { currentPage: number, pageSize: number }): HitModel {

        // Only filter if there are more entries than the current pageSize
        if (this.dataMap.size > pagination.pageSize) {
            let newHitModel = new HitModel();

            // Set same urlMap
            newHitModel.urlMap = this.urlMap;

            // Filter entries
            newHitModel.dataMap = new Map(
                [...this.dataMap]
                    .slice((pagination.currentPage - 1) * pagination.pageSize, pagination.currentPage * pagination.pageSize)
            );
            return newHitModel;
        }
        return this;
    }


    /**
    * Filters displayed hits, based on searched text.
    *
    * @param {string} searchedText Searched string.
    * @return {HitModel} filtered instance of HitModel
    */
    filteredData(filterTypesArray: string[], searchedText: string, filterStatus: Array<string>, pagination: { currentPage: number, pageSize: number }): HitModel {

        return (this
            .filterByType(filterTypesArray)
            .filterBySearchText(searchedText)
            .filterByStatus(filterStatus)
            .filterByPage(pagination)
        );

    }
}
