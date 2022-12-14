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
      <div className="w-full flex justify-center">
        <div
          className="py-1 px-4 w-36 flex justify-center items-center my-5 cursor-pointer select-none bg-smooth-pink shadow-md shadow-smooth-pink text-white font-semibold text-lg rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
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
