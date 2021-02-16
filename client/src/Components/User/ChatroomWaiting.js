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

const ChatroomWaiting = ({ type }) => {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={2} className={classes.mainContainer}>
        <Grid item xs={12} className={classes.textContainer}>
          <h1>
            Start your journey towards healthier you by chatting with one of our
            therapists
          </h1>
        </Grid>
        {type === "user" && (
          <>
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
          </>
        )}
        {type === "admin" && (
          <>
            <ChatroomWaitingCard
              title={"Enquires"}
              description={"Detailed Analysis of enquiries"}
              btnText={"Proceed"}
              link={"/admin/enquiries"}
              color={"#E1F0EE"}
            />
            <ChatroomWaitingCard
              title={"Doctors"}
              description={"Detailed Analysis of all the doctors"}
              btnText={"Proceed"}
              link={"/admin/doctors"}
              color={"#F1DDDD"}
            />
            <ChatroomWaitingCard
              title={"Profile"}
              description={"Customise your profile"}
              btnText={"Edit Profile"}
              link={"/admin/profile"}
              color={"#C5CBF1"}
            />
          </>
        )}
      </Grid>
    </>
  );
};

export default ChatroomWaiting;
