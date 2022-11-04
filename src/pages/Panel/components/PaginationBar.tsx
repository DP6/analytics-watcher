import * as React from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

// --------------------------------------------------------
// SchemaDialog
// --------------------------------------------------------
interface PaginationBarProps {
  size: number;
  page: number;
  pagination: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  changePagination: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

/**
 * Dialog window that handles JSON schema file.
 *
 * @param  props.size    Size of array to be paginated.
 * @param  props.page     Current page.
 * @param  props.pagination        Size of pagination.
 * @param  props.handlePageChange     Page change handler.
 * @param  props.changePagination     Change pagination handler.
 * @return      JSX.Element
 */
function PaginationBar(props: PaginationBarProps) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ px: 1, justifyContent: 'flex-end' }}
    >
      <Typography>Hits per page:</Typography>
      <Box>
        <FormControl fullWidth>
          <NativeSelect defaultValue={30} onChange={props.changePagination}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </NativeSelect>
        </FormControl>
      </Box>
      <Pagination
        count={props.size > 0 ? Math.ceil(props.size / props.pagination) : 1}
        page={props.page}
        onChange={props.handlePageChange}
      />
    </Stack>
  );
}

export default PaginationBar;
