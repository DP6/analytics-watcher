import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// --------------------------------------------------------
// SchemaDialog
// --------------------------------------------------------
interface FileErrorDialogProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

/**
 * Dialog window that handles JSON schema file.
 *
 * @param  props.open    FileErrorDialog's state.
 * @param  props.setOpen     FileErrorDialog's state setter.
 * @return      JSX.Element
 */
function FileErrorDialog(props: FileErrorDialogProps) {

    return (
        <Dialog
            open={props.open}
            onClose={props.setOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Error trying to parse the file
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Please select a valid JSON schema file.
                    For info about how to configure the schema, please refer to:
                    https://github.com/DP6/analytics-watcher#Json-schema
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setOpen(!props.open)} autoFocus> Close </Button>
            </DialogActions>
        </Dialog>
    );
}


export default FileErrorDialog;