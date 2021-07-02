import React from "react";
import { Grid, makeStyles, Button } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  parent: {
    placeItems: "center",
    height: "50px",
    backgroundColor: `${theme.palette.primary.main}`,
  },
  title: {
    paddingLeft: "15px",
  },
  btnContainer: {
    textAlign: "right",
  },
  btn: {
    paddingRight: "15px",
    placeItems: "center",
  },
}));

const SidebarBar = () => {
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="stretch"
        className={classes.parent}
      >
        <Grid item xs={3} className={classes.title}>
          YogaQ
        </Grid>
        <Grid item xs={9} className={classes.btnContainer}>
          <Button
            variant="text"
            className={classes.btn}
            endIcon={<ExpandMore />}
          >
            oooooooooo
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default SidebarBar;
