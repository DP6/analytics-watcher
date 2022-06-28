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


// --------------------------------------------------------
// PanelBar
// --------------------------------------------------------
interface PanelBarProps {
    accordionExpandAll: Function,
}


/**
 * PanelBar, with status filters / indicators, JSON schema handler and Expand / Collapse all buttons.
 *
 * @param  props.getValidationIndicators    Function that returns the number of hits, filtered by specified status
 * @param  props.accordionExpandAll     Function to expand or collapse all hits.
 * @param  props.filters        Filters applied.
 * @param  props.setFilters     Filters setter function.
 * @param  props.dataLayerSchema        JSON schema used for validation.
 * @param  props.setDataLayerSchema     dataLayerSchema setter function.
 * @param  props.handleFileUpload     Function that handles JSON schema file.
 * @return      JSX.Element
 */
function PanelBar(props: PanelBarProps) {
    return (
        <Stack direction='row' spacing={1} sx={{ mt: 1, px: 1, justifyContent: 'space-between', flexWrap: 'wrap', }}>
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
                    onClick={() => props.accordionExpandAll(true)}
                >

                    <Typography sx={{ fontSize: 12 }}>
                        Expand All
                    </Typography>
                </Button>
                <Button
                    variant='outlined'
                    size='small'
                    startIcon={<UnfoldLessIcon />}
                    onClick={() => props.accordionExpandAll(false)}
                >
                    <Typography sx={{ fontSize: 12 }}>
                        Collapse All
                    </Typography>
                </Button>
            </Stack>
        </Stack>
    );
}


export default PanelBar;