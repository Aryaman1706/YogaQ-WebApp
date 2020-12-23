import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import LandingImg from "../../assets/landing.jpg";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    minHeight: "calc(100vh - 70px)",
    overflow: "hidden",
  },
}));

const Landing = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        <Grid item lg={6}>
          <h1>First Section</h1>
        </Grid>
        <Grid item lg={6}>
          <img src={LandingImg} alt="main-img" />
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
