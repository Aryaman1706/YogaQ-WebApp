import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Swal from "sweetalert2";
import Loader from "../Common/Loader";
import { useSelector, useDispatch } from "react-redux";
import { admin as adminActions } from "../../redux/actions";
import { Formik } from "formik";
import { object, string } from "yup";

const useStyles = makeStyles((theme) => ({
  profile: {
    display: "block",
    height: "200px",
    width: "200px",
    objectFit: "cover",
    maxWidth: "100%",
    margin: "auto",
    borderRadius: "50%",
  },
  container: {
    display: "flex",
    justifyContent: "center",
  },
}));

const Edit = () => {
  const classes = useStyles();
  const { admin, error, message } = useSelector((state) => state.admin);
  const Yup = { object, string };
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(adminActions.clear());
    };
    // eslint-disable-next-line
  }, []);

  const Form = ({
    values: { username, email, welcomeMessage },
    errors,
    touched,
    handleChange,
    isValid,
    setFieldTouched,
  }) => {
    const [file, setFile] = useState(null);
    const [compLoading, setCompLoading] = useState(false);

    const errorHandler = () => {
      if (error && /^Validation Error*/i.test(error)) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error Occured.",
          text: `${error}`,
          showConfirmButton: true,
          timer: 1500,
        });
      }

      if (
        message &&
        /^Changes to profile changed successfully.*/i.test(message)
      ) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Success!",
          text: message,
          showConfirmButton: true,
          timer: 1500,
        });
      }

      dispatch(adminActions.clear());
    };

    useEffect(() => {
      if (error || message) errorHandler();
      // eslint-disable-next-line
    }, [error, message]);

    const changeHandler = (e) => {
      handleChange(e);
      setFieldTouched(e.target.name, true, false);
    };

    const fileHandler = (event) => {
      setFile(event.target.files[0]);
    };

    const submitHandler = (event) => {
      if (isValid) {
        setCompLoading(true);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Invalid Inputs.Try A.",
          text: "Enter valid data",
          showConfirmButton: true,
          timer: 1500,
        });
      }
    };

    const submit = async () => {
      const formData = new FormData();
      if (file) {
        formData.append("profilePicture", file);
      }
      formData.append("username", username);
      formData.append("email", email);
      formData.append("welcomeMessage", welcomeMessage);
      await dispatch(adminActions.editAdmin(formData));
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
        {compLoading ? (
          <Loader />
        ) : (
          <>
            <Grid item>
              <img
                src={admin.profilePicture}
                alt="profile"
                className={classes.profile}
              />
              <div className={classes.container}>
                <input
                  accept="image/*"
                  id="profilePicture"
                  type="file"
                  onChange={(event) => {
                    fileHandler(event);
                  }}
                />
              </div>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="UserName"
                name="username"
                variant="outlined"
                value={username}
                onChange={(event) => changeHandler(event)}
                helperText={touched.username ? errors.username : ""}
                error={touched.username && Boolean(errors.username)}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                variant="outlined"
                value={email}
                onChange={(event) => changeHandler(event)}
                helperText={touched.email ? errors.email : ""}
                error={touched.email && Boolean(errors.email)}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                multiline
                label="Welcome Message"
                id="welcomeMessage"
                variant="outlined"
                value={welcomeMessage}
                onChange={(event) => changeHandler(event)}
                helperText={touched.welcomeMessage ? errors.welcomeMessage : ""}
                error={touched.welcomeMessage && Boolean(errors.welcomeMessage)}
              />
            </Grid>
            <Grid item>
              <Button
                disabled={!isValid}
                fullWidth
                variant="contained"
                color="primary"
                onClick={(event) => submitHandler(event)}
              >
                Edit
              </Button>
            </Grid>
          </>
        )}
      </>
    );
  };

  const validationSchema = Yup.object({
    username: Yup.string().min(5).max(150).trim().required(),
    email: Yup.string().email().max(150).trim().required(),
    welcomeMessage: Yup.string().max(500).trim().required(),
  });

  return (
    <>
      <Grid container direction="row" justify="center" alignItems="stretch">
        <Grid item xs={8} lg={12}>
          <Grid
            container
            direction="column"
            justify="space-around"
            alignItems="stretch"
            spacing={2}
          >
            <Grid item>
              <Typography variant="h4" align="center">
                Edit Profile
              </Typography>
            </Grid>
            <Formik
              initialValues={{
                username: admin.username,
                email: admin.email,
                welcomeMessage: admin.welcomeMessage,
              }}
              validationSchema={validationSchema}
              validateOnMount={true}
              component={Form}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Edit;
