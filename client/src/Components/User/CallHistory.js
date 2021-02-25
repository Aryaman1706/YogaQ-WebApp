import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Button,
  ButtonGroup,
  makeStyles,
} from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  user as userActions,
  callHistory as callHistoryActions,
  chatroom,
} from "../../redux/actions/index";
import CallHistoryItem from "./CallHistoryItem";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../Common/Loader";
import homeIcon from "../../assets/home.svg";
import UserAppbar from "../Common/Appbar";
import EditCallModal from "./EditCallModal";
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

const CallHistory = () => {
  const classes = useStyles();
  const history = useHistory();
  const [compLoading, setCompLoading] = useState(true);
  const [state, setState] = useState(null);
  const dispatch = useDispatch();
  const { user, active_chatroom } = useSelector((state) => state.user);
  const { list, end } = useSelector((state) => state.callHistory);
  const { chatroomId } = useParams();

  useEffect(() => {
    return () => {
      dispatch(userActions.clear());
      // dispatch(userActions.clearActiveChatroom());
      dispatch(callHistoryActions.clearList());
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(user);
    setState(user);
  }, [user]);

  const load = async (page) => {
    // setCompLoading(true);
    await dispatch(callHistoryActions.listEnquiries(page, chatroomId));
    setCompLoading(false);
  };

  return (
    <>
      <UserAppbar type={"user"}>
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
              {list ? (
                <PaginatedList
                  ListItem={CallHistoryItem}
                  loadFunction={load}
                  end={end}
                  list={list}
                  chatroomId={chatroomId}
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
