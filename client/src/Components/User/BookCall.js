import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Typography,
  Button,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { user as userActions } from "../../redux/actions/index";
import Loader from "../Loader";
import background from "../../assets/background.svg";
import homeIcon from "../../assets/home.svg";
import callIcon from "../../assets/phone-call.svg";
import { useHistory, useParams } from "react-router-dom";
import useCallForm from "../../hooks/useCallForm";
import UserAppbar from "./UserAppbar";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundAttachment: "fixed",
  },
  btn: {
    backgroundColor: "#0FC1A7",
    height: "50px",
    backgroundImage: "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
  },
  paper: {
    padding: 50,
    marginTop: "6rem",
    [theme.breakpoints.only("xs")]: {
      padding: 10,
      marginTop: "1rem",
    },
  },
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

const BookCall = () => {
  const { user } = useSelector((state) => state.user);
  const [state, setState] = useState(null);
  const [date, setDate] = useState("");
  const [compLoading, setCompLoading] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { chatroomId } = useParams();
  const [validate] = useCallForm({
    date,
    chatroomId,
  });

  const unmount = async () => {
    await dispatch(userActions.clear());
    await dispatch(userActions.clearActiveChatroom());
  };

  useEffect(() => {
    return () => {
      unmount();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(user);
    setState(user);
  }, [user]);

  const submitHandler = (e) => {
    setCompLoading(true);
  };

  const submit = async () => {
    await validate();
    setCompLoading(false);
  };

  useEffect(() => {
    if (compLoading) {
      submit();
    }
    // eslint-disable-next-line
  }, [compLoading]);

  return (
    <>
      <UserAppbar>
        <div className={classes.container}>
          <Grid container direction="row" justify="center" alignItems="stretch">
            <Grid item xs={11} sm={10} lg={6}>
              <Paper elevation={8} className={classes.paper}>
                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="stretch"
                  spacing={2}
                >
                  <Grid item xs={6}>
                    <div
                      className={classes.flexRow}
                      onClick={() => {
                        window.location.href = "/";
                        // unmount();
                        // history.push("/");
                      }}
                    >
                      <img
                        src={homeIcon}
                        alt="home"
                        className={classes.homeIcon}
                      />
                      <span className={classes.homeText}>Back to home</span>
                    </div>
                  </Grid>
                  <Grid container item xs={6} justify="flex-end">
                    <div
                      className={classes.flexRow}
                      onClick={() => {
                        history.push(`/call-history/${chatroomId}`);
                      }}
                    >
                      <img
                        src={callIcon}
                        alt="home"
                        className={classes.homeIcon}
                      />
                      <span className={classes.homeText}>Call History</span>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="h4"
                      align="center"
                      style={{ fontWeight: "600" }}
                    >
                      Book A Call
                    </Typography>
                  </Grid>
                  {state ? (
                    <>
                      <Grid item xs={12} style={{ marginTop: "1rem" }}>
                        <TextField
                          id="datetime-local"
                          label="Schedule"
                          type="datetime-local"
                          value={date}
                          onChange={(e) => {
                            setDate(e.target.value);
                          }}
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          fullWidth
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12} style={{ marginTop: "1rem" }}>
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.btn}
                          onClick={(event) => submitHandler(event)}
                        >
                          Book
                        </Button>
                      </Grid>
                    </>
                  ) : (
                    <Loader />
                  )}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </UserAppbar>
    </>
  );
};

export default BookCall;
