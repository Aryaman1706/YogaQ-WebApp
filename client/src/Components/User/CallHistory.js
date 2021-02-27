import React, { useEffect, useState } from "react";
import { Typography, Grid, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  user as userActions,
  admin as adminActions,
  callHistory as callHistoryActions,
} from "../../redux/actions/index";
import CallHistoryItem from "./CallHistoryItem";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../Common/Loader";
import homeIcon from "../../assets/home.svg";
import UserAppbar from "../Common/Appbar";
import PaginatedList from "../Common/PaginatedList";

const useStyles = makeStyles((theme) => ({
  homeIcon: {
    height: "1.5rem",
    width: "auto",
    objectFit: "contain",
    margin: "auto 0 auto 0",
    paddingRight: "0.5rem",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    width: "fit-content",
    padding: "0.5rem",
    "&:hover": {
      backgroundColor: "rgb(211,211,211, 0.4)",
      cursor: "pointer",
      borderRadius: "10px",
      transition: "all 0.2s ease-in-out",
    },
  },
  homeText: {
    fontSize: "1rem",
    lineHeight: "1.5rem",
    margin: "auto 0 auto 0",
  },
}));

const CallHistory = ({ type }) => {
  const classes = useStyles();
  const history = useHistory();
  const [compLoading, setCompLoading] = useState(false);
  const dispatch = useDispatch();
  const { active_chatroom } = useSelector((state) => {
    if (type.trim() === "user") return state.user;
    else if (type.trim() === "admin") return state.admin;
  });
  const { list, end } = useSelector((state) => state.callHistory);
  const { chatroomId } = useParams();

  const clear = () => {
    if (type.trim() === "user") {
      dispatch(userActions.clear());
    } else if (type.trim() === "admin") {
      dispatch(adminActions.clear());
    }
  };

  useEffect(() => {
    if (!active_chatroom) {
      setCompLoading(true);
    }
    return () => {
      clear();
      dispatch(callHistoryActions.clearList());
    };
    // eslint-disable-next-line
  }, []);

  const loadChatroom = async () => {
    if (type.trim() === "user") {
      await dispatch(userActions.getChatroom(chatroomId));
    } else if (type.trim() === "admin") {
      await dispatch(adminActions.getChatroom(chatroomId));
    }

    setCompLoading(false);
  };

  useEffect(() => {
    if (compLoading && !active_chatroom) {
      loadChatroom();
    }
    // eslint-disable-next-line
  }, [compLoading]);

  const load = async (page) => {
    await dispatch(callHistoryActions.listEnquiries(page, chatroomId));
  };

  return (
    <>
      <UserAppbar type={type.trim()}>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ padding: "1rem" }}>
            <div
              className={classes.flexRow}
              onClick={() => {
                history.push("/");
              }}
            >
              <img src={homeIcon} alt="home" className={classes.homeIcon} />
              <span className={classes.homeText}>Back to home</span>
            </div>
          </Grid>
        </Grid>
        <Typography variant="h2" style={{ padding: "1rem" }}>
          Call History
        </Typography>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="stretch"
          style={{ padding: "1rem" }}
        >
          <Grid item xs={12} lg={12}>
            <Grid
              container
              direction="column"
              justify="space-around"
              alignItems="stretch"
              spacing={2}
            >
              <Grid
                container
                item
                xs={12}
                justify="space-between"
                style={{ padding: "15px" }}
              >
                <Grid item xs={2}>
                  <Typography variant="h5" style={{ color: "#606060" }}>
                    Date
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    variant="h5"
                    align="right"
                    style={{ color: "#606060" }}
                  >
                    Status
                  </Typography>
                </Grid>
              </Grid>
              {list && !compLoading ? (
                <PaginatedList
                  ListItem={CallHistoryItem}
                  loadFunction={load}
                  end={end}
                  list={list}
                  chatroomId={chatroomId}
                  type={type.trim()}
                />
              ) : (
                <Loader />
              )}
            </Grid>
          </Grid>
        </Grid>
      </UserAppbar>
    </>
  );
};

export default CallHistory;
