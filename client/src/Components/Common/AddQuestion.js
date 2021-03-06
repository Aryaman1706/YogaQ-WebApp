import React, { useState, useEffect } from "react";
import { TextField, Typography, Grid, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  admin as adminActions,
  doctor as doctorActions,
} from "../../redux/actions";
import Swal from "sweetalert2";
import Appbar from "./Appbar";
import { useParams } from "react-router-dom";

const AddQuestion = ({ type }) => {
  const [state, setState] = useState({
    statement: "",
    options: ["", "", "", ""],
  });
  const { active_chatroom, message, error } = useSelector((state) => {
    if (type.trim() === "admin") return state.admin;
    else if (type.trim() === "doctor") return state.doctor;
  });
  const dispatch = useDispatch();
  const { chatroomId } = useParams();

  const {
    statement,
    options: [option1, option2, option3, option4],
  } = state;

  const onStatementChange = (e) => {
    setState((prev) => {
      return {
        ...prev,
        statement: e.target.value,
      };
    });
  };

  const onOptionChange = (e) => {
    const index = parseInt(e.target.id.split("-")[1]) - 1;
    setState((prev) => {
      const options = [...prev.options];
      options[index] = e.target.value;
      return {
        ...prev,
        options,
      };
    });
  };

  const submitHandler = async () => {
    if (type.trim() === "admin") {
      await dispatch(
        adminActions.addQuestionToQuestionSet({
          chatroomId: active_chatroom?._id || chatroomId,
          question: state,
        })
      );
    } else if (type.trim() === "doctor") {
      await dispatch(
        doctorActions.addQuestionToQuestionSet({
          chatroomId: active_chatroom?._id || chatroomId,
          question: state,
        })
      );
    }
  };

  const errorHandling = async () => {
    if (message && /^Question Added Successfully*/i.test(message)) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success",
        text: "Question added successfully.",
        showConfirmButton: true,
        timer: 1500,
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
      });
    }
    if (type.trim() === "admin") {
      await dispatch(adminActions.clear());
    } else if (type.trim() === "doctor") {
      await dispatch(doctorActions.clear());
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
      <Appbar type={type}>
        <Grid container spacing={2} style={{ padding: "1rem" }}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" style={{ margin: "1rem" }}>
              Add Question
            </Typography>
            <Typography
              variant="h5"
              align="left"
              style={{ margin: "1rem 0 1rem 0" }}
            >
              Question Statement
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Statement"
              id="statement"
              value={statement}
              onChange={(event) => onStatementChange(event)}
              style={{ margin: "0 0 1.5rem 0" }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ padding: "1rem" }}>
          <Grid item xs={12}>
            <Grid container>
              <Grid
                item
                xs={4}
                style={{ display: "flex", placeItems: "center" }}
              >
                First Option
              </Grid>
              <Grid
                item
                xs={8}
                style={{ display: "flex", placeItems: "center" }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Option"
                  value={option1}
                  id="option-1"
                  onChange={(event) => onOptionChange(event)}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container>
              <Grid
                item
                xs={4}
                style={{ display: "flex", placeItems: "center" }}
              >
                Second Option
              </Grid>
              <Grid
                item
                xs={8}
                style={{ display: "flex", placeItems: "center" }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Option"
                  value={option2}
                  id="option-2"
                  onChange={(event) => onOptionChange(event)}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container>
              <Grid
                item
                xs={4}
                style={{ display: "flex", placeItems: "center" }}
              >
                Third Option
              </Grid>
              <Grid
                item
                xs={8}
                style={{ display: "flex", placeItems: "center" }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Option"
                  value={option3}
                  id="option-3"
                  onChange={(event) => onOptionChange(event)}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container>
              <Grid
                item
                xs={4}
                style={{ display: "flex", placeItems: "center" }}
              >
                Fourth Option
              </Grid>
              <Grid
                item
                xs={8}
                style={{ display: "flex", placeItems: "center" }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Option"
                  value={option4}
                  id="option-4"
                  onChange={(event) => onOptionChange(event)}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={submitHandler}
              >
                Submit
              </Button>
            </div>
          </Grid>
        </Grid>
      </Appbar>
    </>
  );
};

export default AddQuestion;
