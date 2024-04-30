import  DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {Dialog} from "@mui/material";
import {styled} from '@mui/material/styles';

const StyledDialogTitle = styled(DialogTitle)({
    background: '#1E3877',
    color: '#fff',
});

const StyledDialogContent = styled(DialogContent)({
    background: '#fff',
});

const StyledDialogActions = styled(DialogActions)({
    background: '#fff',
});

export default function DialogBox(props: any) {
    const title = props.title || "Successful! "
    return (
        <Dialog
            open={props.isOpen}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <StyledDialogTitle id="alert-dialog-title">
                {title}
            </StyledDialogTitle>
            <StyledDialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.message}
                </DialogContentText>
            </StyledDialogContent>
            <StyledDialogActions>
                <Button onClick={props.handleClose} autoFocus>
                    Ok
                </Button>
            </StyledDialogActions>
        </Dialog>
    );
}
