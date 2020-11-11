import React, { Fragment } from "react";
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
} from "@material-ui/core";
import { Description } from "@material-ui/icons";

const DoctorProfileComplete = ({ doctor }) => {
  return (
    <>
      <Grid item>
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
              value={doctor.username}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              variant="outlined"
              label="Phone Number"
              value={doctor.phoneNumber}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              variant="outlined"
              label="Age"
              type="number"
              value={doctor.age}
            />
          </Grid>
          <Grid item>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="genderSelect">Gender</InputLabel>
              <Select
                labelId="genderSelect"
                label="Gender"
                value={doctor.gender}
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
              value={doctor.country}
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
              {doctor.languages.map((item, index) => (
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
              value={doctor.description}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              variant="outlined"
              label="Email Address"
              type="email"
              value={doctor.email}
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
              {doctor.qualificational.educationalQualification.map(
                (item, index) => (
                  <Fragment key={index}>
                    <Grid item xs={4}>
                      <TextField fullWidth variant="outlined" value={item} />
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
            {doctor.qualificational.docs.map((obj, index) => (
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
                    <IconButton href={obj.doc} target="_blank" rel="noopener">
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
            {doctor.professional.map((obj, index) => (
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
                    <IconButton href={obj.doc} target="_blank" rel="noopener">
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
              value={doctor.expertise}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              multiline
              variant="outlined"
              label="Welcome Message"
              value={doctor.welcomeMessage}
            />
          </Grid>
          <Grid item>
            <Toolbar></Toolbar>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DoctorProfileComplete;
