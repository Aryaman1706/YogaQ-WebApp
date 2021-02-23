import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Loader from "../../Common/Loader";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { doctor as doctorActions } from "../../../redux/actions/index";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/gi;
  const [compLoading, setCompLoading] = useState(false);

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

  const { error, isAuthenticated } = useSelector((state) => state.doctor);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    return () => {
      dispatch(doctorActions.clear());
    };
    // eslint-disable-next-line
  }, []);

  const errorHandling = () => {
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

    dispatch(doctorActions.clear());
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/doctor");
    }

    if (error) errorHandling();
    // eslint-disable-next-line
  }, [error, isAuthenticated]);

  const submitHandler = (event) => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.email.length < 150 &&
      emailRegex.test(user.email) &&
      user.password.length >= 8 &&
      user.password.length <= 20
    ) {
      setCompLoading(true);
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

  const submit = async () => {
    await dispatch(
      doctorActions.loginDoctor({
        username: user.email,
        password: user.password,
      })
    );
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
                Login as Doctor
              </Typography>
            </Grid>
            {compLoading ? (
              <Loader />
            ) : (
              <>
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
                          <IconButton
                            onClick={(event) => passwordToggle(event)}
                          >
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
                    style={{
                      backgroundColor: "#0FC1A7",
                      height: "50px",
                      backgroundImage:
                        "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
                    }}
                  >
                    Login
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
        <Grid item xs={2} lg={4}></Grid>
      </Grid>
    </>
  );
};

export default Login;
