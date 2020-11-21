import React, { useState, useEffect, Fragment } from "react";
import DoctorProfile from "./DoctorProfile";
import DoctorProfileComplete from "./DoctorProfileComplete";
import {
  Typography,
  Toolbar,
  Grid,
  Button,
  makeStyles,
  Paper,
  IconButton,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { doctor as doctorActions } from "../../../redux/actions/index";

const useStyles = makeStyles((theme) => ({
  div: {
    display: "flex",
    justifyContent: "flex-end",
  },
  div2: {
    padding: "5px 10px 5px 10px",
    display: "flex",
    justifyContent: "space-between",
  },
}));

const ViewDoctor = () => {
  const { id } = useParams();
  const history = useHistory();
  const { loading, selectDoctor, error } = useSelector((state) => state.doctor);
  const dispatch = useDispatch();
  const [full, setFull] = useState(false);

  useEffect(() => {
    const start = async () => {
      await dispatch(doctorActions.setLoading(true));
      await dispatch(doctorActions.selectDoctor(id));
    };
    if (!id) {
      history.push("/admin/doctors");
    } else {
      start();
    }

    return () => {
      dispatch(doctorActions.clearSelected());
      dispatch(doctorActions.clear());
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (/Doctor not found*/i.test(error)) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error Occured.",
        text: error,
        showConfirmButton: true,
        timer: 1500,
      }).then(() => {
        history.push("/admin/doctors");
      });
    }
    // eslint-disable-next-line
  }, [error]);

  const toggle = (e) => {
    setFull((prev) => {
      return !prev;
    });
  };

  const classes = useStyles();
  return (
    <>
      <Typography variant="h2" align="center">
        Doctor
      </Typography>
      <Toolbar></Toolbar>
      {!loading && selectDoctor ? (
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
                  <div className={classes.div}>
                    <Button
                      variant="contained"
                      onClick={(event) => toggle(event)}
                    >
                      Toggle View
                    </Button>
                  </div>
                </Grid>
                {full ? (
                  <DoctorProfileComplete doctor={selectDoctor.doctor} />
                ) : (
                  <DoctorProfile
                    doctor={selectDoctor.doctor}
                    chatrooms={selectDoctor.chatrooms}
                  />
                )}
              </Grid>
              <Toolbar></Toolbar>
              <Typography variant="h3" align="center">
                Chat Rooms
              </Typography>
              <Grid
                container
                direction="column"
                justify="space-around"
                alignItems="stretch"
                spacing={2}
              >
                {selectDoctor.chatrooms.map((obj, index) => {
                  return (
                    <Fragment key={index}>
                      <Grid item>
                        <Paper>
                          <div className={classes.div2}>
                            <div>
                              <Typography variant="subtitle1">
                                Username:- {obj.user.id.username}
                              </Typography>
                              <Typography variant="subtitle1">
                                Email Address:- {obj.user.id.email}
                              </Typography>
                            </div>
                            <IconButton>
                              <VisibilityIcon />
                            </IconButton>
                          </div>
                        </Paper>
                      </Grid>
                    </Fragment>
                  );
                })}
              </Grid>
            </Grid>
            <Grid item xs={1} lg={3}></Grid>
          </Grid>
        </>
      ) : null}
    </>
  );
};

export default ViewDoctor;
