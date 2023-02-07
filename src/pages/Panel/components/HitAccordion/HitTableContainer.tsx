import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { metadata } from '../../utils/2.metadata';

interface HitTableContainerProps {
  hitParameters: { [key: string]: string };
}

/**
 * Render a Hit component, with data from one single hit
 *
 * @param  props.hitParameters  Object formed from query string
 * @returns  JSX.Element
 */
function HitTableContainer(props: HitTableContainerProps) {
  return (
    <TableContainer component={Paper} sx={{ mb: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Parameter</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(props.hitParameters)
            // Remove parameters that start with underscore (_)
            .filter(key => !key.startsWith('_'))
            .map(key => (
              <TableRow key={key}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ pt: 0.25, pb: 0.25 }}
                >
                  {metadata[key] ? metadata[key].name : key}
                </TableCell>
                <TableCell sx={{ pt: 0, pb: 0 }}>
                  {props.hitParameters[key]}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default HitTableContainer;
