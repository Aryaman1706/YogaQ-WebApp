import React from "react";
import { Grid, TextField } from "@material-ui/core";

const DoctorProfile = ({ doctor }) => {
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
    </>
  );
};

export default DoctorProfile;
