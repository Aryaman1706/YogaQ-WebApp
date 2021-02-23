import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  TextField,
  Grid,
  Typography,
  Button,
  Toolbar,
} from "@material-ui/core";
import queryString from "query-string";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { user as userActions } from "../redux/actions/index";
import UserAppbar from "../Components/Common/Appbar";

const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { error, user } = useSelector((state) => state.user);
  const [prop, setProp] = useState([]);
  useEffect(() => {
    const parsed = queryString.parse(history.location.search);
    if (!parsed.fields || !parsed.fields.includes("country")) {
      history.push("/");
    } else {
      const fields = parsed.fields.trim().split("-");
      setProp(fields);
    }
    return () => {
      dispatch(userActions.clearIncompleteProfile());
      dispatch(userActions.clear());
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (/^Validation Failed.*/i.test(error)) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error!",
        text: `${error}`,
        showConfirmButton: true,
        timer: 1500,
      });
    }
    if (user && user.complete) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [error, user]);

  const [state, setState] = useState({
    country: "",
    phoneNumber: "",
  });

  const changeHandler = (e) => {
    setState((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };

  const submitHandler = (e) => {
    const body = { ...state };
    if (!prop.includes("phoneNumber")) {
      body.phoneNumber = undefined;
    }
    dispatch(userActions.sigupUser(body));
  };

  const render = () => {
    if (prop.includes("phoneNumber")) {
      return (
        <>
          <Grid item>
            <TextField
              fullWidth
              variant="outlined"
              label="Country"
              id="country"
              value={state.country}
              onChange={(event) => changeHandler(event)}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              variant="outlined"
              label="Phone Number"
              id="phoneNumber"
              value={state.phoneNumber}
              onChange={(event) => changeHandler(event)}
            />
          </Grid>
        </>
      );
    } else {
      return (
        <>
          <Grid item>
            <TextField
              fullWidth
              variant="outlined"
              label="Country"
              id="country"
              value={state.country}
              onChange={(event) => changeHandler(event)}
            />
          </Grid>
        </>
      );
    }
  };

  return (
    <>
      <UserAppbar type={"user"}>
        <Typography variant="h2" align="center">
          Sign Up
        </Typography>
        <Toolbar></Toolbar>
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
              {render()}
              <Grid item>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={(event) => submitHandler(event)}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2} lg={4}></Grid>
        </Grid>
      </UserAppbar>
    </>
  );
};

export default Signup;
