import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
} from "@material-ui/core";

import { Visibility, VisibilityOff } from "@material-ui/icons";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [show, setShow] = useState(false);

  const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/gi;

  const changeHandler = (event) => {
    setUser((prev) => {
      return { ...prev, [event.target.id]: event.target.value };
    });
  };

  const passwordToggle = (event) => {
    setShow((prev) => {
      return !prev;
    });
  };

  const submitHandler = (event) => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.email.length < 150 &&
      emailRegex.test(user.email) &&
      user.password.length >= 8 &&
      user.password.length <= 20
    ) {
      console.log(user);
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
                Login as Admin
              </Typography>
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
                    ? "Enter Valid Email Address"
                    : null
                }
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                type={show ? "text" : "password"}
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={(event) => passwordToggle(event)}>
                        {show ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={(event) => submitHandler(event)}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} lg={4}></Grid>
      </Grid>
    </>
  );
};

export default Login;
