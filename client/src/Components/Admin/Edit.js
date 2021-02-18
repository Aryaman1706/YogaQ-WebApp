import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Swal from "sweetalert2";
import Loader from "../Common/Loader";
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
  const [compLoading, setCompLoading] = useState(false);
  const { admin, error, message } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    setUser({
      username: admin.username,
      email: admin.email,
      welcomeMessage: admin.welcomeMessage ? admin.welcomeMessage : "",
    });
    return () => {
      dispatch(adminActions.clear());
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
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

    if (/Changes to profile changed successfully.*/i.test(message)) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success!",
        text: message,
        showConfirmButton: true,
        timer: 1500,
      });
    }
    // eslint-disable-next-line
  }, [error, message]);
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
      setCompLoading(true);
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Invalid Credentials.",
        text: "Enter valid data",
        showConfirmButton: true,
        timer: 1500,
      });
    }
  };

  const submit = async () => {
    const formData = new FormData();
    if (file) {
      console.log(file, typeof file);
      formData.append("profilePicture", file);
    }
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("welcomeMessage", user.welcomeMessage);
    await dispatch(adminActions.editAdmin(formData));
    setCompLoading(false);
  };

  useEffect(() => {
    if (compLoading) {
      submit();
    }
    // eslint-disable-next-line
  }, [compLoading]);

  return (
    <>
      <Grid container direction="row" justify="center" alignItems="stretch">
        <Grid item xs={8} lg={12}>
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
            {compLoading ? (
              <Loader />
            ) : (
              <>
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
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Edit;
