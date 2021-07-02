import React, { useEffect, Fragment, useState } from "react";
import {
  Typography,
  Toolbar,
  Grid,
  Button,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import background from "../../../assets/background.svg";
import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  user as userActions,
  admin as adminActions,
} from "../../../redux/actions/index";
import Loader from "../../Common/Loader";
import AdminAppbar from "../../Common/Appbar";
import AdminLayout from "../../../layout/AdminLayout";

const useStyles = makeStyles((theme) => ({
  div3: {
    display: "flex",
    justifyContent: "space-between",
  },
  div: {
    display: "flex",
    justifyContent: "flex-end",
  },
  div2: {
    padding: "5px 10px 5px 10px",
    display: "flex",
    justifyContent: "space-between",
  },
  container: {
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundAttachment: "fixed",
  },
  paper: {
    padding: 50,
    marginTop: "6rem",
    [theme.breakpoints.only("xs")]: {
      padding: 10,
      marginTop: "1rem",
    },
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

const ViewUser = () => {
  const { id } = useParams();
  const history = useHistory();
  const { selectUser, error, message } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [compLoading, setCompLoading] = useState(false);
  const [loadingBlock, setLoadingBlock] = useState(false);
  const start = async () => {
    await dispatch(userActions.selectUser(id));
    setCompLoading(false);
  };

  useEffect(() => {
    if (!id) {
      history.push("/admin/users");
    } else {
      setCompLoading(true);
    }

    return () => {
      dispatch(userActions.clearSelectedUser());
      dispatch(userActions.clear());
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (compLoading) {
      start();
    }
    // eslint-disable-next-line
  }, [compLoading]);

  useEffect(() => {
    if (/^User not found*/i.test(error)) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error Occured.",
        text: error,
        showConfirmButton: true,
        timer: 1500,
      }).then(() => {
        history.push("/admin/users");
      });
    }

    if (/^Validation Error*/i.test(error)) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error Occured.",
        text: error,
        showConfirmButton: true,
        timer: 1500,
      });
    }

    if (/^User (un)?blocked Successfully*/i.test(message)) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success",
        text: message,
        showConfirmButton: true,
        timer: 1500,
      }).then(() => {
        window.location.reload();
      });
    }
    // eslint-disable-next-line
  }, [error, message]);

  const clickHandler = (e) => {
    Swal.fire({
      position: "center",
      icon: "question",
      title: "Are You Sure?",
      showConfirmButton: true,
      showDenyButton: true,
      backdrop: true,
    }).then((result) => {
      if (!result.isDenied) {
        setLoadingBlock(true);
      }
    });
  };

  const click = async () => {
    const value = {
      blocked: !selectUser.user.blocked,
    };
    await dispatch(userActions.blockUser({ id, value }));
    setLoadingBlock(false);
  };

  useEffect(() => {
    if (loadingBlock) {
      click();
    }
    // eslint-disable-next-line
  }, [loadingBlock]);

  const getCalls = () => {
    let x = 0;
    let y = 0;
    selectUser.chatrooms.forEach((chatroom) => {
      x += chatroom.call.length;
      chatroom.call.forEach((call) => {
        if (call.completed) {
          y++;
        }
      });
    });
    return { Total: x, Completed: y };
  };

  const viewChatroom = async (event, chatroomId) => {
    await dispatch(adminActions.getChatroom(chatroomId));
    history.push(`/admin/chatroom/view/${chatroomId}`);
  };

  const classes = useStyles();
  return (
    <>
      <AdminAppbar type={"admin"}>
        <AdminLayout>
          <Typography variant="h2" align="center">
            User
          </Typography>
          <Toolbar></Toolbar>
          {!compLoading && selectUser && !loadingBlock ? (
            <>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="stretch"
              >
                <Grid item xs={1} lg={3}></Grid>
                <Grid item xs={10} lg={6}>
                  <Grid
                    container
                    direction="column"
                    justify="space-around"
                    alignItems="stretch"
                    spacing={2}
                  >
                    <Grid item>
                      {selectUser.user.complete ? (
                        <Typography variant="h6" align="left">
                          User profile is Complete
                        </Typography>
                      ) : (
                        <Typography variant="h6" align="left" color="error">
                          User profile is Incomplete
                        </Typography>
                      )}
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="User Name"
                        value={selectUser.user.username}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Email"
                        value={selectUser.user.email}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Phone Number"
                        value={selectUser.user.phoneNumber}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Age"
                        value={selectUser.user.age}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Gender"
                        value={selectUser.user.gender}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Country"
                        value={selectUser.user.country}
                      />
                    </Grid>
                    <Grid item>
                      <div className={classes.div3}>
                        <Typography variant="subtitle1">
                          Number of Chat Rooms
                        </Typography>
                        <Typography variant="subtitle1" color="secondary">
                          {selectUser.chatrooms.length}
                        </Typography>
                      </div>
                    </Grid>

                    {Object.keys(getCalls()).map((item, index) => (
                      <Grid item key={index}>
                        <div className={classes.div3}>
                          <Typography variant="subtitle1">
                            {item.toString()} Calls
                          </Typography>
                          <Typography variant="subtitle1" color="secondary">
                            {getCalls()[item]}
                          </Typography>
                        </div>
                      </Grid>
                    ))}
                    <Grid item>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={(event) => clickHandler(event)}
                      >
                        {selectUser.user.blocked ? "Unblock" : "Block"} User
                      </Button>
                    </Grid>
                  </Grid>
                  <Toolbar></Toolbar>
                  <Grid
                    container
                    direction="column"
                    justify="space-around"
                    alignItems="stretch"
                    spacing={2}
                  >
                    <Grid item>
                      <Typography variant="h3" align="center">
                        Chat Rooms
                      </Typography>
                    </Grid>
                    {selectUser.chatrooms.map((obj, index) => {
                      return (
                        <Fragment key={index}>
                          <Grid item>
                            <Paper
                              elevation={0}
                              className={classes.paperChatroom}
                              onClick={(event) => viewChatroom(event, obj._id)}
                            >
                              <div className={classes.div2}>
                                <div>
                                  <Typography variant="subtitle1">
                                    Username:- {obj.partner.id.username}
                                  </Typography>
                                  <Typography variant="subtitle1">
                                    Email Address:- {obj.partner.id.email}
                                  </Typography>
                                  <Typography variant="subtitle2">
                                    Created On:-{" "}
                                    {new Date(
                                      obj.createdAt
                                    ).toLocaleDateString()}
                                  </Typography>
                                </div>
                              </div>
                            </Paper>
                          </Grid>
                        </Fragment>
                      );
                    })}
                  </Grid>
                </Grid>
                <Grid item xs={1} lg={3}></Grid>
              </Grid>
            </>
          ) : (
            <Loader />
          )}
        </AdminLayout>
      </AdminAppbar>
    </>
  );
};

export default ViewUser;
