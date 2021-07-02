import React from "react";
import { Grid, makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  parent: {
    top: "0",
    backgroundColor: `${theme.palette.primary.main}`,
    position: "sticky",
  },
  appbar: {
    height: "50px",
    placeItems: "center",
  },
  title: {
    paddingLeft: "15px",
  },
  btnContainer: {
    textAlign: "right",
    "&>button": {
      paddingRight: "15px",
    },
  },
}));

const ChatAreaBar = () => {
  const classes = useStyles();
  return (
    <>
      <Grid item className={classes.parent}>
        <Grid
          container
          justify="center"
          alignItems="flex-start"
          className={classes.appbar}
        >
          <Grid item xs={11} className={classes.title}>
            Admin Name
          </Grid>
          <Grid item xs={1} className={classes.btnContainer}>
            <Button>1</Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ChatAreaBar;
