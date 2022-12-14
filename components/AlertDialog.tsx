import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Router from "next/router";
import Cookies from "js-cookie";

export default function AlertDialog() {
  const [open, setOpen] = React.useState(true);
  const user = Cookies.get("token");

  const handleClose = () => {
    Cookies.remove("token");
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
        <DialogTitle id="alert-dialog-title">
          {user ? "Oturum Süresi Doldu" : "Sayfayı görüntülemek için giriş yap"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {user
              ? "Oturum Süresi Doldu"
              : "Sayfayı görüntülemek için giriş yap"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            {user ? "Çıkış Yap" : "Giriş Yap"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
