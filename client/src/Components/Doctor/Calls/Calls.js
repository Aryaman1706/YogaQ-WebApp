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
} from "../../../redux/actions/index";
import CallHistoryItem from "../../User/CallHistoryItem";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../../Common/Loader";
import homeIcon from "../../../assets/home.svg";
// import UserAppbar from "./UserAppbar";
// import EditCallModal from "./EditCallModal";

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

const Calls = () => {
  const classes = useStyles();
  const history = useHistory();
  const [pagination, setPagination] = useState({
    loadedPages: 1,
    currentPage: 1,
    startIndex: 0,
    endIndex: 0,
    callHistoryList: [],
    end: false,
  });
  //   ! Set to false for testing
  const [compLoading, setCompLoading] = useState(false);
  const [state, setState] = useState(null);
  const {
    loadedPages,
    currentPage,
    startIndex,
    endIndex,
    callHistoryList,
    end,
  } = pagination;
  const dispatch = useDispatch();
  //   const { user, active_chatroom } = useSelector((state) => state.user);
  //   const callHistoryState = useSelector((state) => state.callHistory);
  const { chatroomId } = useParams();

  // !!!!! Only for testing !!!!
  const item = {
    _id: "60224e75a2bdc24b7b4af61c",
    accepted: false,
    completed: false,
    chatroomId: "602242ff6e8fa01206a75d29",
    time: "2021-02-17T08:57:00.000+00:00",
  };

  //   useEffect(() => {
  //     return () => {
  //     //   dispatch(userActions.clear());
  //       // dispatch(userActions.clearActiveChatroom());
  //     //   dispatch(callHistoryActions.clearList());
  //     };
  //     // eslint-disable-next-line
  //   }, []);

  //   useEffect(() => {
  //     // dispatch(userActions.getChatroom(chatroomId));
  //     //eslint-disable-next-line
  //   }, []);

  //   useEffect(() => {
  //     console.log(user);
  //     setState(user);
  //   }, [user]);

  //   const load = async () => {
  //     // setCompLoading(true);
  //     await dispatch(callHistoryActions.listEnquiries(loadedPages, chatroomId));
  //     setCompLoading(false);
  //   };
  //   useEffect(() => {
  //     setCompLoading(true);
  //     // load();
  //     // eslint-disable-next-line
  //   }, [loadedPages]);

  //   useEffect(() => {
  //     if (compLoading && active_chatroom) {
  //       load();
  //     }
  //     // eslint-disable-next-line
  //   }, [compLoading, active_chatroom]);

  //   useEffect(() => {
  //     setPagination((prev) => {
  //       return {
  //         ...prev,
  //         startIndex: (prev.loadedPages - 1) * 5,
  //         endIndex: prev.loadedPages * 5,
  //         callHistoryList: callHistoryState.list,
  //         end: callHistoryState.end,
  //       };
  //     });
  //   }, [callHistoryState.end, callHistoryState.list]);

  //   const nextHandler = (event) => {
  //     if (!end) {
  //       if (currentPage === loadedPages) {
  //         setPagination((prev) => {
  //           return {
  //             ...prev,
  //             loadedPages: prev.loadedPages + 1,
  //             currentPage: prev.currentPage + 1,
  //           };
  //         });
  //       } else {
  //         setPagination((prev) => {
  //           return {
  //             ...prev,
  //             currentPage: prev.currentPage + 1,
  //             startIndex: prev.currentPage * 5,
  //             endIndex: (prev.currentPage + 1) * 5,
  //           };
  //         });
  //       }
  //     } else {
  //       if (currentPage !== loadedPages) {
  //         setPagination((prev) => {
  //           return {
  //             ...prev,
  //             currentPage: prev.currentPage + 1,
  //             startIndex: prev.currentPage * 5,
  //             endIndex: (prev.currentPage + 1) * 5,
  //           };
  //         });
  //       }
  //     }
  //   };

  //   const prevHandler = (event) => {
  //     if (currentPage > 1) {
  //       setPagination((prev) => {
  //         return {
  //           ...prev,
  //           currentPage: prev.currentPage - 1,
  //           startIndex: (prev.currentPage - 2) * 5,
  //           endIndex: (prev.currentPage - 1) * 5,
  //         };
  //       });
  //     }
  //   };

  return (
    <>
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
        Calls
      </Typography>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="stretch"
        style={{ padding: "1rem" }}
      >
        <Grid item xs={12} lg={12}>
          {/* {!state || compLoading ? ( */}
          {compLoading ? (
            <Loader />
          ) : (
            <>
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
                <CallHistoryItem
                  item={item}
                  chatroomId={chatroomId}
                  type={"doctor"}
                />
                {/* {callHistoryList
                    ?.slice(startIndex, endIndex)
                    .map((item, index) => {
                      return (
                        <>
                          <CallHistoryItem
                            key={index}
                            item={item}
                            chatroomId={chatroomId}
                            type={"doctor"}
                          />
                        </>
                      );
                    })} */}
              </Grid>
              <br />
              <ButtonGroup variant="contained" color="primary" fullWidth>
                {currentPage !== 1 ? (
                  <Button
                    startIcon={<ArrowBackIos />}
                    //   onClick={(event) => prevHandler(event)}
                    style={{
                      backgroundColor: "#0FC1A7",
                      height: "50px",
                      backgroundImage:
                        "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
                    }}
                  >
                    Previous
                  </Button>
                ) : null}
                {end && currentPage === loadedPages ? null : (
                  <Button
                    endIcon={<ArrowForwardIos />}
                    //   onClick={(event) => nextHandler(event)}
                    style={{
                      backgroundColor: "#0FC1A7",
                      height: "50px",
                      backgroundImage:
                        "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
                    }}
                  >
                    Next
                  </Button>
                )}
              </ButtonGroup>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Calls;
