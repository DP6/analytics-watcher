import React from 'react';

import { Container, CssBaseline } from '@mui/material';

import Navbar from '../../components/Navbar';
import PageAccordion from '../../components/Accordion';

import { useHitList } from '../../context/HitList';

/** Main component with <Navbar> and <HitList> */
function ListPages() {
  const { pages } = useHitList();

  return (
    <>
      <Navbar />
      <CssBaseline />
      <Container maxWidth="xl">
        {/* <ActionsBar
            getValidationIndicators={getValidationIndicators}
            // accordionExpandAll={accordionExpandAll}
            filters={filters}
            setFilters={setFilters}
            handleFileUpload={handleFileUpload}
            schemaDialogOpen={schemaDialogOpen}
            setSchemaDialogOpen={setSchemaDialogOpen}
            fileErrorDialogOpen={fileErrorDialogOpen}
            setFileErrorDialogOpen={setFileErrorDialogOpen}
          /> */}
        {/* <PaginationBar
            size={hitList.length}
            page={pagination.currentPage}
            pagination={pagination.pageSize}
            handlePageChange={handlePageChange}
            changePagination={changePagination}
          /> */}

        {pages &&
          pages
            .slice()
            .reverse()
            .map(item => {
              if (item.pageUrl && item.pageId)
                return (
                  <PageAccordion
                    key={item.pageId}
                    pageUrl={item.pageUrl}
                    pageId={item.pageId}
                  />
                );
            })}
      </Container>
    </>
  );
}

export default ListPages;
