import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { admin as adminActions } from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
  profile: {
    display: "block",
    height: "200px",
    width: "200px",
    objectFit: "cover",
    maxWidth: "100%",
    margin: "auto",
    borderRadius: "50%",
  },
  container: {
    display: "flex",
    justifyContent: "center",
  },
}));

const Edit = () => {
  const classes = useStyles();
  const [user, setUser] = useState({
    username: "",
    email: "",
    welcomeMessage: "",
  });
  const [file, setFile] = useState(null);
  const { admin, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    setUser({
      username: admin.username,
      email: admin.email,
      welcomeMessage: admin.welcomeMessage ? admin.welcomeMessage : "",
    });
    if (/^Validation Error*/i.test(error)) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error Occured.",
        text: `${error}`,
        showConfirmButton: true,
        timer: 1500,
      });
    }
    return () => {
      dispatch(adminActions.errorAdmin());
    };
    // eslint-disable-next-line
  }, [admin, error]);
  const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/gi;

  const changeHandler = (event) => {
    setUser((prev) => {
      return { ...prev, [event.target.id]: event.target.value };
    });
  };

  const fileHandler = (event) => {
    setFile(event.target.files[0]);
  };

  const submitHandler = (event) => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.welcomeMessage.length > 0 &&
      user.email.length < 150 &&
      emailRegex.test(user.email) &&
      user.username.length >= 5 &&
      user.username.length <= 40 &&
      user.welcomeMessage.length <= 500
    ) {
      const formData = new FormData();
      if (file) {
        console.log(file, typeof file);
        formData.append("profilePicture", file);
      }
      formData.append("username", user.username);
      formData.append("email", user.email);
      formData.append("welcomeMessage", user.welcomeMessage);
      dispatch(adminActions.editAdmin(formData));
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Invalid Credentials.",
        text: "Enter valid email and password.",
        showConfirmButton: true,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <Grid container direction="row" justify="center" alignItems="stretch">
        <Grid item xs={2} lg={4}></Grid>
        <Grid item xs={8} lg={4}>
          <Grid
            container
            direction="column"
            justify="space-around"
            alignItems="stretch"
            spacing={2}
          >
            <Grid item>
              <Typography variant="h4" align="center">
                Edit Profile
              </Typography>
            </Grid>
            <Grid item>
              <img
                src={admin.profilePicture}
                alt="profile"
                className={classes.profile}
              />
              <div className={classes.container}>
                <input
                  accept="image/*"
                  id="profilePicture"
                  type="file"
                  onChange={(event) => {
                    fileHandler(event);
                  }}
                />
              </div>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="UserName"
                id="username"
                variant="outlined"
                value={user.username}
                onChange={(event) => changeHandler(event)}
                error={
                  user.username.length > 0 &&
                  (user.username.length < 5 || user.username.length > 40)
                }
                helperText={
                  user.username.length > 0 &&
                  (user.username.length < 5 || user.username.length > 40)
                    ? "UserName must be between 5 and 40 characters."
                    : null
                }
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="Email Address"
                id="email"
                variant="outlined"
                value={user.email}
                onChange={(event) => changeHandler(event)}
                error={
                  user.email.length > 0 &&
                  (user.email.length > 150 || !emailRegex.test(user.email))
                }
                helperText={
                  user.email.length > 0 &&
                  (user.email.length > 150 || !emailRegex.test(user.email))
                    ? "Enter Valid Email Address."
                    : null
                }
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                multiline
                label="Welcome Message"
                id="welcomeMessage"
                variant="outlined"
                value={user.welcomeMessage}
                onChange={(event) => changeHandler(event)}
                error={
                  user.welcomeMessage.length > 0 &&
                  user.welcomeMessage.length > 500
                }
                helperText={
                  user.welcomeMessage.length > 0 &&
                  user.welcomeMessage.length > 500
                    ? "Welcome Message must be less than 200 characters."
                    : null
                }
              />
            </Grid>
            <Grid item>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={(event) => submitHandler(event)}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} lg={4}></Grid>
      </Grid>
    </>
  );
};

export default Edit;
