import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Router from "next/router";

export default function AlertDialog() {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    Router.push("/login");
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Oturum Süresi Doldu!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Oturum süresi doldu!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Çıkış Yap
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
