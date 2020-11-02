import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";

const ChangePassword = () => {
  const [state, setState] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const changeHandler = (event) => {
    setState((prev) => {
      return { ...prev, [event.target.id]: event.target.value };
    });
  };

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
        console.log(state);
      } else {
        console.log("Passwords do not match.");
      }
    } else {
      console.log("Invalid Inputs.");
    }
  };

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
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
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
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
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
