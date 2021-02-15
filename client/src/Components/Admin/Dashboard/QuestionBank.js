import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Grid,
  makeStyles,
  Typography,
  TextField,
} from "@material-ui/core";
import QuestionItem from "../../User/QuestionItem";
import { admin as adminActions } from "../../../redux/actions";
import { useHistory, useParams } from "react-router-dom";
import AdminAppbar from "../AdminAppbar";
import Swal from "sweetalert2";
import axios from "../../../utils/axios";

const useStyles = makeStyles((theme) => ({
  btn: {
    border: "2px solid #0FC1A7",
    padding: "0.5rem",
    color: "#0FC1A7",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    fontSize: "1rem",
    fontFamily: "sans-serif",
    transition: "ease-out 0.5s",
    margin: "1rem 1rem 0 0",
    "&:before": {
      width: "0%",
      height: "100%",
      top: "0",
      left: "0",
    },
    "&:hover": {
      boxShadow: "inset 400px 0 0 0 #0FC1A7",
      color: "#fff",
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const QuestionBank = () => {
  const { active_chatroom, questionSet } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [compLoading, setCompLoading] = useState(false);
  const [date, setDate] = useState(null);
  const {
    location: { pathname },
    push,
  } = useHistory();
  const { chatroomId } = useParams();

  const loadAdminQuestionSet = async () => {
    if (!active_chatroom) {
      await dispatch(adminActions.getChatroom(chatroomId));
    } else if (active_chatroom) {
      await dispatch(adminActions.getQuestionSet(active_chatroom?._id));
      setCompLoading(false);
    }
  };

  const getResponses = async () => {
    try {
      const res = await axios.get(
        `/questionSet/doctor/filled/${active_chatroom?._id}/?date=${date}`
      );
      setResponses(
        res.data.body.responses ? res.data.body.responses.responses : {}
      );
    } catch (error) {
      // swal fire error
      console.log("Error here\n", error);
    }
  };

  const submitHandler = () => {
    if (!date) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error",
        text: "Enter a valid date.",
        showConfirmButton: true,
        timer: 1500,
      });
    } else {
      getResponses();
    }
  };

  useEffect(() => {
    setCompLoading(true);
  }, []);

  useEffect(() => {
    if (compLoading) {
      loadAdminQuestionSet();
    }
    // eslint-disable-next-line
  }, [compLoading]);

  useEffect(() => {
    // * Rerun the following function when active_chatroom changes from null to valid
    loadAdminQuestionSet();
    // eslint-disable-next-line
  }, [active_chatroom]);

  const [responses, setResponses] = useState({});
  return (
    <>
      <AdminAppbar>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ textAlign: "right" }}>
            <Button
              className={classes.btn}
              onClick={() => {
                push(`/admin/add-question/${chatroomId}`);
              }}
            >
              Add A Question
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h2" style={{ padding: "1rem 1rem 0 1rem" }}>
              Evaluate
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                padding: "1rem 1rem 0 1rem",
              }}
            >
              <Typography variant="h6" style={{ alignSelf: "center" }}>
                Get responses for:-{" "}
              </Typography>
              <TextField
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className={classes.textField}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={submitHandler}
              >
                Submit
              </Button>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              style={{ padding: "0 1rem 1rem 1rem" }}
            >
              {compLoading ? (
                <h3>Loading...</h3>
              ) : (
                <>
                  {!questionSet || questionSet.questions.length === 0 ? (
                    <>
                      <h3>No questions available</h3>
                    </>
                  ) : (
                    <>
                      {questionSet.questions.map((question, index) => (
                        <QuestionItem
                          key={index}
                          disabled={true}
                          id={index}
                          question={question}
                          responses={responses}
                          setResponses={setResponses}
                        />
                      ))}
                    </>
                  )}
                </>
              )}
            </Typography>
          </Grid>
        </Grid>
      </AdminAppbar>
    </>
  );
};

export default QuestionBank;
