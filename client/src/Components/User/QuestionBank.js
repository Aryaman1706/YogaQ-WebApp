import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import QuestionItem from "../Common/QuestionItem";
import { user as userActions } from "../../redux/actions/index";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";

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
  submitBtn: {
    margin: "1rem",
  },
}));

const QuestionBank = () => {
  const { active_chatroom, questionSet, error, message } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const [compLoading, setCompLoading] = useState(false);
  const [responses, setResponses] = useState({});
  const {
    location: { pathname },
    push,
  } = useHistory();
  const { chatroomId } = useParams();

  const loadQuestionSet = async () => {
    if (!active_chatroom) {
      await dispatch(userActions.getChatroom(chatroomId));
    } else {
      await dispatch(userActions.getQuestionSet(active_chatroom?._id));
      setCompLoading(false);
    }
  };

  const checkResponses = () => {
    for (const question of questionSet.questions) {
      if (
        !responses[question._id] ||
        !question.options.includes(responses[question._id])
      ) {
        return false;
      }
    }
    return true;
  };

  const submitHandler = async () => {
    if (checkResponses()) {
      await dispatch(
        userActions.fillQuestionSet({
          chatroomId: active_chatroom._id,
          responses,
        })
      );
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error Occured.",
        text: "Provide valid answers to all questions",
        showConfirmButton: true,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    setCompLoading(true);
    return () => {
      dispatch(userActions.clear());
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (compLoading) {
      loadQuestionSet();
    }
    // eslint-disable-next-line
  }, [compLoading]);

  useEffect(() => {
    loadQuestionSet();

    // eslint-disable-next-line
  }, [active_chatroom]);

  const errorHandling = async () => {
    if (message && /^Response Submitted Successfully*/i.test(message)) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success",
        text: "Response Submitted Successfully.",
        showConfirmButton: true,
        willClose: () => {
          dispatch(userActions.clear());
        },
      });
    }
    if (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error",
        text: error,
        showConfirmButton: true,
        timer: 1500,
        willClose: () => {
          dispatch(userActions.clear());
        },
      });
    }
  };

  useEffect(() => {
    if (message || error) {
      errorHandling();
    }
    // eslint-disable-next-line
  }, [message, error]);

  return (
    <>
      <Grid container spacing={2}>
        {/\/admin*/.test(pathname) === true && (
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
        )}
        <Grid item xs={12}>
          <Typography variant="h2" style={{ padding: "1rem 1rem 0 1rem" }}>
            Evaluate
          </Typography>
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
                {!questionSet || questionSet?.questions?.length === 0 ? (
                  <>
                    <h3>No questions available</h3>
                  </>
                ) : (
                  <>
                    {questionSet.questions.map((question, index) => (
                      <QuestionItem
                        key={index}
                        disabled={false}
                        id={index}
                        question={question}
                        responses={responses}
                        setResponses={setResponses}
                        type={"user"}
                      />
                    ))}
                  </>
                )}
              </>
            )}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            disabled={!questionSet || questionSet?.questions?.length === 0}
            onClick={submitHandler}
            variant="contained"
            color="primary"
            className={classes.submitBtn}
          >
            Submit Responses
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default QuestionBank;
