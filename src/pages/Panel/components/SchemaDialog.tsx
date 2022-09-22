import * as React from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Icons
import FileUpload from '@mui/icons-material/FileUpload';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

// --------------------------------------------------------
// SchemaDialog
// --------------------------------------------------------
interface SchemaDialogProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,

    dataLayerSchema: {
        fileName: string;
        schema: {};
    },
    setDataLayerSchema: React.Dispatch<React.SetStateAction<{
        fileName: string;
        schema: {};
    }>>,

    handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void,

}

/**
 * Dialog window that handles JSON schema file.
 *
 * @param  props.open    Dialog state.
 * @param  props.setOpen     Dialog state setter function.
 * @param  props.dataLayerSchema        JSON schema used for validation.
 * @param  props.setDataLayerSchema     dataLayerSchema setter function.
 * @param  props.handleFileUpload     Function that handles JSON schema file.
 * @return      JSX.Element
 */
function SchemaDialog(props: SchemaDialogProps) {

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={() => props.setOpen(!props.open)}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>
                    {props.dataLayerSchema.fileName ? props.dataLayerSchema.fileName : 'No schema selected'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description' component={'span'}>
                        <pre>{JSON.stringify(props.dataLayerSchema.schema, null, 2)}</pre>
                    </DialogContentText>
                </DialogContent>
                <DialogActions >
                    <Stack direction='row' spacing={2} sx={{ flexWrap: 'wrap' }}>
                        <Button
                            component="label"
                            variant="outlined"
                            title='Upload'
                        >
                            <input hidden type="file" onChange={props.handleFileUpload} />
                            <FileUpload fontSize='small' />
                            <Typography
                                variant='button'
                                sx={{ display: { xs: 'none', sm: 'block' } }}
                            >
                                Upload
                            </Typography>
                        </Button>
                        <Button
                            component="label"
                            variant="outlined"
                            title='Remove'
                            onClick={() => props.setDataLayerSchema({ fileName: '', schema: {} })}
                        >
                            <DeleteIcon fontSize='small' />
                            <Typography
                                variant='button'
                                sx={{ display: { xs: 'none', sm: 'block' } }}
                            >
                                Remove
                            </Typography>
                        </Button>
                        <Button
                            component="label"
                            variant="outlined"
                            title='Close'
                            onClick={() => props.setOpen(!props.open)}
                        >
                            <CloseIcon fontSize='small' />
                            <Typography
                                variant='button'
                                sx={{ display: { xs: 'none', sm: 'block' } }}
                            >
                                Close
                            </Typography>
                        </Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </div >
    );
}


export default SchemaDialog;