import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, DialogContentText, Button } from '@mui/material';
import React, { useState } from 'react';
import { sendEmail } from '../../api';

const SendEmailDialog = ({ onClose, setOpenSnackbar, searchWord }) => {
    const [userEmail, setUserEmail] = useState('');

    const url = window.location.href;

    const send = async () => {
        const urlToSend = searchWord ? `${url}?filter=${searchWord}` : url;
        await sendEmail(userEmail, urlToSend);
        setOpenSnackbar(true);
        onClose();
    };

    return (
        <Dialog onClose={onClose} open={true}>
            <DialogTitle>Share content</DialogTitle>
            <DialogContent>
                <DialogContentText>To share this content to a friend please give us the email</DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={send}>Share Content</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SendEmailDialog;
