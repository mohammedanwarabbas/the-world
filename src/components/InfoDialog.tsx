import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const InfoDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(true);

  const handleClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    setDialogOpen(true);
  }, []);

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Project Information"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        I developed this Typescript project using React.js, Redux, and MUI. It includes features such as a country search filter and a region filter to display relevant country information. This is my current company's project developed as part of a training test.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoDialog;
