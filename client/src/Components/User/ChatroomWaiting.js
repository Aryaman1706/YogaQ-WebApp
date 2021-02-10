import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import ChatroomWaitingCard from "./ChatroomWaitingCard";

const useStyles = makeStyles(() => ({
  textContainer: {
    textAlign: "center",
  },
  mainContainer: {
    padding: "0 4rem 0 4rem",
    justifyContent: "space-evenly",
  },
}));

const ChatroomWaiting = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={2} className={classes.mainContainer}>
        <Grid item xs={12} className={classes.textContainer}>
          <h1>No Open Chatroom</h1>
        </Grid>
        <ChatroomWaitingCard
          title={"Profile"}
          description={"Customise your profile"}
          btnText={"Edit Profile"}
          link={"/edit"}
          color={"#E1F0EE"}
        />
        <ChatroomWaitingCard
          title={"Membership"}
          description={"Upgrade Membership for a better experience"}
          btnText={"Upgrade Membership"}
          link={"/edit"}
          color={"#F1DDDD"}
        />
        <ChatroomWaitingCard
          title={"Contact Us"}
          description={"Reach out to us for any queries"}
          btnText={"Contact"}
          link={"/edit"}
          color={"#C5CBF1"}
        />
      </Grid>
    </>
  );
};

export default ChatroomWaiting;
