import * as React from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

// Icons
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import SchemaDialog from './SchemaDialog';

import FileErrorDialog from './FileErrorDialog';

import { HitModel } from '../models/HitModel';


// --------------------------------------------------------
// ActionsBar
// --------------------------------------------------------
interface ActionsBarProps {
    filters: {
        searchBarActive: boolean;
        searchedText: string;
        filterListActive: boolean;
        filterButtons: string[];
        filterStatus: string[];
    },
    setFilters: React.Dispatch<React.SetStateAction<{
        searchBarActive: boolean;
        searchedText: string;
        filterListActive: boolean;
        filterButtons: string[];
        filterStatus: string[];
    }>>,
    dataLayerSchema: {
        fileName: string;
        schema: {};
    },
    setDataLayerSchema: React.Dispatch<React.SetStateAction<{
        fileName: string;
        schema: {};
    }>>,
    handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void,

    schemaDialogOpen: boolean,
    setSchemaDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,

    fileErrorDialogOpen: boolean,
    setFileErrorDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,

    hitList: HitModel,
    setHitList: React.Dispatch<React.SetStateAction<HitModel>>,
}


/**
 * ActionsBar, with status filters / indicators, JSON schema handler and Expand / Collapse all buttons.
 *
 * @param  props.getValidationIndicators    Function that returns the number of hits, filtered by specified status
 * @param  props.accordionExpandAll     Function to expand or collapse all hits.
 * @param  props.filters        Filters applied.
 * @param  props.setFilters     Filters setter function.
 * @param  props.dataLayerSchema        JSON schema used for validation.
 * @param  props.setDataLayerSchema     dataLayerSchema setter function.
 * @param  props.handleFileUpload     Function that handles JSON schema file.
 * @param  props.fileErrorDialogOpen    Wether the FileErrorDialog is open.
 * @param  props.setFileErrorDialogOpen     FileErrorDialog state setter.
 * @return      JSX.Element
 */
function ActionsBar(props: ActionsBarProps) {
    return (
        <Stack direction='row' spacing={1} sx={{ mt: 1, px: 1, justifyContent: 'space-between', flexWrap: 'wrap', }}>
            <Stack direction='row' spacing={1} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                {/*
                -----------------------------
                Text
                -----------------------------
                */}
                <Typography sx={{ fontWeight: 500 }}>
                    Status
                </Typography>
                {/*
                -----------------------------
                Status filters / indicators
                -----------------------------
                */}
                <ToggleButtonGroup
                    value={props.filters.filterStatus}
                    onChange={(event: React.MouseEvent<HTMLElement, MouseEvent>, value: string[]) => props.setFilters({ ...props.filters, filterStatus: value })}
                    size='small'
                    sx={{ p: 0 }}
                    color='warning'
                >
                    <ToggleButton aria-label='Toggle GA 4 filter' title='Error' value='ERROR' sx={{ color: 'inherit', py: 0.3 }}>
                        <ErrorOutlineIcon fontSize='small' color='error' />
                        <Typography color='error.main'>
                            {props.hitList.getValidationIndicators('ERROR')}
                        </Typography>
                    </ToggleButton>
                    <ToggleButton aria-label='Toggle Pageview filter' title='Warning' value='WARNING' sx={{ color: 'inherit', py: 0.3 }}>
                        <WarningAmberIcon fontSize='small' color='warning' />
                        <Typography color='warning.main'>
                            {props.hitList.getValidationIndicators('WARNING')}
                        </Typography>
                    </ToggleButton>
                    <ToggleButton aria-label='Toggle App View filter' title='Success' value='SUCCESS' sx={{ color: 'inherit', py: 0.3 }}>
                        <CheckCircleOutlineIcon fontSize='small' color='success' />
                        <Typography color='success.main'>
                            {props.hitList.getValidationIndicators('SUCCESS')}
                        </Typography>
                    </ToggleButton>
                </ToggleButtonGroup>

                {/*
                -----------------------------
                JSON Schema
                -----------------------------
                */}
                <Chip
                    label='JSON SCHEMA'
                    variant={props.dataLayerSchema.fileName ? 'filled' : 'outlined'}
                    onClick={() => props.setSchemaDialogOpen(!props.schemaDialogOpen)}
                    onDelete={() => props.setDataLayerSchema({ fileName: '', schema: {} })}
                />
                <SchemaDialog
                    open={props.schemaDialogOpen}
                    setOpen={props.setSchemaDialogOpen}
                    setDataLayerSchema={props.setDataLayerSchema}
                    dataLayerSchema={props.dataLayerSchema}
                    handleFileUpload={props.handleFileUpload}
                />
                <FileErrorDialog
                    open={props.fileErrorDialogOpen}
                    setOpen={props.setFileErrorDialogOpen}
                />
            </Stack>

            {/*
            -----------------------------
            Expand / Collapse buttons
            -----------------------------
            */}
            <Stack direction='row' spacing={1} sx={{ pt: { xs: 1, sm: 0 } }}>
                <Button
                    variant='outlined'
                    size='small'
                    startIcon={<UnfoldMoreIcon />}
                    onClick={() => props.setHitList(oldHitList => {
                        let newhitList = new HitModel(oldHitList);
                        newhitList.expandAll(true);
                        return newhitList;
                    })}
                >

                    <Typography sx={{ fontSize: 12 }}>
                        Expand All
                    </Typography>
                </Button>
                <Button
                    variant='outlined'
                    size='small'
                    startIcon={<UnfoldLessIcon />}
                    onClick={() => props.setHitList(oldHitList => {
                        let newhitList = new HitModel(oldHitList);
                        newhitList.expandAll(false);
                        return newhitList;
                    })}
                >
                    <Typography sx={{ fontSize: 12 }}>
                        Collapse All
                    </Typography>
                </Button>
            </Stack>
        </Stack>
    );
}


export default ActionsBar;