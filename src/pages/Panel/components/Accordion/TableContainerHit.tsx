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

const data = [
  { name: 'v', value: '1' },
  { name: '_v', value: 'j98' },
  { name: 'aip', value: '1' },
  { name: 'a', value: '1516883026' },
  { name: 't', value: 'pageview' },
  { name: '_s', value: '1' },
  {
    name: 'dl',
    value: 'https://www.prudential.com.br/content/prudential/home.html',
  },
  { name: 'dp', value: '/content/prudential/home.html' },
  { name: 'ul', value: 'en-us' },
  { name: 'de', value: 'UTF-8' },
  {
    name: 'dt',
    value: 'Prudential Seguros: A Seguradora de Vida para você | Prudential',
  },
  { name: 'sd', value: '24-bit' },
  { name: 'sr', value: '1920x1080' },
  { name: 'vp', value: '1903x929' },
  { name: 'je', value: '0' },
  { name: '_u', value: 'SCCAiUADRAAAAAAAI' },
  { name: 'jid', value: '' },
  { name: 'gjid', value: '' },
  { name: 'cid', value: '559288463.1663268757' },
  { name: 'tid', value: 'UA-185685971-1' },
  { name: '_gid', value: '2046261623.1665059281' },
  { name: 'gtm', value: '2wga50TGPQ9BD' },
  { name: 'cd10', value: 'google-organico' },
  { name: 'z', value: '1545759396' },
];

function TableContainerHit({ pageId }: TableContainerHitProps) {
  const { hitList } = useHitList();

  const hits = hitList.reduce((accumulator, item) => {
    if (item.pageId === pageId) accumulator = [...accumulator, item];
    return accumulator;
  }, [] as Hit[]);

  return (
    <TableContainer component={Paper}>
      {/* {hits
        .slice()
        .reverse()
        .map(hit => ( */}
      <Table size="small">
        <>
          <TableHead>
            <TableRow>
              <TableCell>hit.requestType</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(item => (
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
      {/* ))} */}
    </TableContainer>
  );
}

export default TableContainerHit;
