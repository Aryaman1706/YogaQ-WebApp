import React, { useEffect, Fragment } from "react";
import {
  Typography,
  Toolbar,
  Grid,
  Button,
  makeStyles,
  Paper,
  IconButton,
  TextField,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { user as userActions } from "../../../redux/actions/index";

const useStyles = makeStyles((theme) => ({
  div2: {
    padding: "5px 10px 5px 10px",
    display: "flex",
    justifyContent: "space-between",
  },
}));

const ViewUser = () => {
  const { id } = useParams();
  const history = useHistory();
  const { loading, selectUser, error, message } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const start = async () => {
      await dispatch(userActions.setLoading(true));
      await dispatch(userActions.selectUser(id));
    };
    if (!id) {
      history.push("/admin/users");
    } else {
      start();
    }

    return () => {
      dispatch(userActions.clearSelectedUser());
      dispatch(userActions.clear());
    };
    // eslint-disable-next-line
  }, []);

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
      if (result.isConfirmed) {
        const value = {
          blocked: !selectUser.user.blocked,
        };
        dispatch(userActions.blockUser({ id, value }));
      }
    });
  };

  const classes = useStyles();
  return (
    <>
      <Typography variant="h2" align="center">
        Doctor
      </Typography>
      <Toolbar></Toolbar>
      {!loading && selectUser ? (
        <>
          <Grid container direction="row" justify="center" alignItems="stretch">
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
                        <Paper>
                          <div className={classes.div2}>
                            <div>
                              <Typography variant="subtitle1">
                                Username:- {obj.partner.id.username}
                              </Typography>
                              <Typography variant="subtitle1">
                                Email Address:- {obj.partner.id.email}
                              </Typography>
                            </div>
                            <IconButton>
                              <VisibilityIcon />
                            </IconButton>
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
      ) : null}
    </>
  );
};

export default ViewUser;
