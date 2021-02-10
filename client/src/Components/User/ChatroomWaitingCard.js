import React from "react";
import { Button, Grid, makeStyles, Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  card: {
    backgroundColor: (props) => props.color,
    color: "#245468",
    height: "310px",
    width: "240px",
    borderRadius: "10px",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    letterSpacing: "0px",
    lineHeight: "1rem",
  },
  para: {
    color: "#005368",
    fontSize: "1rem",
    flexGrow: "3",
  },
  btn: {
    backgroundColor: "#175c62",
    color: "#fff",
    borderRadius: "10px",
    padding: "0.5rem",
    alignSelf: "stretch",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      transform: "translate3d(0, -2px, 0)",
      backgroundColor: "#175c62",
    },
  },
}));

const ChatroomWaitingCard = ({
  title,
  description,
  btnText,
  link,
  ...props
}) => {
  const classes = useStyles(props);
  const history = useHistory();
  return (
    <>
      <Grid item xs={3}>
        <Paper elevation={0} className={classes.card}>
          <h2 className={classes.title}>{title}</h2>
          <p className={classes.para}>{description}</p>
          <Button
            variant="contained"
            className={classes.btn}
            onClick={() => {
              history.push(`${link}`);
            }}
            disableElevation
          >
            {btnText}
          </Button>
        </Paper>
      </Grid>
    </>
  );
};

export default ChatroomWaitingCard;
