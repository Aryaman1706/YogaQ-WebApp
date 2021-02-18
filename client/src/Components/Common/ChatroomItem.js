import React from "react";
import { Grid, Paper, makeStyles, Avatar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  admin as adminActions,
  user as userActions,
  doctor as doctorActions,
} from "../../redux/actions/index";
import Profile from "../../assets/user.svg";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "15px 10px 15px 10px",
    display: "flex",
    "&:hover": {
      backgroundColor: "rgb(211,211,211, 0.2)",
    },
  },
  item: {
    paddingLeft: "0px",
    paddingRight: "0px",
  },
  chatItem: {
    // borderBottom: "1px solid black",
  },
  chatHeader: {
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  chatDetailsContainer: {
    display: "flex",
    flexDirection: "column",
  },
  roleText: {
    fontSize: "0.6rem",
  },
  unreadCounter: {
    backgroundColor: "#0FC1A7",
    color: "#fff",
    borderRadius: "50%",
    height: "20px",
    width: "20px",
    display: "grid",
    placeItems: "center",
    fontSize: "0.8rem",
  },
}));

const ChatroomItem = ({ type, chatroom }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { active_chatroom } = useSelector((state) => {
    if (type.trim() === "admin") return state.admin;
    else if (type.trim() === "doctor") return state.doctor;
    else if (type.trim() === "user") return state.user;
  });

  const selectChatroomForAdmin = async () => {
    await dispatch(adminActions.setChatroomLoading(true));
    await dispatch(adminActions.getChatroom(chatroom._id));
    await dispatch(adminActions.setChatroomLoading(false));
    await dispatch(adminActions.clearUnreadMessages(chatroom._id));
  };

  const selectChatroomForDoctor = async () => {
    //
  };

  const selectChatroomForUser = async () => {
    await dispatch(userActions.setChatroomLoading(true));
    await dispatch(userActions.getChatroom(chatroom._id));
    await dispatch(userActions.setChatroomLoading(false));
    await dispatch(userActions.clearUnreadMessages(chatroom._id));
  };

  const clickHandler = async (e) => {
    if (
      !active_chatroom ||
      active_chatroom._id.toString() !== chatroom._id.toString()
    ) {
      if (type.trim() === "admin") selectChatroomForAdmin();
      else if (type.trim() === "doctor") selectChatroomForDoctor();
      else if (type.trim() === "user") selectChatroomForUser();
    }
  };
  return (
    <>
      <Grid
        item
        className={classes.chatItem}
        onClick={(event) => clickHandler(event)}
      >
        <Paper elevation={0} className={classes.paper}>
          <div style={{ margin: "auto 0 auto 0", padding: "0 1rem 0 0" }}>
            <Avatar
              alt={
                type.trim() === "user"
                  ? chatroom.partner.id.username
                  : chatroom.user.id.username
              }
              src={Profile}
            />
          </div>
          <div>
            <div className={classes.chatDetailsContainer}>
              <span className={classes.chatHeader}>
                {type.trim() === "user"
                  ? chatroom.partner.id.username
                  : chatroom.user.id.username}
              </span>
              {type.trim() === "user" ? (
                <span className={classes.roleText}>
                  {chatroom.partner.id.role.toUpperCase()}
                </span>
              ) : (
                <span className={classes.roleText}>User</span>
              )}
            </div>
          </div>
          {chatroom.unreadMessages !== 0 && (
            <div
              style={{
                alignSelf: "center",
                flexGrow: 3,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Paper elevation={0} className={classes.unreadCounter}>
                {chatroom.unreadMessages}
              </Paper>
            </div>
          )}
        </Paper>
      </Grid>
    </>
  );
};

export default ChatroomItem;
