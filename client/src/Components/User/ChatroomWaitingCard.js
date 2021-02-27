import React from "react";
import { Button, Grid, makeStyles, Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: (props) => props.color,
    color: "#245468",
    height: "420px",
    width: "340px",
    borderRadius: "10px",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.only("lg")]: {
      height: "360px",
      width: "290px",
      
    }
  },
  title: {
    fontSize: "26px",
    fontWeight: "700",
    letterSpacing: "0px",
    lineHeight: "1.4rem",
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
      <Grid item lg={4} xl={3}>
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
