import React, { useState, useEffect } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import Swal from "sweetalert2";
import { v4 as uuidV4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { enquiry } from "../../../redux/actions";
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
  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.enquiry);

  const submitHandler = () => {
    // * Generating Form Data
    const formData = new FormData();

    // * Appending State
    Object.keys(state).forEach((item) => {
      formData.append(`${item}`, state[item]);
    });

    // * Appending Languages
    formData.append("languages", JSON.stringify(langs));

    // * Appending Qualification
    const education = Object.keys(edu).filter((item) => {
      return edu[item];
    });
    const qualificational = {
      educationalQualification: [...education],
      docs: [...docs],
    };
    formData.append("qualificational", JSON.stringify(qualificational));

    // * Appending Professional
    formData.append("professional", JSON.stringify(prof));

    // * Appending Expertise
    formData.append("expertise", expertise);

    // * Appending files
    Object.keys(files).forEach((item) => {
      formData.append(item, files[item]);
    });
    
    dispatch(enquiry.createEnquiry(formData));
  };

  useEffect(() => {
    if (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error Occured.",
        text: `${error}`,
        showConfirmButton: true,
        timer: 1500,
      });
    }
    if (message) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success!",
        text: `${message}`,
        showConfirmButton: true,
        timer: 1500,
      });
    }
    return () => {
      dispatch(enquiry.clearErrors());
    };
    // eslint-disable-next-line
  }, [error, message]);

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
                onClick={(event) => submitHandler()}
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
