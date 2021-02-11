import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import QuestionItem from "./QuestionItem";

const QuestionBank = () => {
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
          {new Array(10).fill(1).map((item, index) => (
            <QuestionItem
              key={index}
              id={index}
              item={item}
              responses={responses}
              setResponses={setResponses}
            />
          ))}
        </Grid>
      </Grid>
      {console.log(responses, "responses")}
    </>
  );
};

export default QuestionBank;
