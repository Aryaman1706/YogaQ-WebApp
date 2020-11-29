import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, makeStyles, Paper } from "@material-ui/core";
import Linkify from "react-linkify";

const useStyles = makeStyles((theme) => ({
  sent: {
    backgroundColor: "lightgreen",
    padding: "10px 15px 10px 15px",
    borderRadius: "20px",
    height: "100%",
    display: "flex",
    placeItems: "center",
  },
  recieve: {
    backgroundColor: "lightblue",
    padding: "10px 15px 10px 15px",
    borderRadius: "20px",
    height: "100%",
    display: "flex",
    placeItems: "center",
  },
  embed: {
    padding: "5px 5px 5px 5px",
    borderRadius: "20px",
    "&:hover": {
      backgroundColor: "lightblue",
    },
  },
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
        <Grid item>
          <a
            href={message.link}
            rel="noreferrer"
            target="_blank"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="stretch"
              className={classes.embed}
            >
              <Grid item xs={6}>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="stretch"
                  spacing={1}
                >
                  <Grid item>{message.urlEmbeds.title}</Grid>
                  <Grid item>{message.urlEmbeds.description}</Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={4}
                style={{ display: "flex", placeItems: "center" }}
              >
                <img
                  src={message.urlEmbeds.image}
                  style={{
                    display: "block",
                    height: "100px",
                    objectFit: "cover",
                    maxWidth: "100%",
                    margin: "auto",
                  }}
                  alt=""
                />
              </Grid>
            </Grid>
          </a>
        </Grid>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <Grid item xs={12} style={{ height: "fit-content" }}>
        <Grid
          container
          direction="row"
          alignItems="stretch"
          spacing={0}
          justify={
            message.sender.id.toString() === id.toString()
              ? "flex-end"
              : "flex-start"
          }
        >
          <Grid item xs={5}>
            <Paper
              elevation={0}
              className={
                message.sender.id.toString() === id.toString()
                  ? classes.sent
                  : classes.recieve
              }
            >
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="stretch"
                spacing={1}
              >
                {embeds()}
                <Grid item>
                  <Linkify>
                    <Typography variant="body1" align="left">
                      {message.text}
                    </Typography>
                  </Linkify>
                </Grid>
                <Grid item>
                  <Typography variant="caption" display="block" align="right">
                    {new Date(message.time).toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default MessageItem;
