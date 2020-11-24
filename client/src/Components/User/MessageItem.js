import React from "react";
import { Grid, Typography, makeStyles, Paper } from "@material-ui/core";
import Linkify from "react-linkify";

const useStyles = makeStyles((theme) => ({
  sent: {
    backgroundColor: "green",
  },
  recieve: {},
}));

const MessageItem = ({ message, id }) => {
  const classes = useStyles();

  const embeds = () => {
    if (
      message.link &&
      message.urlEmbeds.title &&
      message.urlEmbeds.description
    ) {
      return (
        <Grid container direction="row">
          <Grid item>
            <Grid container direction="column">
              <Grid item>Title</Grid>
              <Grid item>Description</Grid>
            </Grid>
          </Grid>
          <Grid item>Image</Grid>
        </Grid>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <Grid item>
        <p>hey</p>
        {/* <Grid
          container
          spacing={2}
          justify={
            message.sender.id.toString() === id.toString()
              ? "flex-end"
              : "flex-start"
          }
          style={{ width: "100%" }}
        >
          <Grid item>
            <Paper
              elevation={0}
              className={
                message.sender.id.toString() === id.toString()
                  ? classes.sent
                  : classes.recieve
              }
            >
              {embeds()}
              <Linkify>{message.text}</Linkify>
              <p>Hey</p>
              <p>Hey</p>
              <p>Hey</p>
              <Typography variant="caption" align="right">
                {new Date(message.time).toLocaleString()}
              </Typography>
            </Paper>
          </Grid>
        </Grid> */}
      </Grid>
    </>
  );
};

export default MessageItem;
