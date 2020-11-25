import React from "react";
import { Grid, Typography, Paper, Badge, makeStyles } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import { useDispatch, useSelector } from "react-redux";
import { admin as adminActions } from "../../redux/actions/index";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "5px 10px 5px 10px",
    placeItems: "center",
    display: "flex",
    justifyContent: "space-between",
  },
  item: {
    paddingLeft: "0px",
    paddingRight: "0px",
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
      await dispatch(adminActions.setChatroomLoading(true));
      await dispatch(adminActions.getChatroom(chatroom._id));
      await dispatch(adminActions.setChatroomLoading(false));
    }
  };
  return (
    <>
      <Grid item onClick={(event) => clickHandler(event)}>
        <Paper elevation={4} className={classes.paper}>
          <div>
            <Typography variant="h6" align="left">
              {chatroom.user.id.username}
            </Typography>
          </div>
          <div>
            <Badge
              badgeContent={chatroom.unreadMessages}
              max={100}
              color="secondary"
            >
              <MailIcon />
            </Badge>
          </div>
        </Paper>
      </Grid>
    </>
  );
};

export default ChatroomItem;
