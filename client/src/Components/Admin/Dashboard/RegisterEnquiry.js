import React, { useState, useEffect } from "react";
import { Typography, Grid, TextField, Button } from "@material-ui/core";
import Loader from "../../Common/Loader";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { enquiry as enquiryAction } from "../../../redux/actions/index";
import Swal from "sweetalert2";
import AdminAppbar from "../../Common/Appbar";
import AdminLayout from "../../../layout/AdminLayout";
import { Formik } from "formik";
import { object, string } from "yup";

const RegisterEnquiry = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { enquiry, message, error } = useSelector((state) => state.enquiry);
  const Yup = { object, string };

  const clearErrors = () => {
    dispatch(enquiryAction.clearEnquiry());
    dispatch(enquiryAction.clear());
  };

  useEffect(() => {
    if (!enquiry) {
      history.push("/admin/enquiries");
    }
    return () => {
      clearErrors();
    };
    // eslint-disable-next-line
  }, []);

  const Form = ({
    values: { password },
    errors,
    touched,
    handleChange,
    isValid,
    setFieldTouched,
    resetForm,
  }) => {
    const [compLoading, setCompLoading] = useState(false);

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

      if (message && /^New Doctor registered successfully*/i.test(message)) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Success!",
          text: message,
          showConfirmButton: true,
          timer: 1500,
        }).then(() => {
          resetForm();
          history.push("/admin/enquiries");
        });
      }

      clearErrors();
    };

    useEffect(() => {
      if (error || message) errorHandler();
      // eslint-disable-next-line
    }, [error, message]);

    const changeHandler = (e) => {
      handleChange(e);
      setFieldTouched(e.target.name, true, false);
    };

    const submitHandler = (e) => {
      if (isValid) {
        Swal.fire({
          position: "center",
          icon: "question",
          title: "Are you sure?",
          html: `<h4>Email:- ${enquiry.email}</h4><h4>Password:- ${password}</h4>`,
          showConfirmButton: true,
          showDenyButton: true,
          backdrop: false,
        }).then((result) => {
          if (result.isConfirmed) {
            setCompLoading(true);
          }
        });
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
        enquiryAction.registerEnquiry({ enquiry: enquiry._id, password })
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
                variant="outlined"
                label="Email"
                value={enquiry.email}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                variant="outlined"
                label="Password"
                name="password"
                type="text"
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
    password: Yup.string().min(8).max(20).trim().required(),
  });

  return (
    <>
      <AdminAppbar type={"admin"}>
        <AdminLayout>
          {enquiry ? (
            <>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="stretch"
              >
                <Grid item xs={3} lg={4}></Grid>
                <Grid item xs={6} lg={4}>
                  <Grid
                    container
                    direction="column"
                    justify="space-around"
                    alignItems="stretch"
                    spacing={2}
                  >
                    <Grid item>
                      <Typography variant="h2" align="center">
                        Register Enquiry
                      </Typography>
                    </Grid>
                    <Formik
                      initialValues={{ password: "" }}
                      validationSchema={validationSchema}
                      validateOnMount={true}
                      component={Form}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={3} lg={4}></Grid>
              </Grid>
            </>
          ) : null}
        </AdminLayout>
      </AdminAppbar>
    </>
  );
};

export default RegisterEnquiry;
