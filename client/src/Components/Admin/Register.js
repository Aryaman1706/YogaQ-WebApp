import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import Loader from "../Common/Loader";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { admin } from "../../redux/actions/index";
import { Formik } from "formik";
import { object, string } from "yup";

const Register = () => {
  const { error, message } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const Yup = { object, string };

  useEffect(() => {
    return () => {
      dispatch(admin.clear());
    };
    // eslint-disable-next-line
  }, []);

  const Form = ({
    values: { username, email, password },
    errors,
    touched,
    handleChange,
    isValid,
    setFieldTouched,
    resetForm,
  }) => {
    const [compLoading, setCompLoading] = useState(false);

    const changeHandler = (e) => {
      handleChange(e);
      setFieldTouched(e.target.name, true, false);
    };

    const errorHandler = () => {
      if (error && /^Validation Error*/i.test(error)) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error Occured.",
          text: error,
          showConfirmButton: true,
          timer: 1500,
        });
      }
      if (message && /^New admin registered successfully*/i.test(message)) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Success!",
          text: message,
          showConfirmButton: true,
          timer: 1500,
        }).then(() => {
          resetForm();
        });
      }

      dispatch(admin.clear());
    };

    useEffect(() => {
      if (error || message) errorHandler();
      // eslint-disable-next-line
    }, [error, message]);

    const submitHandler = (event) => {
      if (isValid) {
        setCompLoading(true);
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

    const submit = async () => {
      await dispatch(
        admin.register({
          username,
          email,
          password,
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
        {compLoading ? (
          <Loader />
        ) : (
          <>
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
                label="Password"
                name="password"
                variant="outlined"
                value={password}
                onChange={(event) => changeHandler(event)}
                helperText={touched.password ? errors.password : ""}
                error={touched.password && Boolean(errors.password)}
              />
            </Grid>
            <Grid item>
              <Button
                disabled={!isValid}
                fullWidth
                variant="contained"
                color="primary"
                style={{
                  backgroundColor: "#0FC1A7",
                  height: "50px",
                  backgroundImage:
                    "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
                }}
                onClick={(event) => submitHandler(event)}
              >
                Create
              </Button>
            </Grid>
          </>
        )}
      </>
    );
  };

  const validationSchema = Yup.object({
    username: Yup.string().min(5).max(40).trim().required(),
    email: Yup.string().email().trim().required(),
    password: Yup.string().min(8).max(20).trim().required(),
  });

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
            <Formik
              initialValues={{ username: "", email: "", password: "" }}
              validationSchema={validationSchema}
              validateOnMount={true}
              component={Form}
            />
          </Grid>
        </Grid>
        <Grid item xs={2} lg={4}></Grid>
      </Grid>
    </>
  );
};

export default Register;
