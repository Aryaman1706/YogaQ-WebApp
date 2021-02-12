import React from "react";
import {
  Grid,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  questionCard: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    marginBottom: "1rem",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "stretch",
    "& p": {
      fontWeight: "500",
      fontSize: "1.4rem",
    },
  },
}));

const QuestionItem = ({ id, item, responses, setResponses }) => {
  const classes = useStyles();
  const onAnswer = (e) => {
    setResponses((prevResponses) => {
      return { ...prevResponses, [id]: e.target.value };
    });
  };
  return (
    <>
      <Grid item xs={12}>
        <Paper elevation={2} className={classes.questionCard}>
          <div className={classes.flexRow}>
            <p>Q{{ id } + 1}.</p>
            <p>{item.statement}</p>
          </div>
          <FormControl component="fieldset">
            <FormLabel component="legend">Select an option</FormLabel>
            <RadioGroup
              aria-label="question"
              name="question"
              value={responses[id] ? responses[id] : ""}
              onChange={(e) => {
                onAnswer(e);
              }}
              style={{ marginTop: "1rem" }}
            >
              {item.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>
      </Grid>
    </>
  );
};

export default QuestionItem;
