import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ProfileIcon from "../../assets/profile.svg";
import LogoutIcon from "../../assets/log-out.svg";
import { useDispatch } from "react-redux";
import { logoutDoctor } from "../../redux/actions/doctorActions";

const DoctorAppbarExt = ({ classes, StyledMenu }) => {
  const [, setAnchorEl] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const doctorLogOut = async () => {
    await dispatch(logoutDoctor());
    history.push("/");
  };

  return (
    <>
      <div
        className={`${classes.flexRow} ${classes.paddingMenuItem}`}
        onClick={() => {
          history.push("/edit");
          setAnchorEl(null);
        }}
      >
        <div>
          <img
            src={ProfileIcon}
            alt="profile-icon"
            className={classes.profileIcon}
          />
        </div>
        <div className={classes.menuitem}>Profile</div>
      </div>
      <div
        className={`${classes.flexRow} ${classes.paddingMenuItem}`}
        onClick={() => {
          doctorLogOut();
          setAnchorEl(null);
        }}
      >
        <div>
          <img
            src={LogoutIcon}
            alt="profile-icon"
            className={classes.profileIcon}
          />
        </div>
        <div className={classes.menuitem}>Log out</div>
      </div>
    </>
  );
};

export default DoctorAppbarExt;
