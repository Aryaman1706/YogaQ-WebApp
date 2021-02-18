import React, { useState, useEffect } from "react";
import { Button, Grid, Paper, Typography, makeStyles } from "@material-ui/core";
import Loader from "../../Common/Loader";
import Swal from "sweetalert2";
import { v4 as uuidV4 } from "uuid";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { enquiry } from "../../../redux/actions";
import BasicInfo from "./BasicInfo";
import QualificationalInfo from "./QualificationalInfo";
import Professional from "./Professional";
import background from "../../../assets/background.svg";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundAttachment: "fixed",
  },
  btn: {
    backgroundColor: "#0FC1A7",
    height: "50px",
    backgroundImage: "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
  },
  paper: {
    padding: 50,
    marginTop: "6rem",
    [theme.breakpoints.only("xs")]: {
      padding: 10,
      marginTop: "1rem",
    },
  },
}));

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
  const classes = useStyles();
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
  const history = useHistory();
  const [compLoading, setCompLoading] = useState(false);

  const submitHandler = () => {
    setCompLoading(true);
  };

  useEffect(() => {
    return () => {
      dispatch(enquiry.clear());
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (/Validation Error*/i.test(error)) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error Occured.",
        text: `${error}`,
        showConfirmButton: true,
        timer: 1500,
      });
    }
    if (/Thank you*/i.test(message)) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success!",
        text: `${message}`,
        showConfirmButton: true,
        timer: 1500,
      }).then(() => {
        history.push("/");
      });
    }
    // eslint-disable-next-line
  }, [error, message]);

  const submit = async () => {
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

    // * Appending 8Professional
    formData.append("professional", JSON.stringify(prof));

    // * Appending Expertise
    formData.append("expertise", expertise);

    // * Appending files
    Object.keys(files).forEach((item) => {
      formData.append(item, files[item]);
    });

    await dispatch(enquiry.createEnquiry(formData));
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
      <div className={classes.container}>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="stretch"
        >
          <Grid item xs={11} sm={10} lg={6}>
            <Paper elevation={8} className={classes.paper}>
              <Grid
                container
                direction="column"
                justify="space-around"
                alignItems="stretch"
                spacing={2}
              >
                <Grid item>
                  <Typography
                    variant="h4"
                    align="center"
                    style={{ fontWeight: "600" }}
                  >
                    Be a Partner
                  </Typography>
                </Grid>
                {compLoading ? (
                  <Loader />
                ) : (
                  <>
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
                        className={classes.btn}
                        color="primary"
                        onClick={() => submitHandler()}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default NewEnquiry;
