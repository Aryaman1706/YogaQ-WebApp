import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import QuestionItem from "./QuestionItem";
import { user as userActions } from "../../redux/actions/index";
import UserAppbar from "./UserAppbar";

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
    // eslint-disable-next-line
  }, [compLoading]);

  const [responses, setResponses] = useState({});
  return (
    <>
      <UserAppbar>
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
          <Grid
            item
            xs={12}
            container
            spacing={2}
            style={{ padding: "1.5rem" }}
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
          </Grid>
        </Grid>
        {console.log(responses, "responses")}
      </UserAppbar>
    </>
  );
};

export default QuestionBank;
