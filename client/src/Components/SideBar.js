import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import SidebarBar from "../Components/Appbar/SidebarBar";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    border: "1px solid rgb(104, 118, 141)",
    borderTop: "0px",
    borderLeft: "0px",
    minHeight: "100vh",
    height: "100vh",
    position: "sticky",
    top: "0",
  },
}));

const SideBar = () => {
  const classes = useStyles();

  return (
    <Grid item xs={2} className={classes.sidebar}>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
      >
        <Grid item>
          <SidebarBar />
        </Grid>
        <Grid item>
          <p>SideBar</p>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SideBar;
