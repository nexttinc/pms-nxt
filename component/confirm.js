import MUIButton from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
export default function SelectBox(props) {
  const [showConfirm, setShowConfirm] = useState(props.isOpen);
  const handleClose = () => {
    setShowConfirm(false);
  };

  const handleOk = () => {
    setShowConfirm(false);
    props.setAction("del");
  };
  return (
    <>
      {showConfirm && (
        <Dialog
          open={showConfirm}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{props.message}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {props.bodyMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <MUIButton className="font-extrabold" onClick={handleClose}>
              취소
            </MUIButton>
            <MUIButton className="font-extrabold" onClick={handleOk} autoFocus>
              확인
            </MUIButton>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
