import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import QuestionItem from "./QuestionItem";
import { user as userActions } from "../../redux/actions/index";

const QuestionBank = () => {
  const { active_chatroom, questionSet } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [compLoading, setCompLoading] = useState(false);

  const loadQuestionSet = async () => {
    await dispatch(userActions.getQuestionSet(active_chatroom._id));
    setCompLoading(false);
  };

  useEffect(() => {
    setCompLoading(true);
  }, []);

  useEffect(() => {
    if (compLoading) {
      loadQuestionSet();
    }
  }, [compLoading]);

  const [responses, setResponses] = useState({});
  return (
    <>
      <Grid container spacing={2}>
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
            Help us to understand you know better by answering the folowing
            questions.
          </Typography>
        </Grid>
        <Grid item xs={12} container spacing={2} style={{ padding: "1.5rem" }}>
          {compLoading ? (
            <h3>Loading...</h3>
          ) : (
            <>
              {!questionSet || questionSet.questions.length() === 0 ? (
                <>
                  <h3>No questions available</h3>
                </>
              ) : (
                <>
                  {questionSet.questions.map((item, index) => (
                    <QuestionItem
                      key={index}
                      id={index}
                      item={item}
                      responses={responses}
                      setResponses={setResponses}
                    />
                  ))}
                </>
              )}
            </>
          )}
        </Grid>
      </Grid>
      {console.log(responses, "responses")}
    </>
  );
};

export default QuestionBank;
