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
  FormHelperText,
} from "@material-ui/core";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { user as userActions } from "../../redux/actions/index";
import Loader from "../Common/Loader";
import background from "../../assets/background.svg";
import homeIcon from "../../assets/home.svg";
import { useHistory } from "react-router-dom";
import UserAppbar from "../Common/Appbar";
import { Formik } from "formik";
import { object, string, number } from "yup";

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
  const classes = useStyles();
  const { error, user, message } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const Yup = { object, string, number };

  useEffect(() => {
    return () => {
      dispatch(userActions.clear());
    };
    // eslint-disable-next-line
  }, []);

  const Form = ({
    values: { email, username, phoneNumber, age, gender, country },
    errors,
    touched,
    handleChange,
    isValid,
    setFieldTouched,
  }) => {
    const [compLoading, setCompLoading] = useState(false);

    useEffect(() => {
      if (error) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error!",
          text: `${error}`,
          showConfirmButton: true,
          timer: 1500,
          willClose: () => {
            dispatch(userActions.clear());
          },
        });
      }
      if (message) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Success!",
          text: `${message}`,
          showConfirmButton: true,
          timer: 1500,
          willClose: () => {
            dispatch(userActions.clear());
          },
        });
      }
      // eslint-disable-next-line
    }, [error, message]);

    const changeHandler = (e) => {
      handleChange(e);
      setFieldTouched(e.target.name, true, false);
    };

    const submitHandler = (e) => {
      if (isValid) {
        setCompLoading(true);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error Occured.",
          text: "Invalid Inputs. Try Again.",
          showConfirmButton: true,
          timer: 1500,
        });
      }
    };

    const submit = async () => {
      await dispatch(
        userActions.editProfile({ username, phoneNumber, age, gender, country })
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
        <Grid item>
          <TextField
            fullWidth
            variant="outlined"
            label="Email Address"
            value={email}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            variant="outlined"
            label="User Name"
            name="username"
            value={username}
            onChange={(event) => changeHandler(event)}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username ? errors.username : ""}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            variant="outlined"
            label="Phone Number"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(event) => changeHandler(event)}
            error={touched.phoneNumber && Boolean(errors.phoneNumber)}
            helperText={touched.phoneNumber ? errors.phoneNumber : ""}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            type="number"
            variant="outlined"
            label="Age"
            name="age"
            value={age}
            onChange={(event) => changeHandler(event)}
            error={touched.age && Boolean(errors.age)}
            helperText={touched.age ? errors.age : ""}
          />
        </Grid>
        <Grid item>
          <FormControl
            variant="outlined"
            fullWidth
            error={touched.gender && Boolean(errors.gender)}
          >
            <InputLabel id="genderSelect">Gender</InputLabel>
            <Select
              labelId="genderSelect"
              name="gender"
              label="Gender"
              value={gender}
              onChange={(event) => changeHandler(event)}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
            {touched.gender && errors.gender ? (
              <FormHelperText>{errors.gender}</FormHelperText>
            ) : null}
          </FormControl>
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            variant="outlined"
            label="Country"
            name="country"
            value={country}
            onChange={(event) => changeHandler(event)}
            error={touched.country && Boolean(errors.country)}
            helperText={touched.country ? errors.country : ""}
          />
        </Grid>
        <Grid item>
          <Button
            disabled={!isValid}
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
    );
  };

  const validationSchema = Yup.object({
    username: Yup.string().min(3).max(150).trim().required(),
    phoneNumber: Yup.string().trim().required(),
    age: Yup.number().integer().positive().required(),
    gender: Yup.string()
      .lowercase()
      .trim()
      .oneOf(["male", "female", "other"])
      .required(),
    country: Yup.string().max(150).trim().required(),
  });

  return (
    <>
      <UserAppbar type={"user"}>
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
                  {user ? (
                    <Formik
                      validationSchema={validationSchema}
                      validateOnMount={true}
                      initialValues={user}
                      component={Form}
                    />
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
