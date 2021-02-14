import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import QuestionItem from "../../User/QuestionItem";
import { admin as adminActions } from "../../../redux/actions";
import { useHistory, useParams } from "react-router-dom";
import AdminAppbar from "../AdminAppbar";

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
}));

const QuestionBank = () => {
  const { active_chatroom, questionSet } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [compLoading, setCompLoading] = useState(false);
  const {
    location: { pathname },
    push,
  } = useHistory();
  const { chatroomId } = useParams();

  const loadAdminQuestionSet = async () => {
    if (!active_chatroom) {
      await dispatch(adminActions.getChatroom(chatroomId));
    }
    await dispatch(adminActions.getQuestionSet(active_chatroom._id));
    setCompLoading(false);
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
        {console.log(responses, "responses")}
      </AdminAppbar>
    </>
  );
};

export default QuestionBank;
