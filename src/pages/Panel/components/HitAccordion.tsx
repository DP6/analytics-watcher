import * as React from 'react';

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

import * as RW from '../utils/3.hitParser';
import { metadata } from '../utils/2.metadata';


/**
 * Render Hit type icon
 */
const hitTypeIconImg: { [key: string]: JSX.Element } = {
    event: <FlashOnIcon fontSize="small" />,
    pageview: <FindInPageIcon fontSize="small" />,
    appview: <AppsIcon fontSize="small" />,
    transaction: <MonetizationOnIcon fontSize="small" />,
    item: < ShoppingBasketIcon fontSize="small" />,
    social: <ShareIcon fontSize="small" />,
    exception: <ReportIcon fontSize="small" />,
    timing: <TimelapseIcon fontSize="small" />,
    analytics4: <Filter4Icon fontSize="small" />,
};


/**
 * Status icons
 */
const statusIcon: { [key: string]: JSX.Element } = {
    ERROR: <ErrorOutlineIcon fontSize='small' color='error' sx={{ mr: 1 }} />,
    WARNING: <WarningAmberIcon fontSize='small' color='warning' sx={{ mr: 1 }} />,
    SUCCESS: <CheckCircleOutlineIcon fontSize='small' color='success' sx={{ mr: 1 }} />,
};

// --------------------------------------------------------
// Hit element: Accordion
// --------------------------------------------------------
interface HitAccordionProps {
    hitParameters: { [key: string]: string },
    contentTitle: string,
    hitTypeIcon: string,
    hitListKey: number,
    removeHit: Function,
    expanded: boolean,
    handleAccordionChange: Function,
    validationStatus: string,
    validationResult: any[],
}


/**
 * Render a Hit component, with data from one single hit
 *
 * @param  props.hitParameters  Object formed from query string
 * @param  props.contentTitle   Hit title
 * @param  props.hitTypeIcon    Type of hit
 * @param  props.hitListKey     key ID of hit
 * @param  props.removeHit      Function that removes a hit entry
 * @param  props.expanded       Hit accordion state (expanded or not)
 * @param  props.handleAccordionChange  Function that handles accordion expansion
 * @param  props.validationStatus       Status of validation ('ERROR', 'WARNING' or 'SUCCESS')
 * @param  props.validationResult       Validation result object, containing status and messages
 * @return      JSX.Element
 */
function HitAccordion(props: HitAccordionProps) {
    return (
        <Accordion
            expanded={props.expanded}
            onChange={() => props.handleAccordionChange(props.hitListKey)}
        >
            <AccordionSummary
                sx={{
                    '& .MuiAccordionSummary-content': {
                        mt: 0,
                        mb: 0,
                    },
                    '& .MuiAccordionSummary-content.Mui-expanded.MuiAccordionSummary-contentGutters': {
                        mt: 0,
                        mb: 0,
                    },
                    minHeight: 40,
                }}
            >
                <div style={{ width: '100%' }}>
                    <Box display="flex" flexDirection="row" sx={{ justifyContent: 'space-between', }}>
                        <Box display="flex" alignItems="center" flexDirection="row">
                            {/* <Box component="span" sx={{ mr: 1, bgcolor: props.color, width: 15, height: 15, borderRadius: '50%' }} /> */}
                            {statusIcon[props.validationStatus]? statusIcon[props.validationStatus] : statusIcon['WARNING']}
                            {hitTypeIconImg[props.hitTypeIcon]}
                            <Typography fontSize='small' sx={{ ml: 1, flexGrow: 1 }}>{props.contentTitle}</Typography>
                        </Box>
                        <div onClick={(event) => event.stopPropagation()}>
                            <IconButton onClick={() => props.removeHit(props.hitListKey)} title='Delete'>
                                <ClearIcon fontSize="small" />
                            </IconButton>
                        </div>
                    </Box>
                </div>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0, '& .MuiAccordionDetails-root': { pt: 0 }, }}>
                {props.validationResult
                    .map((key, index) => {
                        let severity: AlertColor;
                        if (key.status === 'ERROR') {
                            severity = 'error';
                        } else if (key.status === 'WARNING') {
                            severity = 'warning';
                        } else {
                            severity = 'success';
                        }
                        return <Alert key={index} severity={severity}>{key.status} - {key.message}</Alert>;
                    })
                }

                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Parameter</TableCell>
                                <TableCell >Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(props.hitParameters)
                                // Remove parameters that start with underscore (_)
                                .filter((key) => !key.startsWith('_'))
                                .map((key) => (
                                    <TableRow
                                        key={key}
                                    >
                                        <TableCell component="th" scope="row" sx={{ pt: 0.25, pb: 0.25 }}>{RW.decode(metadata[key] ? metadata[key].name : key)}</TableCell>
                                        <TableCell sx={{ pt: 0, pb: 0 }}>{props.hitParameters[key]}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </AccordionDetails>
        </Accordion >
    );
}

export default HitAccordion;