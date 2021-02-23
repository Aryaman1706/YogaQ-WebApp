import React, { useState } from "react";
import { Button, IconButton, Divider, Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { format } from "date-fns";
import ProfileIcon from "../../assets/profile.svg";
import Profile from "../../assets/user.svg";
import LogoutIcon from "../../assets/log-out.svg";
import { useSelector, useDispatch } from "react-redux";
import { admin as adminActions } from "../../redux/actions";

const AdminAppbarExt = ({ classes, StyledMenu }) => {
  const { isAuthenticated, admin } = useSelector((state) => state.admin);
  const history = useHistory();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isAuthenticated && admin ? (
        <>
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
                    <div className={classes.profileName}>{admin.username}</div>
                    <div className={classes.profileJoin}>
                      Joined {format(new Date(admin.createdAt), "MMM dd, yyyy")}
                    </div>
                  </div>
                </div>
                <Divider />
                <br />
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
                    dispatch(adminActions.logoutAdmin());
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
        </>
      ) : (
        <>
          <Button
            className={classes.btn}
            onClick={() => {
              history.push("/admin/login");
            }}
          >
            Login as Admin
          </Button>
        </>
      )}
    </>
  );
};

export default AdminAppbarExt;
