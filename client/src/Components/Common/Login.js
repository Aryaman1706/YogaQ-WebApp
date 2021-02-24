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
import { Formik } from "formik";
import { object as yupObject, string as yupString } from "yup";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Loader from "./Loader";
import Swal from "sweetalert2";
import { admin, doctor } from "../../redux/actions";
import Appbar from "./Appbar";

const Login = ({ type }) => {
  const dispatch = useDispatch();
  const { error, isAuthenticated } = useSelector((state) => {
    if (type.trim() === "admin") return state.admin;
    else if (type.trim() === "doctor") return state.doctor;
  });
  const history = useHistory();

  useEffect(() => {
    return () => {
      if (type.trim() === "admin") {
        dispatch(admin.clear());
      } else if (type.trim() === "doctor") {
        dispatch(doctor.clear());
      }
    };
    //eslint-disable-next-line
  }, []);

  const Form = ({
    values: { email, password },
    errors,
    touched,
    handleChange,
    isValid,
    setFieldTouched,
  }) => {
    const [show, setShow] = useState(false);
    const [compLoading, setCompLoading] = useState(false);

    const passwordToggle = (event) => {
      setShow((prev) => {
        return !prev;
      });
    };

    const errorHandler = async () => {
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

      if (type.trim() === "admin") {
        await dispatch(admin.clear());
      } else if (type.trim() === "doctor") {
        await dispatch(doctor.clear());
      }
    };

    useEffect(() => {
      if (error) errorHandler();
      if (isAuthenticated) {
        if (type.trim() === "admin") {
          history.push("/admin");
        } else if (type.trim() === "doctor") {
          history.push("/doctor");
        }
      }
      // eslint-disable-next-line
    }, [error, isAuthenticated]);

    const changeHandler = (e) => {
      handleChange(e);
      setFieldTouched(e.target.name, true, false);
    };

    const submitHandler = () => {
      if (isValid) {
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

    const submit = async (values) => {
      const formData = {
        username: email,
        password: password,
      };
      if (type.trim() === "admin") {
        await dispatch(admin.loginAdmin(formData));
      } else if (type.trim() === "doctor") {
        await dispatch(doctor.loginDoctor(formData));
      }
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
                type={show ? "text" : "password"}
                label="Password"
                name="password"
                variant="outlined"
                value={password}
                onChange={(event) => changeHandler(event)}
                helperText={touched.password ? errors.password : ""}
                error={touched.password && Boolean(errors.password)}
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
                disabled={!isValid}
                fullWidth
                variant="contained"
                color="primary"
                onClick={submitHandler}
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
      </>
    );
  };

  const validationSchema = yupObject({
    email: yupString().email().trim().required(),
    password: yupString().min(8).max(20).trim().required(),
  });

  return (
    <>
      <Appbar type={type.trim()}>
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
                  Login as{" "}
                  {type.trim().charAt(0).toUpperCase() + type.trim().slice(1)}
                </Typography>
              </Grid>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                validateOnMount={true}
                component={Form}
              />
            </Grid>
          </Grid>
          <Grid item xs={2} lg={4}></Grid>
        </Grid>
      </Appbar>
    </>
  );
};

export default Login;
