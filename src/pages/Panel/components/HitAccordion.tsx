import * as React from 'react';

import Paper from '@mui/material/Paper';
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
import { HitModel } from '../models/HitModel';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


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
    expanded: boolean,
    setHitList: React.Dispatch<React.SetStateAction<HitModel>>,
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
 * @param  props.expanded       Hit accordion state (expanded or not)
 * @param  props.setHitList       hitList setter function
 * @param  props.validationStatus       Status of validation ('ERROR', 'WARNING' or 'SUCCESS')
 * @param  props.validationResult       Validation result object, containing status and messages
 * @return      JSX.Element
 */
function HitAccordion(props: HitAccordionProps) {

    return (
        <List
            sx={{ mx: 2, py: 0, my: 1 }}
            component={Paper}
            elevation={3}
        >
            <ListItemButton
                sx={{ px: 2, py: 0, border: 1, borderColor: 'rgba(255, 255, 255, 0.12)', }}
                onClick={() => props.setHitList(oldHitList => {
                    let newhitList = new HitModel(oldHitList);
                    newhitList.toggleDataExpanded(props.hitListKey);
                    return newhitList;
                })}
            >
                <ListItemIcon>
                    {props.expanded ? <ExpandLess /> : <ExpandMore />}
                    {statusIcon[props.validationStatus] ? statusIcon[props.validationStatus] : statusIcon['WARNING']}
                    {hitTypeIconImg[props.hitTypeIcon]}
                </ListItemIcon>
                <ListItemText sx={{ ml: 1 }} primary={props.contentTitle} />
                <div onClick={(event) => event.stopPropagation()}>
                    <IconButton
                        title='Delete'
                        onClick={() => props.setHitList(oldHitList => {
                            let newhitList = new HitModel(oldHitList);
                            newhitList.removeData(props.hitListKey);
                            return newhitList;
                        })}
                    >
                        <ClearIcon fontSize="small" />
                    </IconButton>
                </div>
            </ListItemButton>
            <Collapse in={props.expanded} timeout={0} mountOnEnter unmountOnExit>
                <TableContainer component={Paper} sx={{ mb: 2 }}>
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
            </Collapse>
        </List>
    );
}

export default HitAccordion;