import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { user as userActions } from "../../redux/actions/index";
import Loader from "../Loader";

const Edit = () => {
  const { error, user, message } = useSelector((state) => state.user);
  const [state, setState] = useState(null);
  const [compLoading, setCompLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setState(user);
    return () => {
      dispatch(userActions.clear());
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (/^Validation Error*/i.test(error)) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error!",
        text: `${error}`,
        showConfirmButton: true,
        timer: 1500,
      });
    }
    if (/Profile updated successfully*/i.test(message)) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success!",
        text: `${message}`,
        showConfirmButton: true,
        timer: 1500,
      });
    }
  }, [error, message]);

  const changeHandler = (e) => {
    setState((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };

  const genderHandler = (e) => {
    setState((prev) => {
      return {
        ...prev,
        gender: e.target.value,
      };
    });
  };

  const submitHandler = (e) => {
    setCompLoading(true);
  };

  const submit = async () => {
    const formData = {
      username: state.username,
      phoneNumber: state.phoneNumber,
      age: state.age,
      gender: state.gender,
      country: state.country,
    };
    await dispatch(userActions.editProfile(formData));
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
              <Typography variant="h5" align="center">
                Edit Profile
              </Typography>
            </Grid>
            {state && !compLoading ? (
              <>
                <Grid item>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Email Address"
                    value={state.email}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="User Name"
                    id="username"
                    value={state.username}
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
                <Grid item>
                  <TextField
                    fullWidth
                    type="number"
                    variant="outlined"
                    label="Age"
                    id="age"
                    value={state.age}
                    onChange={(event) => changeHandler(event)}
                  />
                </Grid>
                <Grid item>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="genderSelect">Gender</InputLabel>
                    <Select
                      labelId="genderSelect"
                      label="Gender"
                      value={state.gender}
                      onChange={(event) => genderHandler(event)}
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
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
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={(event) => submitHandler(event)}
                  >
                    Submit
                  </Button>
                </Grid>
              </>
            ) : (
              <Loader />
            )}
          </Grid>
        </Grid>
        <Grid item xs={2} lg={4}></Grid>
      </Grid>
    </>
  );
};

export default Edit;
