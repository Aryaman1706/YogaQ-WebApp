import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@material-ui/core";
import Loader from "../../Loader";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { admin as adminActions } from "../../../redux/actions/index";

const CreateChatroom = () => {
  const [details, setDetails] = useState({
    user: "",
    partner: "",
    partnerModel: "Doctor",
  });
  const { error, message } = useSelector((state) => state.admin);
  const [compLoading, setCompLoading] = useState(false);
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setDetails((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };
  const selectHandler = (e) => {
    setDetails((prev) => {
      return {
        ...prev,
        partnerModel: e.target.value,
      };
    });
  };

  useEffect(() => {
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
        text: error,
        showConfirmButton: true,
        timer: 1500,
      });
    }
    if (/^ChatRoom created succesfully*/i.test(message)) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success",
        text: message,
        showConfirmButton: true,
        timer: 1500,
      }).then(() => {
        setDetails({
          user: "",
          partner: "",
          partnerModel: "Doctor",
        });
      });
    }
  }, [error, message]);

  const submitHandler = (e) => {
    Swal.fire({
      position: "center",
      icon: "question",
      title: "Are You Sure?",
      showConfirmButton: true,
      showDenyButton: true,
      backdrop: true,
    }).then((result) => {
      if (!result.isDenied) {
        setCompLoading(true);
      }
    });
  };

  const submit = async () => {
    await dispatch(adminActions.createChatroom({ ...details, blocked: false }));
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
                Create Chatroom
              </Typography>
            </Grid>
            {compLoading ? (
              <Loader />
            ) : (
              <>
                <Grid item>
                  <Typography variant="h6" align="left">
                    User Details
                  </Typography>
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="User Email Id"
                    id="user"
                    value={details.user}
                    onChange={(event) => changeHandler(event)}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h6" align="left">
                    Partner Details
                  </Typography>
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Partner Email Id"
                    id="partner"
                    value={details.partner}
                    onChange={(event) => changeHandler(event)}
                  />
                </Grid>
                <Grid item>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="partnerModel">Role</InputLabel>
                    <Select
                      labelId="partnerModel"
                      id="partnerModel"
                      value={details.partnerModel}
                      onChange={(event) => selectHandler(event)}
                    >
                      <MenuItem value="Doctor">Doctor</MenuItem>
                      <MenuItem value="Admin">Admin</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={(event) => submitHandler(event)}
                  >
                    Create
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
        <Grid item xs={2} lg={4}></Grid>
      </Grid>
    </>
  );
};

export default CreateChatroom;
