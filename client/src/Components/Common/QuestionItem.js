import React, { useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import {
  admin as adminActions,
  doctor as doctorActions,
} from "../../redux/actions";
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
  const dispatch = useDispatch();
  const { active_chatroom, error, message } = useSelector((state) => {
    if (type.trim() === "admin") return state.admin;
    else if (type.trim() === "doctor") return state.doctor;
    else if (type.trim() === "user") return state.user;
  });

  const clearErrors = () => {
    if (type.trim() === "admin") {
      dispatch(adminActions.clear());
    } else if (type.trim() === "doctor") {
      dispatch(doctorActions.clear());
    }
  };

  useEffect(() => {
    return () => {
      clearErrors();
    };
    // eslint-disable-next-line
  }, []);

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

  const errorHandler = () => {
    if (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error Occured.",
        text: `${error}`,
        showConfirmButton: true,
        timer: 1500,
        willClose: () => {
          clearErrors();
        },
      });
    }
    if (message) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success.",
        text: `${message}`,
        showConfirmButton: true,
        timer: 1500,
        willClose: () => {
          clearErrors();
        },
      });
    }
    clearErrors();
  };

  useEffect(() => {
    if (error || message) errorHandler();
    // eslint-disable-next-line
  }, [error, message]);

  const deleteQuestion = () => {
    if (type.trim() === "admin") {
      dispatch(
        adminActions.removeQuestionToQuestionSet({
          chatroomId: active_chatroom._id,
          questionId: question._id,
        })
      );
    } else if (type.trim() === "doctor") {
      dispatch(
        doctorActions.removeQuestionToQuestionSet({
          chatroomId: active_chatroom._id,
          questionId: question._id,
        })
      );
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <Paper elevation={2} className={classes.questionCard}>
          {(type.trim() === "admin" || type.trim() === "doctor") && (
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
