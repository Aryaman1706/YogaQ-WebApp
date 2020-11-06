import React, { Fragment } from "react";
import {
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";

const BasicInfo = ({ langs, setLangs, state, setState }) => {
  const changeHandler = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const genderHandler = (e) => {
    setState((prev) => {
      return { ...prev, gender: e.target.value };
    });
  };

  const addLang = (e) => {
    setLangs((prev) => {
      return [...prev, ""];
    });
  };

  const removeLang = (e, i) => {
    setLangs((prev) => {
      prev.splice(i, 1);
      return [...prev];
    });
  };

  const handleLang = (e, i) => {
    setLangs((prev) => {
      prev[i] = e.target.value;
      return [...prev];
    });
  };

  return (
    <>
      <Grid item>
        <TextField
          fullWidth
          variant="outlined"
          label="User Name"
          id="username"
          value={state.username}
          onChange={(event) => changeHandler(event)}
        />
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          variant="outlined"
          label="Phone Number"
          id="phoneNumber"
          value={state.phoneNumber}
          onChange={(event) => changeHandler(event)}
        />
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          variant="outlined"
          label="Age"
          id="age"
          type="number"
          value={state.age}
          onChange={(event) => changeHandler(event)}
        />
      </Grid>
      <Grid item>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="genderSelect">Gender</InputLabel>
          <Select
            labelId="genderSelect"
            label="Gender"
            value={state.gender}
            onChange={(event) => genderHandler(event)}
          >
            <MenuItem value="select">Select</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          variant="outlined"
          label="Country"
          id="country"
          value={state.country}
          onChange={(event) => changeHandler(event)}
        />
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="stretch"
          spacing={2}
        >
          {langs.map((item, index) => {
            return (
              <Fragment key={index}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Language"
                    value={item}
                    onChange={(event) => handleLang(event, index)}
                    InputProps={{
                      endAdornment:
                        langs.length - index === 1 && index > 0 ? (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={(event) => removeLang(event, index)}
                            >
                              <Remove />
                            </IconButton>
                          </InputAdornment>
                        ) : null,
                    }}
                  />
                </Grid>
              </Fragment>
            );
          })}
          <Grid item xs={4}>
            <IconButton onClick={(event) => addLang(event)}>
              <Add />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          multiline
          variant="outlined"
          label="Description"
          id="description"
          value={state.description}
          onChange={(event) => changeHandler(event)}
        />
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          variant="outlined"
          label="Email Address"
          id="email"
          type="email"
          value={state.email}
          onChange={(event) => changeHandler(event)}
        />
      </Grid>
    </>
  );
};

export default BasicInfo;
