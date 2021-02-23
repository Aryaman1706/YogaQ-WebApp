import React, { useState } from "react";
import { IconButton, Divider, Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import ProfileIcon from "../../assets/profile.svg";
import Profile from "../../assets/user.svg";
import LogoutIcon from "../../assets/log-out.svg";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import SideDrawer from "../Landing/SideDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";

const UserAppbarExt = ({ classes, StyledMenu }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [sideDrawer, setSideDrawer] = useState(false);
  const history = useHistory();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const userLogOut = async () => {
    await dispatch(logoutUser());
    history.push("/");
  };

  return (
    <>
      {isAuthenticated && user ? (
        <>
          <IconButton
            aria-controls="menu"
            aria-haspopup="true"
            onClick={handleClick}
            className={classes.profile}
          >
            <AccountCircleOutlinedIcon />
          </IconButton>
          <StyledMenu
            id="menu"
            keepMounted
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            className={classes.menu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <div className={classes.menuFlex}>
              <div
                className={classes.flexRow}
                style={{ paddingBottom: "1rem" }}
              >
                <Avatar alt="Profile" src={Profile} />
                <div className={classes.profileFlex}>
                  <div className={classes.profileName}>{user.username}</div>
                  <div className={classes.profileJoin}>
                    Joined {format(new Date(user.createdAt), "MMM dd, yyyy")}
                  </div>
                </div>
              </div>
              <Divider />
              <br />
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
                  userLogOut();
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
            </div>
          </StyledMenu>
        </>
      ) : (
        <>
          <IconButton
            aria-controls="menu"
            aria-haspopup="true"
            onClick={() => {
              setSideDrawer(true);
            }}
            className={classes.menuIcon}
          >
            <MenuIcon />
          </IconButton>
          <SideDrawer sideDrawer={sideDrawer} setSideDrawer={setSideDrawer} />
        </>
      )}
    </>
  );
};

export default UserAppbarExt;
