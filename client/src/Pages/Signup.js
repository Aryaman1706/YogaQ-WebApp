import React, { useState } from "react";
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
import axios from "../utils/axios";

const Signup = () => {
  const history = useHistory();
  const parsed = queryString.parse(history.location.search);
  const fields = parsed.fields.trim().split("-");
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
    if (!fields.includes("phoneNumber")) {
      body.phoneNumber = undefined;
    }
    axios.put("/user/signup", body).then((res) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success",
        text: "Account Registeration Complete!",
        showConfirmButton: true,
        timer: 1500,
      }).then(() => {
        history.push("/");
      });
    });
  };

  const render = () => {
    if (fields.includes("phoneNumber")) {
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
    </>
  );
};

export default Signup;
