import React from "react";
import { useHistory } from "react-router-dom";
import ProfileIcon from "../../assets/profile.svg";
import LogoutIcon from "../../assets/log-out.svg";
import { doctor as doctorActions } from "../../redux/actions/index";
import { useDispatch } from "react-redux";

const ChatroomAppbarExt = ({ classes }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <>
      <div
        className={`${classes.flexRow} ${classes.paddingMenuItem}`}
        onClick={() => {
          history.push("/doctor/calls");
        }}
      >
        <div>
          <img
            src={ProfileIcon}
            alt="profile-icon"
            className={classes.profileIcon}
          />
        </div>
        <div className={classes.menuitem}>Dashboard</div>
      </div>
      <div
        className={`${classes.flexRow} ${classes.paddingMenuItem}`}
        onClick={() => {
          history.push("/doctor/profile");
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
          dispatch(doctorActions.logoutDoctor());
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

export default ChatroomAppbarExt;
