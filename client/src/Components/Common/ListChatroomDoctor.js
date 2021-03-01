import React, { useState, Fragment } from "react";
import {
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Paper,
  makeStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { admin as adminActions } from "../../redux/actions";
import axios from "../../utils/axios";

const useStyles = makeStyles((theme) => ({
  div2: {
    padding: "5px 10px 5px 10px",
    display: "flex",
    justifyContent: "space-between",
  },
  paperChatroom: {
    padding: "5px 10px 5px 10px",
    placeItems: "center",
    display: "flex",
    justifyContent: "space-between",
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 16px 0px",
    borderRadius: "3px",
    "&:hover": {
      transform: "scale(1.02)",
      transition: "all 0.16s ease-in 0s",
      cursor: "pointer",
    },
  },
}));

const ListChatroomDoctor = ({ doctorId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [chatroomFilter, setChatroomFilter] = useState({
    startDate: null,
    endDate: null,
  });
  const [chatrooms, setChatrooms] = useState({
    list: [],
    end: false,
  });
  const [onlyNew, setOnlyNew] = useState(false);
  const [newChatrooms, setNewChatrooms] = useState([]);

  const dateHandler = (e) => {
    setChatroomFilter((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onlyNewHandler = (e) => {
    setOnlyNew(e.target.checked);
  };

  const submitHandler = async () => {
    try {
      const res = await axios.get(
        `/chatroom/list/${doctorId}/?page=${1}&startDate=${
          chatroomFilter.startDate
        }&endDate=${chatroomFilter.endDate}`
      );

      setChatrooms({
        list: res.data.body.chatrooms,
        end: res.data.body.end,
      });
      filterNewResults(res.data.body.chatrooms);
    } catch (error) {
      setChatroomFilter({ startDate: null, endDate: null });
      setOnlyNew(false);
      console.log(error.response.data);
    }
  };

  const filterNewResults = (list) => {
    const onlyNewChatrooms = [];
    list.forEach((chatroom) => {
      if (
        new Date(chatroom.createdAt) >= new Date(chatroomFilter.startDate) &&
        new Date(chatroom.createdAt) <= new Date(chatroomFilter.endDate)
      ) {
        onlyNewChatrooms.push(chatroom);
      }
    });
    setNewChatrooms(onlyNewChatrooms);
  };

  const viewChatroom = async (event, chatroomId) => {
    await dispatch(adminActions.getChatroom(chatroomId));
    history.push(`/admin/chatroom/view/${chatroomId}`);
  };

  const renderChatrooms = () => {
    if (onlyNew) {
      if (!newChatrooms || newChatrooms.length === 0) {
        return <>No available Chatrooms</>;
      } else {
        return newChatrooms.map((chatroom) => (
          <ChatroomItem chatroom={chatroom} />
        ));
      }
    } else {
      if (!chatrooms.list || chatrooms.list.length === 0) {
        return <>No available Chatrooms</>;
      } else {
        return chatrooms.list.map((chatroom) => (
          <ChatroomItem chatroom={chatroom} />
        ));
      }
    }
  };

  const ChatroomItem = ({ chatroom }) => {
    return (
      <>
        <Grid item xs={12}>
          <Paper
            elevation={0}
            className={classes.paperChatroom}
            onClick={(event) => viewChatroom(event, chatroom._id)}
          >
            <div className={classes.div2}>
              <div>
                <Typography variant="subtitle1">
                  Username:- {chatroom.user.id.username}
                </Typography>
                <Typography variant="subtitle1">
                  Email Address:- {chatroom.user.id.email}
                </Typography>
                <Typography variant="subtitle2">
                  Created On:-{" "}
                  {new Date(chatroom.createdAt).toLocaleDateString()}
                </Typography>
              </div>
            </div>
          </Paper>
        </Grid>
      </>
    );
  };
  return (
    <>
      <Typography variant="h4" align="center">
        Chat Rooms
      </Typography>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="stretch"
        spacing={1}
        style={{ marginTop: "1rem" }}
      >
        <Grid item xs={12}>
          <Grid container spacing={1} justify="space-between">
            <Grid item xs={4}>
              <TextField
                fullWidth
                variant="outlined"
                name="startDate"
                type="date"
                value={chatroomFilter.startDate}
                onChange={(event) => dateHandler(event)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                variant="outlined"
                name="endDate"
                type="date"
                value={chatroomFilter.endDate}
                onChange={(event) => dateHandler(event)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={submitHandler}
                style={{
                  backgroundColor: "#0FC1A7",
                  height: "50px",
                  backgroundImage:
                    "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
                }}
              >
                Filter
              </Button>
            </Grid>
            {chatrooms.list && chatrooms.list.length > 0 ? (
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={onlyNew}
                      onChange={(event) => onlyNewHandler(event)}
                      name="onlyNew"
                      color="primary"
                    />
                  }
                  label="Only New"
                />
              </Grid>
            ) : null}
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ marginTop: "1rem" }}>
          <>
            <Grid container spacing={1}>
              {renderChatrooms()}
            </Grid>
          </>
        </Grid>
      </Grid>
    </>
  );
};

export default ListChatroomDoctor;
