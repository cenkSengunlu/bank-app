import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { addBank } from "../slices/bank/bankSlice";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const BankAdd = () => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState<boolean>(false);
  const [modalInput, setModalInput] = useState<string>("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setModalInput("");
    setOpen(false);
  };

  const handleAdd = () => {
    dispatch(addBank(modalInput));
    setModalInput("");
    setOpen(false);
  };
  return (
    <>
      <div>
        <div
          className="py-1 px-4 w-36 flex justify-center items-center my-3 ml-3 cursor-pointer select-none bg-violet-500 border-2 border-violet-600 text-white font-bold text-lg rounded-lg"
          onClick={handleClickOpen}
        >
          Banka Ekle
        </div>
        {/* <Button variant="outlined" onClick={handleClickOpen}>
          Banka ekle
        </Button> */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Banka Ekle</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Banka Adı"
              type="text"
              fullWidth
              variant="standard"
              value={modalInput}
              onChange={(e) => setModalInput(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>İptal</Button>
            <Button onClick={handleAdd}>Ekle</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default BankAdd;
