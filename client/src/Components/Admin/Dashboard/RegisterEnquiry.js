import React, { useState, useEffect } from "react";
import { Typography, Grid, TextField, Button } from "@material-ui/core";
import Loader from "../../Loader";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { enquiry as enquiryAction } from "../../../redux/actions/index";
import Swal from "sweetalert2";

const RegisterEnquiry = () => {
  const [password, setPassword] = useState("");
  const [compLoading, setCompLoading] = useState(false);
  const { enquiry, message, error } = useSelector((state) => state.enquiry);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!enquiry) {
      history.push("/admin/enquiries");
    }
    return () => {
      dispatch(enquiryAction.clearEnquiry());
      dispatch(enquiryAction.clear());
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (/Validation Error*/i.test(error)) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error Occured.",
        text: error,
        showConfirmButton: true,
        timer: 1500,
      });
    }

    if (/New Doctor registered successfully*/i.test(message)) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success!",
        text: message,
        showConfirmButton: true,
        timer: 1500,
      }).then(() => {
        history.push("/admin/enquiries");
      });
    }
    // eslint-disable-next-line
  }, [error, message]);

  const changeHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = (e) => {
    Swal.fire({
      position: "center",
      icon: "question",
      title: "Are you sure?",
      html: `<h4>Email:- ${enquiry.email}</h4><h4>Password:- ${password}</h4>`,
      showConfirmButton: true,
      showDenyButton: true,
      backdrop: false,
    }).then((result) => {
      if (!result.isDenied) {
        setCompLoading(true);
      }
    });
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
      {enquiry ? (
        <>
          <Grid container direction="row" justify="center" alignItems="stretch">
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
                        id="password"
                        type="text"
                        value={password}
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
                        Create
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
            <Grid item xs={3} lg={4}></Grid>
          </Grid>
        </>
      ) : null}
    </>
  );
};

export default RegisterEnquiry;
