import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import ChatroomWaitingCard from "../User/ChatroomWaitingCard";
import profileLogo from "../../assets/user-1.svg";
import membershipLogo from "../../assets/membership.svg";
import contactLogo from "../../assets/headphone.svg";
import doctorLogo from "../../assets/doctor.svg";
import doctorLogo2 from "../../assets/doctor2.svg";
import userLogo from "../../assets/user3.svg";
import phoneLogo from "../../assets/phone-call2.svg";

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
          {type.trim() === "user" && (
            <h1>
              Start your journey towards healthier you by chatting with one of
              our therapists
            </h1>
          )}
          {type.trim() === "doctor" && (
            <h1>Get Started by chatting with one of your assigned patients</h1>
          )}
          {type.trim() === "admin" && (
            <h1>Get Started by chatting with one of your assigned partner</h1>
          )}
        </Grid>
        {type.trim() === "user" && (
          <>
            <ChatroomWaitingCard
              title={"Profile"}
              description={"Customise your profile"}
              btnText={"Edit Profile"}
              link={"/edit"}
              color={"#E1F0EE"}
              logo={profileLogo}
            />
            <ChatroomWaitingCard
              title={"Membership"}
              description={"Upgrade Membership for a better experience"}
              btnText={"Upgrade Membership"}
              link={"/edit"}
              color={"#F1DDDD"}
              logo={membershipLogo}
            />
            <ChatroomWaitingCard
              title={"Contact Us"}
              description={"Reach out to us for any queries"}
              btnText={"Contact"}
              link={"/edit"}
              color={"#C5CBF1"}
              logo={contactLogo}
            />
          </>
        )}
        {type.trim() === "admin" && (
          <>
            <ChatroomWaitingCard
              title={"Therapist Applications"}
              description={"Detailed Analysis of all therapist applications"}
              btnText={"Proceed"}
              link={"/admin/enquiries"}
              color={"#E1F0EE"}
              logo={doctorLogo}
            />
            <ChatroomWaitingCard
              title={"Doctors"}
              description={"Detailed Analysis of all the doctors"}
              btnText={"Proceed"}
              link={"/admin/doctors"}
              color={"#F1DDDD"}
              logo={doctorLogo2}
            />
            <ChatroomWaitingCard
              title={"Profile"}
              description={"Customise your profile"}
              btnText={"Edit Profile"}
              link={"/admin/profile"}
              color={"#C5CBF1"}
              logo={userLogo}
            />
          </>
        )}
        {type.trim() === "doctor" && (
          <>
            <ChatroomWaitingCard
              title={"Calls"}
              description={"Calls"}
              btnText={"Proceed"}
              link={"/doctor/calls"}
              color={"#E1F0EE"}
              logo={phoneLogo}
            />
          </>
        )}
      </Grid>
    </>
  );
};

export default ChatroomWaiting;
