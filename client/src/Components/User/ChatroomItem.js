import React from "react";
import { Grid, Typography, Paper, Badge, makeStyles } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "5px 10px 5px 10px",
    placeItems: "center",
    display: "flex",
    justifyContent: "space-between",
  },
}));

const ChatroomItem = () => {
  const classes = useStyles();
  return (
    <>
      <Grid item>
        <Paper elevation={4} className={classes.paper}>
          <div>
            <Typography variant="h6" align="left">
              Username
            </Typography>
            <Typography variant="subtitle1" align="left">
              Admin
            </Typography>
          </div>
          <div>
            <Badge badgeContent={10} max={100} color="secondary">
              <MailIcon />
            </Badge>
          </div>
        </Paper>
      </Grid>
    </>
  );
};

export default ChatroomItem;
