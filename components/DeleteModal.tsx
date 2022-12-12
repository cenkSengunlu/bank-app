import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch } from "../app/hooks";
import { deleteBank } from "../slices/bank/bankSlice";
export default function AlertDialog({
  id,
  bank_name,
  isOpen,
  setExpanded,
  setIsOpen,
}: {
  id: number;
  bank_name: string;
  isOpen: boolean;
  setExpanded: any;
  setIsOpen: any;
}) {
  const dispatch = useAppDispatch();
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteBank(id));
    setExpanded(false);
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Banka Sil</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {bank_name} isimli bankayı sil!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
          <Button onClick={handleDelete}>Sil</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
