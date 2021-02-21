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
import axios from "../../utils/axios";
import Swal from "sweetalert2";

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

  const handleDeleteAction = () => {
    Swal.fire({
      title: "Are you sure you want to delete the selected question?",
      text: "This action cannot be undone",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteQuestion();
      }
    });
  };

  // ! Fix get chatroomId first
  const deleteQuestion = () => {
    axios
      .delete(`/questionSet/removeQuestion/${question._id}`, {
        questionId: id,
      })
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          title: "Sucessfully Deleted",
          text:
            "Successfully removed the selected question from the question set",
          icon: "success",
          showConfirmButton: true,
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
          showConfirmButton: true,
        });
      });
  };

  return (
    <>
      <Grid item xs={12}>
        <Paper elevation={2} className={classes.questionCard}>
          {type === "admin" && (
            <div className={classes.deleteBtn}>
              <IconButton onClick={handleDeleteAction}>
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
