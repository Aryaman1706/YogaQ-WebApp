import React from "react";
import { Grid, Paper, makeStyles, Avatar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { user as userActions } from "../../redux/actions/index";
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

const ChatroomItem = ({ chatroom }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { active_chatroom } = useSelector((state) => state.user);
  const clickHandler = async (e) => {
    if (
      !active_chatroom ||
      active_chatroom._id.toString() !== chatroom._id.toString()
    ) {
      await dispatch(userActions.setChatroomLoading(true));
      await dispatch(userActions.getChatroom(chatroom._id));
      await dispatch(userActions.setChatroomLoading(false));
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
            <Avatar alt={chatroom.partner.id.username} src={Profile} />
          </div>
          <div>
            <div className={classes.chatDetailsContainer}>
              <span className={classes.chatHeader}>
                {chatroom.partner.id.username}
              </span>
              <span className={classes.roleText}>
                {chatroom.partner.id.role.toUpperCase()}
              </span>
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
