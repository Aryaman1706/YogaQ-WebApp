import React from "react";
import { Avatar, makeStyles } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import ForumIcon from "@material-ui/icons/Forum";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import PersonIcon from "@material-ui/icons/Person";
import CallIcon from "@material-ui/icons/Call";

const useStyles = makeStyles((theme) => ({
  flexCol: {
    display: "flex",
    flexDirection: "column",
    margin: "1rem 0 0 1rem",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    padding: "10px 0 10px 10px",
    "&:hover": {
      backgroundColor: "#abe9cd",
      backgroundImage: "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
      color: "#fff",
      borderRadius: "6px",
      cursor: "pointer",
    },
  },
  active: {
    backgroundColor: "#abe9cd",
    backgroundImage: "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
  },
  text: {
    margin: "auto 0 auto 0.5rem",
    alignSelf: "center",
    fontWeight: "500",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const DoctorSideNav = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    location: { pathname },
  } = history;
  const doctor = useSelector((state) => state.doctor.doctor);
  return (
    <>
      <div className={classes.flexCol}>
        <div style={{ padding: "10px 0 10px 10px" }}>
          <Avatar
            alt=""
            src={doctor?.profilePicture}
            className={classes.large}
          />
        </div>
        <div
          style={{
            fontSize: "1.6rem",
            padding: "10px 0 10px 10px",
            fontWeight: "bold",
          }}
        >
          Hello {doctor?.username}
        </div>
        <div
          className={
            pathname === "/doctor/calls"
              ? `${classes.flexRow} ${classes.active}`
              : classes.flexRow
          }
          onClick={() => {
            history.push("/doctor/calls");
          }}
        >
          <span style={{ alignSelf: "flex-end" }}>
            <HomeIcon fontSize="large" />
          </span>
          <span className={classes.text}>Home</span>
        </div>

        <div
          className={
            pathname === "/doctor"
              ? `${classes.flexRow} ${classes.active}`
              : classes.flexRow
          }
          onClick={() => {
            history.push("/doctor");
          }}
        >
          <span>
            <ForumIcon fontSize="large" />
          </span>
          <span className={classes.text}>Chats</span>
        </div>
        <div
          className={classes.flexRow}
          onClick={() => {
            history.push("/doctor/calls");
          }}
        >
          <span>
            <CallIcon fontSize="large" />
          </span>
          <span className={classes.text}>Calls</span>
        </div>
        <div
          className={
            pathname === "/doctor/profile"
              ? `${classes.flexRow} ${classes.active}`
              : classes.flexRow
          }
          onClick={() => {
            history.push("/doctor/profile");
          }}
        >
          <span>
            <PersonIcon fontSize="large" />
          </span>
          <span className={classes.text}>Profile</span>
        </div>
      </div>
    </>
  );
};

export default DoctorSideNav;
