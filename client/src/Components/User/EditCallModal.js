import React, { useState } from "react";
import {
  makeStyles,
  Modal,
  IconButton,
  Slide,
  TextField,
  Grid,
  Button,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import useCallForm from "../../hooks/useCallForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 10,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
    width: "800px",
    outline: "none",
    "&:focus": {
      outline: "none",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btnContainer: {
    alignSelf: "flex-end",
  },
}));

const EditCallModal = ({
  open,
  setOpen,
  chatroomId,
  date: dateData,
  callId,
}) => {
  const classes = useStyles();
  const [date, setDate] = useState(dateData);
  const [, validateEdit] = useCallForm({
    date,
    chatroomId,
    callId,
  });
  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = (e) => {
    setOpen(false);
    validateEdit();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="read-more-modal"
        aria-describedby="read-more-modal-description"
        className={classes.modal}
        disablePortal
      >
        <Slide direction="up" in={open}>
          <div className={classes.paper}>
            <div className={classes.btnContainer}>
              <IconButton
                color="primary"
                aria-label="Close Modal"
                component="span"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Close />
              </IconButton>
            </div>
            <h2 id="modal-title">Edit Call</h2>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="datetime-local"
                  label="Schedule"
                  type="datetime-local"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: "1rem" }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.btn}
                  onClick={(event) => submitHandler(event)}
                >
                  Book
                </Button>
              </Grid>
            </Grid>
          </div>
        </Slide>
      </Modal>
    </>
  );
};
export default EditCallModal;
