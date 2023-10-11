import React, { Component } from "react";
import "./NavBar.css";
import Grid from "@material-ui/core/Grid";
import home from "../../Images/home.png";
import camera from "../../Images/camera.png";
import Avatar from "@material-ui/core/Avatar";
import Profile from "../../Images/pp1.png";
import Logout from "../../Images/logout.webp";


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { selectedPage, onPageChange, onSignOut } = this.props;
    const avatarData = JSON.parse(localStorage.getItem("avatarData"));
    const avatarUrl = avatarData ? avatarData.objectUrl : null;

    return (
      <div>
        <div className="navbar_barContent">
          <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={3}>
              <h2 className="navbar_logo">Photogram</h2>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={4} style={{ display: "flex" }}>
              <img
                className={`navbar_img ${
                  selectedPage === "home" ? "active" : ""
                }`}
                src={home}
                width="25"
                height="25"
                onClick={() => onPageChange("home")}
              />
              <img
                className={`navbar_img ${
                  selectedPage === "challenges" ? "active" : ""
                }`}
                src={camera}
                width="25"
                height="25"
                onClick={() => onPageChange("challenges")}
              />
              {avatarUrl ? (
                <Avatar
                  className={`navbar_img ${
                    selectedPage === "profile" ? "active" : ""
                  }`}
                  src={avatarUrl}
                  style={{ maxWidth: "25px", maxHeight: "25px" }}
                  onClick={() => onPageChange("profile")}
                />
              ) : (
                <Avatar
                  className={`navbar_img ${
                    selectedPage === "profile" ? "active" : ""
                  }`}
                  src={null}
                  style={{ maxWidth: "25px", maxHeight: "25px" }}
                  onClick={() => onPageChange("profile")}
                />
              )}
              <img
                className="navbar_logout"
                src={Logout}
                alt="Logout"
                onClick={onSignOut}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default NavBar;
