import React, { Fragment, useState } from "react";
import {
  TextField,
  Grid,
  IconButton,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Checkbox,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import { Add, Remove, AttachFile } from "@material-ui/icons";
import { v4 as uuidV4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
}));

const QualificationalInfo = () => {
  const classes = useStyles();

  const [edu, setEdu] = useState({
    certificate: false,
    diploma: false,
    degree: false,
    graduation: false,
    phd: false,
  });
  const [docs, setDocs] = useState([
    { name: "", institute: "", doc: uuidV4() },
  ]);
  const [files, setFiles] = useState({});

  const handleEdu = (e) => {
    setEdu((prev) => {
      return { ...prev, [e.target.id]: e.target.checked };
    });
  };

  const attachFile = (e, uuid) => {
    const fileInput = document.getElementById(uuid);
    fileInput.click();
  };

  const addRow = (event) => {
    setDocs((prev) => {
      return [...prev, { name: "", institute: "", doc: uuidV4() }];
    });
  };

  const removeRow = (e, i, uuid) => {
    setDocs((prev) => {
      prev.splice(i, 1);
      return [...prev];
    });
    setFiles((prev) => {
      delete prev[uuid];
      return { ...prev };
    });
  };

  const docChange = (e, i) => {
    setDocs((prev) => {
      prev[i][e.target.id] = e.target.value;
      return [...prev];
    });
  };

  const fileChange = (e, uuid) => {
    setFiles((prev) => {
      return { ...prev, [uuid]: e.target.files[0] };
    });
  };

  const print = (e) => {
    console.log(edu);
  };

  return (
    <>
      <Grid item>
        <FormControl>
          <FormLabel>Educational Qualification</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={edu.certificate}
                  onChange={(event) => handleEdu(event)}
                  id="certificate"
                />
              }
              label="Certificate"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={edu.diploma}
                  onChange={(event) => handleEdu(event)}
                  id="diploma"
                />
              }
              label="Diploma"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={edu.degree}
                  onChange={(event) => handleEdu(event)}
                  id="degree"
                />
              }
              label="Degree"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={edu.graduation}
                  onChange={(event) => handleEdu(event)}
                  id="graduation"
                />
              }
              label="Graduation"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={edu.phd}
                  onChange={(event) => handleEdu(event)}
                  id="phd"
                />
              }
              label="PhD"
            />
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item>
        {docs.map((obj, index) => {
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
                        label="Name"
                        id="name"
                        value={obj.name}
                        onChange={(event) => docChange(event, index)}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Institute"
                        id="institute"
                        value={obj.institute}
                        onChange={(event) => docChange(event, index)}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <input
                        type="file"
                        id={obj.doc}
                        className={classes.input}
                        onChange={(event) => fileChange(event, obj.doc)}
                      />
                      <Tooltip title="Add Document" placement="top" arrow>
                        <IconButton
                          onClick={(event) => attachFile(event, obj.doc)}
                        >
                          <AttachFile />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={1}>
                  {index === docs.length - 1 ? (
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
        <Button fullWidth onClick={(event) => print(event)}>
          Print Edu
        </Button>
      </Grid>
      <Grid item>
        <Button fullWidth onClick={(event) => console.log(docs)}>
          Print DOcs
        </Button>
      </Grid>
      <Grid item>
        <Button fullWidth onClick={(event) => console.log(files)}>
          Print Files
        </Button>
      </Grid>
    </>
  );
};

export default QualificationalInfo;
