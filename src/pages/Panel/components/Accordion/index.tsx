import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import Paper from '@mui/material/Paper';
import Alert, { AlertColor } from '@mui/material/Alert';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainerHit from './TableContainerHit';

interface AccordionProps {
  pageUrl: string;
  pageId: string;
}
/**
 * Render a Hit component, with data from one single hit
 *
 * @param  props.hitParameters  Object formed from query string
 * @param  props.contentTitle   Hit title
 * @param  props.hitTypeIcon    Type of hit
 * @param  props.hitList     key ID of hit
 * @param  props.removeHit      Function that removes a hit entry
 * @param  props.expanded       Hit accordion state (expanded or not)
 * @param  props.validationStatus       Status of validation ('ERROR', 'WARNING' or 'SUCCESS')
 * @param  props.validationResult       Validation result object, containing status and messages
 * @return      JSX.Element
 */
function PageAccordion({ pageUrl, pageId }: AccordionProps) {
  const [accordion, setAccordion] = useState(false);
  function handleAccordionChange() {
    setAccordion(!accordion);
  }
  return (
    <Accordion
      sx={{ flexDirection: 'column' }}
      expanded={accordion}
      onChange={() => handleAccordionChange()}
    >
      <AccordionSummary
        sx={{
          '& .MuiAccordionSummary-content': {
            mt: 0,
            mb: 0,
          },
          '& .MuiAccordionSummary-content.Mui-expanded.MuiAccordionSummary-contentGutters':
            {
              mt: 0,
              mb: 0,
            },
          minHeight: 40,
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          sx={{ justifyContent: 'space-between' }}
        >
          <Box display="flex" alignItems="center" flexDirection="row">
            <Typography fontSize="small" sx={{ ml: 1, flexGrow: 1 }}>
              {pageUrl}
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>

      <AccordionDetails sx={{ p: 0, '& .MuiAccordionDetails-root': { pt: 0 } }}>
        <TableContainerHit pageId={pageId} />
      </AccordionDetails>
    </Accordion>
  );
}

export default PageAccordion;
