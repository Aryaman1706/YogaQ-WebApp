import React from "react";
import { Grid, Typography, Paper, Badge, makeStyles } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import { useDispatch, useSelector } from "react-redux";
import { user as userActions } from "../../redux/actions/index";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "5px 10px 5px 10px",
    placeItems: "center",
    display: "flex",
    justifyContent: "space-between",
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
      await dispatch(userActions.setLoading(true));
      dispatch(userActions.getChatroom(chatroom._id));
    }
  };
  return (
    <>
      <Grid item onClick={(event) => clickHandler(event)}>
        <Paper elevation={4} className={classes.paper}>
          <div>
            <Typography variant="h6" align="left">
              {chatroom.partner.id.username}
            </Typography>
            <Typography variant="subtitle1" align="left">
              {chatroom.partner.id.role.toUpperCase()}
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
