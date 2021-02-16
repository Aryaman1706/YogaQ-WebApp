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
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

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
  deleteBtn: {
    textAlign: "right",
  },
}));

const QuestionItem = ({
  id,
  question,
  responses,
  setResponses,
  disabled,
  type,
}) => {
  const classes = useStyles();
  const onAnswer = (e) => {
    setResponses((prevResponses) => {
      return { ...prevResponses, [question._id]: e.target.value };
    });
  };
  return (
    <>
      <Grid item xs={12}>
        <Paper elevation={2} className={classes.questionCard}>
          {type === "admin" && (
            <div className={classes.deleteBtn}>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </div>
          )}
          <div className={classes.flexRow}>
            <p>Q{id + 1}.</p>
            <p>{question.statement}</p>
          </div>
          <FormControl component="fieldset">
            <FormLabel component="legend">Select an option</FormLabel>
            <RadioGroup
              aria-label="question"
              name="question"
              value={responses[question._id] ? responses[question._id] : ""}
              onChange={(e) => {
                onAnswer(e);
              }}
              style={{ marginTop: "1rem" }}
            >
              {question.options.map((option, index) => (
                <FormControlLabel
                  disabled={disabled}
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
