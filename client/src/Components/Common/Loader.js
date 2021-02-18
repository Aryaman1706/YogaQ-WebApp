import React from "react";
import { Grid, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
  },
}));

const Loader = () => {
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.container}
      >
        <Grid item xs={3}>
          <CircularProgress />
        </Grid>
      </Grid>
    </>
  );
};

export default Loader;
