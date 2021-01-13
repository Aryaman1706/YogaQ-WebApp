import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button, Grid, makeStyles } from "@material-ui/core";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import LandingImg from "../../assets/landing.jpg";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    minHeight: "calc(100vh - 70px)",
    overflow: "hidden",
  },
  img: {
    position: "absolute",
    right: 0,
    height: "calc(100vh - 70px)",
    objectFit: "contain",
    clipPath: "polygon(100% 0%, 100% 51%, 100% 100%, 25% 100%, 0% 50%, 25% 0%)",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  primaryContainer: {
    display: "grid",
    placeItems: "center",
    height: "calc(100vh - 70px)",
    // textAlign: "center",
    // alignItems: "center",
  },
  primaryText: {
    fontFamily: "Quarto, sans-serif",
    fontSize: "4rem",
    fontWeight: "900",
    lineHeight: "3.6rem",
    whiteSpace: "pre-line",
    letterSpacing: "-3px",
    color: "#27325a",
    [theme.breakpoints.down("md")]: {
      fontSize: "2.6rem",
      textAlign: "center",
      letterSpacing: "-1px",
    },
  },
  gradientText: {
    background: "-webkit-linear-gradient(-70deg,#a2facf,#64acff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.only("lg")]: {
      paddingLeft: "1rem",
    },
  },
  btn2: {
    marginLeft: "0.5rem",
    padding: "0.5rem",
    border: "1px solid #0FC1A7",
    color: "#0FC1A7",
    transition: "ease-out 0.5s",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    "&:before": {
      width: "0%",
      height: "100%",
      top: "0",
      left: "0",
    },
    "&:hover": {
      boxShadow: "inset 400px 0 0 0 #0FC1A7",
      color: "#fff",
    },
  },
  btnContainer: {
    marginTop: "2rem",
    [theme.breakpoints.down("md")]: {
      margin: "auto",
      marginTop: "2rem",
    },
  },
}));

const fadeRight = keyframes`
    from {
        transform: translate3d(-20px,0,0);
        display: none;
    }
    to {
        transform: translate3d(0,0,0);
    }
`;

const StyledButton = styled(Button)`
  padding: 0.5rem 2rem 0.5rem 2rem;
  background-color: #0fc1a7;
  color: #fff;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.2s ease-out;
  svg {
    display: none;
  }
  &:hover {
    opacity: 0.8;
    background-color: #0fc1a7;
    svg {
      display: block;
      animation: ${fadeRight};
      animation-duration: 0.2s;
      animation-fill-mode: both;
      animation-timing-function: ease-in-out;
    }
  }
`;

const Landing = () => {
  const classes = useStyles();
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={7} xl={7} className={classes.primaryContainer}>
          <div className={classes.flexColumn}>
            <span className={classes.primaryText} data-aos="fade-left">
              A Happier, Healthier you with{" "}
              <span className={classes.gradientText}>YogaQ</span>.
            </span>
            <div className={classes.btnContainer}>
              <StyledButton
                variant="contained"
                href={`${process.env.REACT_APP_SERVER_URL}/api/user/auth`}
                data-aos="zoom-out-up"
                data-aos-delay="200"
              >
                Get Started&nbsp;
                <KeyboardArrowRightIcon />
              </StyledButton>
              {/* <Button className={classes.btn2}>Sign in as Therapist</Button> */}
            </div>
          </div>
        </Grid>
        <Grid item lg={5} xl={5}>
          <img src={LandingImg} alt="main-img" className={classes.img} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
