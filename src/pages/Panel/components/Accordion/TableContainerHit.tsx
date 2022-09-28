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

// Icons
import IconButton from '@mui/material/IconButton';
import Filter4Icon from '@mui/icons-material/Filter4';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import AppsIcon from '@mui/icons-material/Apps';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import ShareIcon from '@mui/icons-material/Share';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ReportIcon from '@mui/icons-material/Report';
import ClearIcon from '@mui/icons-material/Clear';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { useHitList } from '../../context/HitList';

interface TableContainerHitProps {
  pageId: string;
}

function TableContainerHit({ pageId }: TableContainerHitProps) {
  const { hitList } = useHitList();

  const hits = hitList.reduce((accumulator, item) => {
    if (item.pageId === pageId) accumulator = [...accumulator, item];
    return accumulator;
  }, [] as Hit[]);

  useEffect(() => {
    console.log('hits', hits);
  }, [hits]);
  return (
    <TableContainer component={Paper}>
      {hits.length}
      {/* {hits
        .slice()
        .reverse()
        .map(hit => (
          <Table size="small">
            <>
              <TableHead>
                <TableRow>
                  <TableCell>{hit.requestType}</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {hit.data.map(item => (
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ pt: 0.25, pb: 0.25 }}
                    >
                      {item.name}
                    </TableCell>
                    <TableCell sx={{ pt: 0, pb: 0 }}>{item.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </>
          </Table>
        ))} */}
    </TableContainer>
  );
}

export default TableContainerHit;
