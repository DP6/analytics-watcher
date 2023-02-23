export class HitDataModel {
  data: Array<Page>;

  /**
   * DataClass constructor
   * @param  {undefined | HitDataModel } baseInstance Optional HitDataModel instance. If passed, it generates a new instance copied from that base instance.
   */
  constructor(baseInstance: HitDataModel | undefined = undefined) {
    if (baseInstance === undefined) {
      this.data = [];
    } else {
      this.data = baseInstance.data;
    }
  }

  /**
   * Gets length (number of pages).
   */
  get length() {
    return this.data.length;
  }

  /**
   * Gets current page (last page added).
   */
  get currentPage() {
    return this.data[this.data.length - 1];
  }

  /**
   * Add a new page.
   */
  addPage(page: Page) {
    this.data.push(page);
  }

  /**
   * Updates favIconUrl from a page.
   */
  updatePageFavIcon(pageId: string, favIconUrl: string) {
    this.data.forEach(page => {
      if (page.pageId === pageId) {
        page.favIconUrl = favIconUrl;
      }
    });
  }

  /**
   * Updates framesDocumentId from a page.
   */
  updateFramesIds(pageId: string, framesDocumentId: string[]) {
    this.data = this.data.map(page => {
      if (page.pageId === pageId) {
        return {
          ...page,
          framesDocumentId: framesDocumentId,
        };
      } else {
        return page;
      }
    });
  }

  /**
   * Find pageId by documentId of the page.
   */
  findPageByDocumentId(documentId: string) {
    let match = this.data.filter(page => page.documentId === documentId);
    if (match.length > 0) return match[0].pageId;
    return '';
  }

  /**
   * Find pageId by documentId in framesDocumentId of the page.
   */
  findPageByDocumentIdInFrames(documentId: string) {
    let match = this.data.filter(page =>
      page.framesDocumentId?.includes(documentId)
    );

    if (match.length > 0) return match[0].pageId;

    return '';
  }

  /**
   * Toggles a page 'expanded' property.
   */
  togglePageExpanded(pageId: string) {
    this.data = this.data.map(page =>
      page.pageId === pageId ? { ...page, expanded: !page.expanded } : page
    );
  }

  /**
   * Removes a page.
   */
  removePage(pageId: string) {
    this.data = this.data.filter(page => page.pageId !== pageId);
  }

  /**
   * Adds a new hit to a page.
   */
  addHit(pageId: string, hit: Hit) {
    this.data.forEach(page => {
      if (page.pageId === pageId) {
        page.hits.push(hit);
      }
    });
  }

  /**
   * Removes a hit.
   */
  removeHit(pageId: string, hitId: string) {
    this.data = this.data.map(page => {
      if (page.pageId === pageId) {
        return {
          ...page,
          hits: page.hits.filter(hit => hit.hitId !== hitId),
        };
      } else {
        return page;
      }
    });
  }

  /**
   * Toggles a hit 'expanded' property.
   */
  toggleHitExpanded(pageId: string, hitId: string) {
    this.data = this.data.map(page => {
      if (page.pageId === pageId) {
        return {
          ...page,
          hits: page.hits.map(hit =>
            hit.hitId === hitId ? { ...hit, expanded: !hit.expanded } : hit
          ),
        };
      } else {
        return page;
      }
    });
  }

  /**
   * Filters displayed hits, based on 'hitType'.
   */
  filterHitsByType(pageId: string, hitType: string): Page {
    let page = this.data.filter(page => page.pageId === pageId)[0];
    return {
      ...page,
      // hits: page.hits.filter(hit => hitTypes.includes(hit.hitType)),
      hits: page.hits.filter(hit => hit.hitType === hitType),
    };
  }

  /**
   * Gets number of hits of 'hitType' for a given page.
   */
  numberOfHitsByType(pageId: string, hitType: string): number {
    let page = this.data.filter(page => page.pageId === pageId)[0];
    return page.hits.filter(hit => hit.hitType === hitType).length;
  }
}
