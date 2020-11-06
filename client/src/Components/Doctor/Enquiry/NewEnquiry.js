import React, { useState } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { v4 as uuidV4 } from "uuid";
import BasicInfo from "./BasicInfo";
import QualificationalInfo from "./QualificationalInfo";
import Professional from "./Professional";

const NewEnquiry = () => {
  // Basic Info
  const [langs, setLangs] = useState([""]);
  const [state, setState] = useState({
    username: "",
    phoneNumber: "",
    age: 0,
    gender: "select",
    country: "",
    description: "",
    email: "",
  });

  // Qualificational Info
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

  // Professional Info
  const [prof, setProf] = useState([
    { place: "", clients: 0, noOfYears: 0, doc: uuidV4() },
  ]);
  const [expertise, setExpertise] = useState("");

  const printFormData = (event) => {
    const education = Object.keys(edu).filter((item) => {
      return edu[item];
    });
    const obj = {
      ...state,
      languages: [...langs],
      qualificational: {
        educationalQualification: [...education],
        docs: [...docs],
      },
      professional: [...prof],
      expertise: expertise,
    };

    console.log(obj, files);
  };

  // const helper = (e) => {
  //   const docFiles = docs.map((item) => {
  //     return { ...item, file: files[item.doc]?.name };
  //   });
  //   const profFiles = prof.map((item) => {
  //     return { ...item, file: files[item.doc]?.name };
  //   });

  //   console.log({ docFiles, profFiles });
  // };

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
                Be a Partner
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" align="center">
                Personal Details
              </Typography>
            </Grid>
            <BasicInfo
              langs={langs}
              state={state}
              setLangs={setLangs}
              setState={setState}
            />
            <Grid item>
              <Typography variant="h5" align="center">
                Qualificational Details
              </Typography>
            </Grid>
            <QualificationalInfo
              edu={edu}
              docs={docs}
              files={files}
              setEdu={setEdu}
              setDocs={setDocs}
              setFiles={setFiles}
            />
            <Grid item>
              <Typography variant="h5" align="center">
                Professional Details
              </Typography>
            </Grid>
            <Professional
              prof={prof}
              files={files}
              expertise={expertise}
              setProf={setProf}
              setFiles={setFiles}
              setExpertise={setExpertise}
            />
            <Grid item>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={(event) => printFormData(event)}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} lg={4}></Grid>
      </Grid>
    </>
  );
};

export default NewEnquiry;
