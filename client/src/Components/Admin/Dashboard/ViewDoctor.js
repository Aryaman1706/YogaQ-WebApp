import React, { useState, useEffect } from "react";
import DoctorProfile from "./DoctorProfile";
import DoctorProfileComplete from "./DoctorProfileComplete";
import {
  Typography,
  Toolbar,
  Grid,
  Button,
  makeStyles,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import axios from "../../../utils/axios";

const useStyles = makeStyles((theme) => ({
  div: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const ViewDoctor = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [chatrooms, setChatrooms] = useState(null);
  const [full, setFull] = useState(false);

  useEffect(() => {
    axios.get(`/doctor/view/${id}`).then((res) => {
      setDoctor(res.data.body.doctor);
      setChatrooms(res.data.body.chatrooms);
    });
  }, [id]);

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
      {doctor && chatrooms ? (
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
                  <DoctorProfileComplete doctor={doctor} />
                ) : (
                  <DoctorProfile doctor={doctor} chatrooms={chatrooms} />
                )}
              </Grid>
            </Grid>
            <Grid item xs={1} lg={3}></Grid>
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
            {chatrooms.map((obj, index) => {
              return (
                <>
                  <Grid item>
                    <Typography variant="h6">User :-</Typography>
                    <Typography variant="subtitle1">
                      {obj.user.username}
                    </Typography>
                    <Typography variant="subtitle1">
                      {obj.user.email}
                    </Typography>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </>
      ) : null}
    </>
  );
};

export default ViewDoctor;
