import React from "react";
import { useHistory } from "react-router-dom";
import ProfileIcon from "../../assets/profile.svg";
import LogoutIcon from "../../assets/log-out.svg";
import StarIcon from "../../assets/star.svg";
import FileIcon from "../../assets/file-sharing.svg";
import PrivacyIcon from "../../assets/privacy-policy.svg";

const ChatroomAppbarExt = ({ classes, setAnchorEl }) => {
  const history = useHistory();

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
          history.push("/edit");
          setAnchorEl(null);
        }}
      >
        <div>
          <img src={StarIcon} alt="star-icon" className={classes.profileIcon} />
        </div>
        <div className={classes.menuitem}>Starred Messages</div>
      </div>
      <div
        className={`${classes.flexRow} ${classes.paddingMenuItem}`}
        onClick={() => {
          history.push("/edit");
          setAnchorEl(null);
        }}
      >
        <div>
          <img src={FileIcon} alt="file-icon" className={classes.profileIcon} />
        </div>
        <div className={classes.menuitem}>Shared Files</div>
      </div>
      <div
        className={`${classes.flexRow} ${classes.paddingMenuItem}`}
        onClick={() => {
          window.open("https://www.yogaqtherapy.com/privacy");
          setAnchorEl(null);
        }}
      >
        <div>
          <img
            src={PrivacyIcon}
            alt="policy-icon"
            className={classes.profileIcon}
          />
        </div>
        <div className={classes.menuitem}>Privacy Policy</div>
      </div>
      <div
        className={`${classes.flexRow} ${classes.paddingMenuItem}`}
        onClick={() => {
          // ! User logout
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

export default ChatroomAppbarExt;
