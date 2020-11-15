import React from "react";
import { Grid, TextField, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  div: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const DoctorProfile = ({ doctor, chatrooms }) => {
  let callCount = 0;
  chatrooms.forEach((chatroom) => {
    callCount = callCount + chatroom.call.length;
  });
  const classes = useStyles();
  return (
    <>
      <Grid item>
        <TextField
          fullWidth
          variant="outlined"
          label="User Name"
          value={doctor.username}
        />
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          variant="outlined"
          label="Email Address"
          value={doctor.email}
        />
      </Grid>
      <Grid item>
        <div className={classes.div}>
          <Typography variant="subtitle1">Number of Chat Rooms</Typography>
          <Typography variant="subtitle1" color="secondary">
            {chatrooms.length}
          </Typography>
        </div>
      </Grid>
      <Grid item>
        <div className={classes.div}>
          <Typography variant="subtitle1">Number of Calls</Typography>
          <Typography variant="subtitle1" color="secondary">
            {callCount}
          </Typography>
        </div>
      </Grid>
    </>
  );
};

export default DoctorProfile;
