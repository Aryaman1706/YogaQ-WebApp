import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import BasicInfo from "./BasicInfo";
import QualificationalInfo from "./QualificationalInfo";

const NewEnquiry = () => {
  return (
    <>
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
                Be a Partner
              </Typography>
            </Grid>
            <BasicInfo />
            <QualificationalInfo />
            <Grid item>
              <Button fullWidth variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} lg={4}></Grid>
      </Grid>
    </>
  );
};

export default NewEnquiry;
