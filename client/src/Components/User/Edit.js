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
  makeStyles,
  Paper,
} from "@material-ui/core";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { user as userActions } from "../../redux/actions/index";
import Loader from "../Loader";
import background from "../../assets/background.svg";
import homeIcon from "../../assets/home.svg";
import { useHistory } from "react-router-dom";
import UserAppbar from "./UserAppbar";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundAttachment: "fixed",
  },
  btn: {
    backgroundColor: "#0FC1A7",
    height: "50px",
    backgroundImage: "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
  },
  paper: {
    padding: 50,
    marginTop: "6rem",
    [theme.breakpoints.only("xs")]: {
      padding: 10,
      marginTop: "1rem",
    },
  },
  homeIcon: {
    height: "1.5rem",
    width: "auto",
    objectFit: "contain",
    margin: "auto 0 auto 0",
    paddingRight: "0.5rem",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    width: "fit-content",
    padding: "0.5rem",
    "&:hover": {
      backgroundColor: "rgb(211,211,211, 0.4)",
      cursor: "pointer",
      borderRadius: "10px",
      transition: "all 0.2s ease-in-out",
    },
  },
  homeText: {
    fontSize: "1rem",
    lineHeight: "1.5rem",
    margin: "auto 0 auto 0",
  },
}));

const Edit = () => {
  const { error, user, message, loading } = useSelector((state) => state.user);
  const [state, setState] = useState(null);
  const [compLoading, setCompLoading] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    return () => {
      dispatch(userActions.clear());
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(user);
    setState(user);
  }, [user]);

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
      <UserAppbar>
        <div className={classes.container}>
          <Grid container direction="row" justify="center" alignItems="stretch">
            <Grid item xs={11} sm={10} lg={6}>
              <Paper elevation={8} className={classes.paper}>
                <Grid
                  container
                  direction="column"
                  justify="space-around"
                  alignItems="stretch"
                  spacing={2}
                >
                  <Grid item xs={12}>
                    <div
                      className={classes.flexRow}
                      onClick={() => {
                        history.push("/");
                      }}
                    >
                      <img
                        src={homeIcon}
                        alt="home"
                        className={classes.homeIcon}
                      />
                      <span className={classes.homeText}>Back to home</span>
                    </div>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h4"
                      align="center"
                      style={{ fontWeight: "600" }}
                    >
                      Edit Profile
                    </Typography>
                  </Grid>
                  {console.log(state)}
                  {state ? (
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
                          className={classes.btn}
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
              </Paper>
            </Grid>
          </Grid>
        </div>
      </UserAppbar>
    </>
  );
};

export default Edit;
