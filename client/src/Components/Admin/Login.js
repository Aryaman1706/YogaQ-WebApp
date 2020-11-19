import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Swal from "sweetalert2";
import { admin } from "../../redux/actions";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const { error, isAuthenticated } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    return () => {
      dispatch(admin.clear());
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (/^Validation Error*/i.test(error)) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error Occured.",
        text: `${error}`,
        showConfirmButton: true,
        timer: 1500,
      });
    }
    if (!error && isAuthenticated) {
      history.push("/admin");
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated]);

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
      const formData = {
        username: user.email,
        password: user.password,
      };
      dispatch(admin.loginAdmin(formData));
      dispatch(admin.setLoading(false)); //? Not Sure
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Invalid Credentials.",
        text: "Enter valid email and password.",
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
