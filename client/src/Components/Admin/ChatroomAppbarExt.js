import React from "react";
import { useHistory } from "react-router-dom";
import ProfileIcon from "../../assets/profile.svg";
import LogoutIcon from "../../assets/log-out.svg";

const ChatroomAppbarExt = ({ classes }) => {
  const history = useHistory();
  return (
    <>
      <div
        className={`${classes.flexRow} ${classes.paddingMenuItem}`}
        onClick={() => {
          history.push("/admin/enquiries");
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
          history.push("/admin/profile");
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
          // ! Admin Logout
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
