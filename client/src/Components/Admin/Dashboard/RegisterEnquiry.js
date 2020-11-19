import React, { useState, useEffect } from "react";
import { Typography, Grid, TextField, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { enquiry as enquiryAction } from "../../../redux/actions/index";
import Swal from "sweetalert2";
import axios from "../../../utils/axios";

const RegisterEnquiry = () => {
  const [password, setPassword] = useState("");
  const { enquiry } = useSelector((state) => state.enquiry);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(enquiryAction.clearEnquiry());
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!enquiry) {
      history.push("/admin/enquiries");
    }
    // eslint-disable-next-line
  }, [enquiry]);

  const changeHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = (e) => {
    Swal.fire({
      position: "center",
      icon: "question",
      title: "Are you sure?",
      text: `Email\n  ${enquiry.email}\nPassword\n  ${password}`,
      showConfirmButton: true,
      backdrop: false,
    }).then(() => {
      axios
        .post("/doctor/register", { enquiry: enquiry.id, password })
        .then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Success!",
            text: "New Doctor registered.",
            showConfirmButton: true,
            timer: 1500,
          }).then(() => {
            history.push("/admin/enquiries");
          });
        });
    });
  };

  return (
    <>
      <Typography variant="h2" align="center">
        Register Enquiry
      </Typography>
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
                    color="primary"
                    onClick={(event) => submitHandler(event)}
                  >
                    Create
                  </Button>
                </Grid>
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
