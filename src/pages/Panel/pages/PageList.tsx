import React, { useEffect } from 'react';

import { Box, SxProps } from '@mui/material';

import Navbar from '../components/Navbar';
import PageAccordion from '../components/Accordion';

import { useHitList } from '../context/HitList';


const styleBox = {
  display: 'flex',
  flexDirection: 'column-reverse',
  justifyContent: 'center',
} as SxProps;
/** Main component with <Navbar> and <HitList> */
function PageList() {
  const { pages } = useHitList();
  const pagesMock = [
    {
      pageId: '7cc4346d-efd6-40cf-879d-4765286097c1',
      pageUrl: 'https://www.prudential.com.br/content/prudential/home.html',
    },
    {
      pageId: '18ac58a4-7521-49c3-9a7f-be7ec101d1b4',
      pageUrl: 'https://www.prudential.com.br/content/prudential/home.html',
    },
  ];
  return (
    <Box sx={styleBox}>
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
        pages.map(item => {
          if (item.pageUrl && item.pageId)
            return (
              <PageAccordion
                key={item.pageId}
                pageUrl={item.pageUrl}
                pageId={item.pageId}
              />
            );
        })}
    </Box>
  );
}

export default PageList;
