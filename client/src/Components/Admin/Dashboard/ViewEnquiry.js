import React, { Fragment, useEffect } from "react";
import {
  Grid,
  Toolbar,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Button,
  makeStyles,
} from "@material-ui/core";
import { Description } from "@material-ui/icons";
import { useParams, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { enquiry as enquiryActions } from "../../../redux/actions/index";

const useStyles = makeStyles((theme) => ({
  div: {
    display: "flex",
    justifyContent: "space-around",
  },
}));

const ViewEnquiry = () => {
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, enquiry, error, message } = useSelector(
    (state) => state.enquiry
  );

  useEffect(() => {
    const start = async () => {
      await dispatch(enquiryActions.setLoading(true));
      await dispatch(enquiryActions.selectEnquiry(id));
      await dispatch(enquiryActions.setLoading(false));
    };
    if (!id) {
      history.push("/admin/enquiries");
    } else {
      start();
    }
    return () => {
      dispatch(enquiryActions.clear());
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (/Enquiry not found*/i.test(error)) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error Occured.",
        text: error,
        showConfirmButton: true,
        timer: 1500,
      }).then(() => {
        history.push("/admin/enquiries");
      });
    }

    if (/Enquiry deleted successfully*/i.test(message)) {
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

  const deleteEnquiry = (e) => {
    Swal.fire({
      position: "center",
      icon: "question",
      title: "Are you sure?",
      text: "Delete Enquiry?",
      showConfirmButton: true,
      showDenyButton: true,
      backdrop: false,
    }).then((result) => {
      if (!result.isDenied) {
        dispatch(enquiryActions.deleteEnquiry(id));
        history.push("/admin/enquiries");
      }
    });
  };

  const acceptEnquiry = (e) => {
    history.push("/admin/accept/enquiry");
  };
  return (
    <>
      <Typography variant="h2" align="center">
        Enquiry
      </Typography>
      <Toolbar></Toolbar>
      {!loading && enquiry ? (
        <>
          <Grid container direction="row" justify="center" alignItems="stretch">
            <Grid item xs={1} lg={3}></Grid>
            <Grid item xs={10} lg={6}>
              <Grid
                container
                direction="column"
                justify="space-around"
                alignItems="stretch"
                spacing={2}
              >
                <Grid item>
                  <Typography variant="h5" align="center">
                    Personal Details
                  </Typography>
                </Grid>
                {/* Personal Details */}
                <Grid item>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="User Name"
                    value={enquiry.username}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Phone Number"
                    value={enquiry.phoneNumber}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Age"
                    type="number"
                    value={enquiry.age}
                  />
                </Grid>
                <Grid item>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="genderSelect">Gender</InputLabel>
                    <Select
                      labelId="genderSelect"
                      label="Gender"
                      value={enquiry.gender}
                    >
                      <MenuItem value="select">Select</MenuItem>
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
                    value={enquiry.country}
                  />
                </Grid>
                <Grid item>
                  {/* Languages */}
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="stretch"
                    spacing={2}
                  >
                    {enquiry.languages.map((item, index) => (
                      <Fragment key={index}>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            label="Language"
                            value={item}
                          />
                        </Grid>
                      </Fragment>
                    ))}
                  </Grid>
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    multiline
                    variant="outlined"
                    label="Description"
                    value={enquiry.description}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Email Address"
                    type="email"
                    value={enquiry.email}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h5" align="center">
                    Qualificational Details
                  </Typography>
                </Grid>
                {/* Qualificational Details */}
                <Grid item>
                  <Typography variant="subtitle1" align="left">
                    Educational Qualification
                  </Typography>
                  {/* Educational Qualification */}
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="stretch"
                    spacing={2}
                  >
                    {enquiry.qualificational.educationalQualification.map(
                      (item, index) => (
                        <Fragment key={index}>
                          <Grid item xs={4}>
                            <TextField
                              fullWidth
                              variant="outlined"
                              value={item}
                            />
                          </Grid>
                        </Fragment>
                      )
                    )}
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" align="left">
                    Documents
                  </Typography>
                  {/* Documents */}
                  {enquiry.qualificational.docs.map((obj, index) => (
                    <Fragment key={index}>
                      <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="stretch"
                        spacing={2}
                      >
                        <Grid item xs={5}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            label="Name"
                            value={obj.name}
                          />
                        </Grid>
                        <Grid item xs={5}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            label="Institute"
                            value={obj.institute}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <IconButton
                            href={obj.doc}
                            target="_blank"
                            rel="noopener"
                          >
                            <Description />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Fragment>
                  ))}
                </Grid>
                <Grid item>
                  <Typography variant="h5" align="center">
                    Professional Details
                  </Typography>
                </Grid>
                <Grid item>
                  {/* Professional Details */}
                  {enquiry.professional.map((obj, index) => (
                    <Fragment key={index}>
                      <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="stretch"
                        spacing={2}
                      >
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            label="Place"
                            value={obj.place}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            label="Clients"
                            value={obj.clients}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            label="Years"
                            value={obj.noOfYears}
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <IconButton
                            href={obj.doc}
                            target="_blank"
                            rel="noopener"
                          >
                            <Description />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Fragment>
                  ))}
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    multiline
                    variant="outlined"
                    label="Expertise"
                    value={enquiry.expertise}
                  />
                </Grid>
                <Grid item>
                  <Toolbar></Toolbar>
                </Grid>
                <Grid item>
                  <div className={classes.div}>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={(event) => acceptEnquiry(event)}
                    >
                      Accept
                    </Button>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={(event) => deleteEnquiry(event)}
                    >
                      Delete
                    </Button>
                  </div>
                </Grid>
                <Grid item>
                  <Toolbar></Toolbar>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1} lg={3}></Grid>
          </Grid>
        </>
      ) : null}
    </>
  );
};

export default ViewEnquiry;
