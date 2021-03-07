import React from "react";
import { Avatar, makeStyles } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import ForumIcon from "@material-ui/icons/Forum";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import CreateIcon from "@material-ui/icons/Create";
import PersonIcon from "@material-ui/icons/Person";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  flexCol: {
    display: "flex",
    flexDirection: "column",
    margin: "1rem 0 0 1rem",
    color: "#282d31",
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

const SideNav = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    location: { pathname },
  } = history;
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
          className={
            pathname === "/admin/enquiries"
              ? `${classes.flexRow} ${classes.active}`
              : classes.flexRow
          }
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
          className={
            pathname === "/admin/doctors"
              ? `${classes.flexRow} ${classes.active}`
              : classes.flexRow
          }
          onClick={() => {
            history.push("/admin/doctors");
          }}
        >
          <span>
            <SupervisorAccountIcon fontSize="large" />
          </span>
          <span className={classes.text}>Therapists</span>
        </div>
        <div
          className={
            pathname === "/admin/users"
              ? `${classes.flexRow} ${classes.active}`
              : classes.flexRow
          }
          onClick={() => {
            history.push("/admin/users");
          }}
        >
          <span>
            <SupervisorAccountIcon fontSize="large" />
          </span>
          <span className={classes.text}>Users</span>
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
          <span className={classes.text}>Therapist Applications</span>
        </div>

        <div
          className={
            pathname === "/admin"
              ? `${classes.flexRow} ${classes.active}`
              : classes.flexRow
          }
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
          className={
            pathname === "/admin/chatroom/create"
              ? `${classes.flexRow} ${classes.active}`
              : classes.flexRow
          }
          onClick={() => {
            history.push("/admin/chatroom/create");
          }}
        >
          <span>
            <AddIcon fontSize="large" />
          </span>
          <span className={classes.text}>Create Chatroom</span>
        </div>
        <div
          className={
            pathname === "/admin/register"
              ? `${classes.flexRow} ${classes.active}`
              : classes.flexRow
          }
          onClick={() => {
            history.push("/admin/register");
          }}
        >
          <span>
            <AddIcon fontSize="large" />
          </span>
          <span className={classes.text}>Create Admin</span>
        </div>
        <div
          className={
            pathname === "/admin/profile"
              ? `${classes.flexRow} ${classes.active}`
              : classes.flexRow
          }
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
