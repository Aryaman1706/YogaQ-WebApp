import React from "react";
import { Avatar, makeStyles } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import ForumIcon from "@material-ui/icons/Forum";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import CreateIcon from "@material-ui/icons/Create";
import PersonIcon from "@material-ui/icons/Person";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

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
      backgroundColor: "#fff",
      borderRadius: "10px",
      cursor: "pointer",
      boxShadow: " 0px 3px 5px 0px rgba(76, 34, 50, 0.52)",
    },
    // justifyContent: "space-evenly",
    // margin: "1rem 0 0 0",
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

const SideNav = () => {
  const classes = useStyles();
  const history = useHistory();
  const admin = useSelector((state) => state.admin.admin);
  return (
    <>
      <div className={classes.flexCol}>
        <div style={{ padding: "10px 0 10px 10px" }}>
          <Avatar
            alt=""
            src={admin?.profilePicture}
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
          Hello {admin?.username}
        </div>
        <div
          className={classes.flexRow}
          onClick={() => {
            history.push("/admin/enquiries");
          }}
        >
          <span style={{ alignSelf: "flex-end" }}>
            <HomeIcon fontSize="large" />
          </span>
          <span className={classes.text}>Home</span>
        </div>
        <div
          className={classes.flexRow}
          onClick={() => {
            history.push("/admin/doctors");
          }}
        >
          <span>
            <SupervisorAccountIcon fontSize="large" />
          </span>
          <span className={classes.text}>Doctors</span>
        </div>
        <div
          className={classes.flexRow}
          onClick={() => {
            history.push("/admin/enquiries");
          }}
        >
          <span style={{ alignSelf: "flex-end" }}>
            <CreateIcon fontSize="large" />
          </span>
          <span className={classes.text}>Enquires</span>
        </div>

        <div
          className={classes.flexRow}
          onClick={() => {
            history.push("/admin");
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
            history.push("/admin/profile");
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

export default SideNav;
