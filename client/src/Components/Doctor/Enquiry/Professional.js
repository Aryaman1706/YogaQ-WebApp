import React, { Fragment } from "react";
import {
  TextField,
  Grid,
  IconButton,
  Tooltip,
  makeStyles,
} from "@material-ui/core";
import { Add, AttachFile, Remove } from "@material-ui/icons";
import { v4 as uuidV4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
}));

const Professional = ({
  prof,
  setProf,
  files,
  setFiles,
  expertise,
  setExpertise,
}) => {
  const classes = useStyles();

  const addRow = (e) => {
    setProf((prev) => {
      return [...prev, { place: "", clients: 0, noOfYears: 0, doc: uuidV4() }];
    });
  };

  const removeRow = (e, i, uuid) => {
    setProf((prev) => {
      prev.splice(i, 1);
      return [...prev];
    });

    setFiles((prev) => {
      delete prev[uuid];
      return { ...prev };
    });
  };

  const profChange = (e, i) => {
    setProf((prev) => {
      prev[i][e.target.id] = e.target.value;
      return [...prev];
    });
  };

  const fileChange = (e, uuid) => {
    setFiles((prev) => {
      return { ...prev, [uuid]: e.target.files[0] };
    });
  };

  const handleExp = (e) => {
    setExpertise(e.target.value);
  };

  return (
    <>
      <Grid item>
        {prof.map((obj, index) => {
          return (
            <Fragment key={index}>
              <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="stretch"
              >
                <Grid item xs={11}>
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="flex-start"
                    alignItems="stretch"
                  >
                    <Grid item xs={5}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Place"
                        id="place"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={obj.place}
                        onChange={(event) => profChange(event, index)}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        fullWidth
                        type="number"
                        variant="outlined"
                        label="Clients"
                        id="clients"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={obj.clients}
                        onChange={(event) => profChange(event, index)}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        fullWidth
                        type="number"
                        variant="outlined"
                        label="Years"
                        id="noOfYears"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={obj.noOfYears}
                        onChange={(event) => profChange(event, index)}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <input
                        type="file"
                        className={classes.input}
                        id={obj.doc}
                        onChange={(event) => fileChange(event, obj.doc)}
                      />
                      <Tooltip title="Add Document" placement="top" arrow>
                        {/*  */}
                        <label htmlFor={obj.doc}>
                          <IconButton component="span">
                            <AttachFile />
                          </IconButton>
                        </label>
                        {/*  */}
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={1}>
                  {index === prof.length - 1 ? (
                    <IconButton onClick={(event) => addRow(event)}>
                      <Add />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={(event) => removeRow(event, index, obj.doc)}
                    >
                      <Remove />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            </Fragment>
          );
        })}
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          variant="outlined"
          label="Expertise"
          id="expertise"
          value={expertise}
          onChange={(event) => handleExp(event)}
        />
      </Grid>
    </>
  );
};

export default Professional;
