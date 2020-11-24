import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import Swal from "sweetalert2";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { doctor } from "../../../redux/actions/index";

const ChangePassword = () => {
  const [state, setState] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [compLoading, setCompLoading] = useState(false);

  const changeHandler = (event) => {
    setState((prev) => {
      return { ...prev, [event.target.id]: event.target.value };
    });
  };

  const toggleOld = (event) => {
    setShowOld((prev) => {
      return !prev;
    });
  };

  const toggleNew = (event) => {
    setShowNew((prev) => {
      return !prev;
    });
  };

  const { error, message } = useSelector((state) => state.doctor);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(doctor.clearError());
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (/^Validation Error*/i.test(error)) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error Occured.",
        text: error,
        showConfirmButton: true,
        timer: 1500,
      });
    }
    if (/Password changed successfully*/i.test(message)) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success!",
        text: message,
        showConfirmButton: true,
        timer: 1500,
      });
    }
    // eslint-disable-next-line
  }, [error, message]);

  const submitHandler = (event) => {
    if (
      state.oldPassword.length > 0 &&
      state.newPassword.length > 0 &&
      state.confirmPassword.length > 0 &&
      state.oldPassword.length >= 8 &&
      state.oldPassword.length <= 20 &&
      state.newPassword.length >= 8 &&
      state.newPassword.length <= 20 &&
      state.confirmPassword.length >= 8 &&
      state.confirmPassword.length <= 20
    ) {
      if (state.newPassword.trim() === state.confirmPassword.trim()) {
        setCompLoading(true);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error Occured.",
          text: "Passwords do not match. Try Again.",
          showConfirmButton: true,
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error Occured.",
        text: "Invalid Data. Kindly check the form.",
        showConfirmButton: true,
        timer: 1500,
      });
    }
  };

  const submit = async () => {
    await dispatch(doctor.changePassword(state));
    setCompLoading(false);
  };

  useEffect(() => {
    if (compLoading) {
      submit();
    }
    // eslint-disable-next-line
  }, [compLoading]);

  return (
    <>
      <Grid container direction="row" justify="center" alignItems="stretch">
        <Grid item xs={2} lg={4}></Grid>
        <Grid item xs={8} lg={4}>
          <Grid
            container
            direction="column"
            justify="space-around"
            alignItems="stretch"
            spacing={2}
          >
            <Grid item>
              <Typography variant="h4" align="center">
                Change Password
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                type={showOld ? "text" : "password"}
                label="Old Password"
                id="oldPassword"
                variant="outlined"
                value={state.oldPassword}
                onChange={(event) => changeHandler(event)}
                error={
                  state.oldPassword.length > 0 &&
                  (state.oldPassword.length > 20 ||
                    state.oldPassword.length < 8)
                }
                helperText={
                  state.oldPassword.length > 0 &&
                  (state.oldPassword.length > 20 ||
                    state.oldPassword.length < 8)
                    ? "Password must be between 8 to 20 characters long."
                    : null
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={(event) => toggleOld(event)}>
                        {showOld ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                type={showNew ? "text" : "password"}
                label="New Password"
                id="newPassword"
                variant="outlined"
                value={state.newPassword}
                onChange={(event) => changeHandler(event)}
                error={
                  state.newPassword.length > 0 &&
                  (state.newPassword.length > 20 ||
                    state.newPassword.length < 8)
                }
                helperText={
                  state.newPassword.length > 0 &&
                  (state.newPassword.length > 20 ||
                    state.newPassword.length < 8)
                    ? "Password must be between 8 to 20 characters long."
                    : null
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={(event) => toggleNew(event)}>
                        {showNew ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                type={showNew ? "text" : "password"}
                label="Confirm Password"
                id="confirmPassword"
                variant="outlined"
                value={state.confirmPassword}
                onChange={(event) => changeHandler(event)}
                error={
                  state.confirmPassword.length > 0 &&
                  (state.confirmPassword.length > 20 ||
                    state.confirmPassword.length < 8)
                }
                helperText={
                  state.confirmPassword.length > 0 &&
                  (state.confirmPassword.length > 20 ||
                    state.confirmPassword.length < 8)
                    ? "Password must be between 8 to 20 characters long."
                    : null
                }
              />
            </Grid>
            <Grid item>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={(event) => submitHandler(event)}
              >
                Change Password
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} lg={4}></Grid>
      </Grid>
    </>
  );
};

export default ChangePassword;
