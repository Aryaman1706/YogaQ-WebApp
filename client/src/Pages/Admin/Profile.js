import React from "react";
import Edit from "../../Components/Admin/Edit";
import ChangePassword from "../../Components/Admin/ChangePassword";
import { Grid, makeStyles, Paper, Toolbar } from "@material-ui/core";
import { useSelector } from "react-redux";
import background from "../../assets/background.svg";
import AdminAppbar from "../../Components/Common/Appbar";
import AdminLayout from "../../layout/AdminLayout";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundAttachment: "fixed",
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

const Profile = () => {
  const classes = useStyles();
  const { loading } = useSelector((state) => state.admin);
  return (
    <>
      <AdminAppbar type={"admin"}>
        <AdminLayout>
          {loading ? null : (
            <>
              <div className={classes.container}>
                <Grid container item xs={12} sm={12} lg={12} justify="center">
                  <Grid item xs={6}>
                    <Paper elevation={8} className={classes.paper}>
                      <Edit />
                      <Toolbar />
                      <ChangePassword />
                    </Paper>
                  </Grid>
                </Grid>
              </div>
            </>
          )}
        </AdminLayout>
      </AdminAppbar>
    </>
  );
};

export default Profile;
