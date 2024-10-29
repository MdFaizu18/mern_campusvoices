import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function DialogBox({title}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Box variant="outlined" onClick={handleClickOpen}>
              {title}
            </Box>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    CampusVoices - Terms & Conditions
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Welcome to Campus Voices! By using our platform, you agree to the following terms and conditions. Please read them carefully.
                       
                            </Typography>
                            <br />
                    <Typography gutterBottom>
                        1. Acceptance of Terms ✔ 
                    </Typography>
                    <Typography gutterBottom>
                        By accessing or using Campus Voices, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our platform.
                    </Typography>
                    <br />
                    <Typography gutterBottom>

                        2. User Responsibilities ✔ 
                     </Typography>
                    <Typography gutterBottom>
                        You must provide accurate and up-to-date information when creating your account.
                        You agree not to engage in any activity that disrupts or damages the platform, including the posting of inappropriate content or misuse of features.
                        You are responsible for maintaining the confidentiality of your account information.
                     </Typography>
                     <br />
                     <Typography gutterBottom>
                        3.  Content Ownership ✔ 
                     </Typography>
                    <Typography gutterBottom>

                        All content submitted on Campus Voices, including feedback, reviews, and ratings, remains the property of the user who submitted it. However, by submitting content, you grant Campus Voices the right to display, share, and modify this content for platform purposes.
                        Content that violates any third-party rights, or is harmful, offensive, or unlawful, will be removed.
                     </Typography>
                     <br />
                     <Typography gutterBottom>

                        4.  Privacy Policy ✔ 
                     </Typography>
                    <Typography gutterBottom>
                        Your personal information will be collected and processed in accordance with our Privacy Policy. Campus Voices values your privacy and will take reasonable steps to protect your data.
                     
                     </Typography>
                     <br />
                    <Typography gutterBottom>
                        5.  Contact Us ✔ 
                        
                     </Typography>
                   
                    <Typography gutterBottom>
                        If you have any questions or concerns about these terms, please contact us at @mahendraInstituteOfTechnology.

                     </Typography>
                     <br />
                    <Typography gutterBottom>
                        By using Campus Voices, you acknowledge that you have read, understood, and agree to these Terms and Conditions.

                     </Typography>
                   
               
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Yes, I understood
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}
