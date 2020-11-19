import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { admin } from "../../redux/actions/index";

const Register = () => {
  const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/gi;
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { error, message } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const changeHandler = (event) => {
    setUser((prev) => {
      return { ...prev, [event.target.id]: event.target.value };
    });
  };

  useEffect(() => {
    return () => {
      dispatch(admin.clear());
      setUser({ username: "", email: "", password: "" });
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (/Validation Error*/i.test(error)) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error Occured.",
        text: error,
        showConfirmButton: true,
        timer: 1500,
      });
    }
    if (/New admin registered successfully*/i.test(message)) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success!",
        text: message,
        showConfirmButton: true,
        timer: 1500,
      });
      setUser({ username: "", email: "", password: "" });
    }
    // eslint-disable-next-line
  }, [error, message]);

  const submitHandler = (event) => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0 &&
      user.email.length < 150 &&
      emailRegex.test(user.email) &&
      user.password.length >= 8 &&
      user.password.length <= 20 &&
      user.username.length >= 5 &&
      user.username.length <= 40
    ) {
      dispatch(admin.register(user));
      setUser({
        username: "",
        email: "",
        password: "",
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error Occured.",
        text: "Invalid Inputs. Please Try Again.",
        showConfirmButton: true,
        timer: 1500,
      });
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
                Create a new Admin
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="UserName"
                id="username"
                variant="outlined"
                value={user.username}
                onChange={(event) => changeHandler(event)}
                error={
                  user.username.length > 0 &&
                  (user.username.length < 5 || user.username.length > 40)
                }
                helperText={
                  user.username.length > 0 &&
                  (user.username.length < 5 || user.username.length > 40)
                    ? "UserName must be between 5 and 40 characters."
                    : null
                }
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="Email Address"
                id="email"
                variant="outlined"
                value={user.email}
                onChange={(event) => changeHandler(event)}
                error={
                  user.email.length > 0 &&
                  (user.email.length > 150 || !emailRegex.test(user.email))
                }
                helperText={
                  user.email.length > 0 &&
                  (user.email.length > 150 || !emailRegex.test(user.email))
                    ? "Enter Valid Email Address."
                    : null
                }
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="Password"
                id="password"
                variant="outlined"
                value={user.password}
                onChange={(event) => changeHandler(event)}
                error={
                  user.password.length > 0 &&
                  (user.password.length > 20 || user.password.length < 8)
                }
                helperText={
                  user.password.length > 0 &&
                  (user.password.length > 20 || user.password.length < 8)
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
                Create
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} lg={4}></Grid>
      </Grid>
    </>
  );
};

export default Register;
