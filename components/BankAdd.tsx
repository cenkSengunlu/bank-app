import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { addBank } from "../slices/bank/bankSlice";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const BankAdd = () => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    dispatch(addBank("Bertan Bank 3"));
  };
  return (
    <>
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Open form dialog
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Subscribe</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div
        className="py-1 px-4 w-36 flex justify-center items-center my-3 ml-3 cursor-pointer select-none bg-violet-500 border-2 border-violet-600 text-white font-bold text-lg rounded-lg"
        onClick={handleAdd}
      >
        Banka Ekle
      </div>
    </>
  );
};

export default BankAdd;
