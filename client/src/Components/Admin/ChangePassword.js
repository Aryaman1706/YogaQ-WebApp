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
import Loader from "../Common/Loader";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { admin, doctor } from "../../redux/actions";
import { Formik } from "formik";
import { object as yupObject, string as yupString, ref as yupRef } from "yup";

const ChangePassword = ({ type }) => {
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => {
    if (type.trim() === "admin") return state.admin;
    else if (type.trim() === "doctor") return state.doctor;
  });

  useEffect(() => {
    return () => {
      if (type.trim() === "admin") {
        dispatch(admin.clear());
      } else if (type.trim() === "doctor") {
        dispatch(doctor.clear());
      }
    };
    // eslint-disable-next-line
  }, []);

  const Form = ({
    values: { oldPassword, newPassword, confirmPassword },
    errors,
    touched,
    handleChange,
    isValid,
    setFieldTouched,
  }) => {
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [compLoading, setCompLoading] = useState(false);

    const errorHandler = () => {
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
      if (/^Password changed successfully*/i.test(message)) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Success!",
          text: message,
          showConfirmButton: true,
          timer: 1500,
        });
      }

      if (type.trim() === "admin") {
        dispatch(admin.clear());
      } else if (type.trim() === "doctor") {
        dispatch(doctor.clear());
      }
    };

    useEffect(() => {
      if (error || message) errorHandler();
      // eslint-disable-next-line
    }, [error, message]);

    const toggleOld = (event) => {
      setShowOld((prev) => {
        return !prev;
      });
    };

    const toggleNew = (event) => {
      setShowNew((prev) => {
        return !prev;
      });
    };

    const changeHandler = (e) => {
      handleChange(e);
      setFieldTouched(e.target.name, true, false);
    };

    const submitHandler = (event) => {
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
      if (type.trim() === "admin") {
        await dispatch(
          admin.changePassword({ oldPassword, newPassword, confirmPassword })
        );
      } else if (type.trim() === "doctor") {
        await dispatch(
          doctor.changePassword({ oldPassword, newPassword, confirmPassword })
        );
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
                type={showOld ? "text" : "password"}
                label="Old Password"
                name="oldPassword"
                variant="outlined"
                value={oldPassword}
                onChange={(e) => changeHandler(e)}
                error={touched.oldPassword && Boolean(errors.oldPassword)}
                helperText={touched.oldPassword ? errors.oldPassword : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={(event) => toggleOld(event)}>
                        {showOld ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                type={showNew ? "text" : "password"}
                label="New Password"
                name="newPassword"
                variant="outlined"
                value={newPassword}
                onChange={(e) => changeHandler(e)}
                error={touched.newPassword && Boolean(errors.newPassword)}
                helperText={touched.newPassword ? errors.newPassword : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={(event) => toggleNew(event)}>
                        {showNew ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                type={showNew ? "text" : "password"}
                label="Confirm Password"
                name="confirmPassword"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => changeHandler(e)}
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                helperText={
                  touched.confirmPassword ? errors.confirmPassword : ""
                }
              />
            </Grid>
            <Grid item>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={submitHandler}
              >
                Change Password
              </Button>
            </Grid>
          </>
        )}
      </>
    );
  };

  const validationSchema = yupObject({
    oldPassword: yupString().min(8).max(20).trim().required(),
    newPassword: yupString().min(8).max(20).trim().required(),
    confirmPassword: yupString()
      .min(8)
      .max(20)
      .trim()
      .equals([yupRef("newPassword")], "Passwords do not match")
      .required(),
  });

  return (
    <>
      <Grid container direction="row" justify="center" alignItems="stretch">
        <Grid item xs={12} lg={12}>
          <Grid
            container
            direction="column"
            justify="space-around"
            alignItems="stretch"
            spacing={2}
          >
            <Grid item>
              <Typography variant="h4" align="center">
                Change Password
              </Typography>
            </Grid>
            <Formik
              initialValues={{
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
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

export default ChangePassword;
