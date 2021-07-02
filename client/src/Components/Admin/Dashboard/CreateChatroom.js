import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  FormHelperText,
} from "@material-ui/core";
import Loader from "../../Common/Loader";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { admin as adminActions } from "../../../redux/actions/index";
import AdminAppbar from "../../Common/Appbar";
import AdminLayout from "../../../layout/AdminLayout";
import { Formik } from "formik";
import { object, string } from "yup";

const CreateChatroom = () => {
  const { error, message } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const Yup = { object, string };

  useEffect(() => {
    return () => {
      dispatch(adminActions.clear());
    };
    // eslint-disable-next-line
  }, []);

  const Form = ({
    values: { user, partner, partnerModel },
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
      if (message && /^ChatRoom created succesfully*/i.test(message)) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Success",
          text: message,
          showConfirmButton: true,
          timer: 1500,
        }).then(() => {
          resetForm();
        });
      }
    };

    useEffect(() => {
      if (error || message) errorHandler();

      // eslint-disable-next-line
    }, [error, message]);

    const submitHandler = (e) => {
      if (isValid) {
        Swal.fire({
          position: "center",
          icon: "question",
          title: "Are You Sure?",
          showConfirmButton: true,
          showDenyButton: true,
          backdrop: true,
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
          text: "Invalid Inputs. Please Try Again.",
          showConfirmButton: true,
          timer: 1500,
        });
      }
    };

    const submit = async () => {
      await dispatch(
        adminActions.createChatroom({ user, partner, partnerModel })
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
              <Typography variant="h6" align="left">
                User Details
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                variant="outlined"
                label="User Email Id"
                name="user"
                value={user}
                onChange={(event) => changeHandler(event)}
                helperText={touched.user ? errors.user : ""}
                error={touched.user && Boolean(errors.user)}
              />
            </Grid>
            <Grid item>
              <Typography variant="h6" align="left">
                Partner Details
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                variant="outlined"
                label="Partner Email Id"
                name="partner"
                value={partner}
                onChange={(event) => changeHandler(event)}
                helperText={touched.partner ? errors.partner : ""}
                error={touched.partner && Boolean(errors.partner)}
              />
            </Grid>
            <Grid item>
              <FormControl
                variant="outlined"
                fullWidth
                error={touched.partnerModel && Boolean(errors.partnerModel)}
              >
                <InputLabel id="partnerModel">Role</InputLabel>
                <Select
                  labelId="partnerModel"
                  name="partnerModel"
                  value={partnerModel}
                  onChange={(event) => changeHandler(event)}
                >
                  <MenuItem value="Doctor">Doctor</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                </Select>
                {touched.partnerModel && errors.partnerModel ? (
                  <FormHelperText>{errors.partnerModel}</FormHelperText>
                ) : null}
              </FormControl>
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
    user: Yup.string().email().trim().required(),
    partner: Yup.string().email().trim().required(),
    partnerModel: Yup.string().oneOf(["Admin", "Doctor"]).trim().required(),
  });

  return (
    <>
      <AdminAppbar type={"admin"}>
        <AdminLayout>
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
                    Create Chatroom
                  </Typography>
                </Grid>
                <Formik
                  initialValues={{
                    user: "",
                    partner: "",
                    partnerModel: "Doctor",
                  }}
                  validationSchema={validationSchema}
                  validateOnMount={true}
                  component={Form}
                />
              </Grid>
            </Grid>
            <Grid item xs={2} lg={4}></Grid>
          </Grid>
        </AdminLayout>
      </AdminAppbar>
    </>
  );
};

export default CreateChatroom;
