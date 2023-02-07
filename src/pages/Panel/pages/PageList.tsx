import * as React from 'react';
import PageAccordion from '../components/PageAccordion';
import { useHitList } from '../context/HitList';

interface PageListProps {}

function PageList(props: PageListProps) {
  const { pages } = useHitList();

  return (
    <>
      {pages &&
        pages.data
          .slice()
          .reverse()
          .map(page => {
            return (
              <PageAccordion
                key={page.pageId}
                pageId={page.pageId}
                pageUrl={page.pageUrl}
                page={page}
              />
            );
          })}
    </>
  );
}

export default PageList;
