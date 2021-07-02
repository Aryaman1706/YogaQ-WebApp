import React from "react";
import { Grid, Typography, makeStyles, Paper } from "@material-ui/core";
import Linkify from "react-linkify";
import { format } from "date-fns";

const useStyles = makeStyles((theme) => ({
  sent: {
    backgroundColor: "#DBF6C6",
    padding: "10px 15px 10px 15px",
    borderRadius: "20px",
    height: "100%",
    display: "flex",
    width: "fit-content",
    maxWidth: "60%",
    [theme.breakpoints.only("xs")]: {
      maxWidth: "90%",
    },
  },
  recieve: {
    backgroundColor: "#fff",
    border: "2px solid #f0f0f0",
    padding: "10px 15px 10px 15px",
    borderRadius: "20px",
    height: "100%",
    display: "flex",
    width: "fit-content",
    maxWidth: "60%",
    [theme.breakpoints.only("xs")]: {
      maxWidth: "90%",
    },
  },
  embed: {
    padding: "5px 5px 5px 5px",
    borderRadius: "20px",
    maxWidth: "fit-content",
    "&:hover": {
      backgroundColor: "lightblue",
    },
    [theme.breakpoints.only("xs")]: {
      padding: 0,
    },
  },
  embedImg: {
    display: "block",
    height: "100px",
    objectFit: "cover",
    maxWidth: "100%",
    margin: "auto",
    [theme.breakpoints.only("xs")]: {
      height: "80px",
      margin: 0,
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
        <Grid item xs={12}>
          <a
            href={message.link}
            rel="noreferrer"
            target="_blank"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="stretch"
              className={classes.embed}
            >
              <Grid item xs={6} lg={7}>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="stretch"
                  spacing={1}
                >
                  <Grid
                    item
                    xs={12}
                    lg={12}
                    style={{ overflowWrap: "break-word" }}
                  >
                    {message.urlEmbeds.title}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    lg={12}
                    style={{ overflowWrap: "break-word" }}
                  >
                    {message.urlEmbeds.description}
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={6}
                lg={4}
                style={{ display: "flex", placeItems: "center" }}
              >
                <img
                  src={message.urlEmbeds.image}
                  className={classes.embedImg}
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
        <Grid container direction="row" alignItems="stretch" spacing={0}>
          <Grid
            container
            item
            xs={12}
            justify={
              message.sender.id.toString() === id.toString()
                ? "flex-end"
                : "flex-start"
            }
          >
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
                <Grid item lg={12} style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "0.7rem" }}>
                    {format(new Date(message.time), "p")}
                  </span>
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
