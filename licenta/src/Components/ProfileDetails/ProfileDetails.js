import React, { Component } from "react";
import "./ProfileDetails.css";
import Grid from '@material-ui/core/Grid';
import { Avatar } from "@material-ui/core";
import profileimg from "../../Images/pp1.png";
import settings from "../../Images/settings.png";
import defaultAvatar from "../../Images/avatar.webp";

class ProfileDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      avatar: null,
      solved: 0,
    };
  }

  componentDidMount() {
    this.getUsername();
  }

  getUsername = () => {
    fetch("http://localhost:8222/api/users/get-user/" + JSON.parse(localStorage.getItem("users")).uid)
      .then(response => response.json())
      .then(data => {
        const name = data.name;
        const solved = data.solved;
        const avatarData = JSON.parse(localStorage.getItem("avatarData"));
        const avatar = avatarData ? avatarData.objectUrl : null;
        this.setState({ name, avatar, solved }); // Update the state with the avatar
      });
  };
  render() {
    const { name, avatar, solved } = this.state;

    return (
      <div>
        <div className="profiledetails_container">
          <div className="profiledetails_profile">
            <Avatar src={avatar} className="profileimage" />
          </div>

          <div className="profiledetails_details">
            <div className="profiledetails_username">
              <div>{name}</div>
            </div>
            <div className="profiledetails_data">
              <div>{solved} solved challenge(s)</div>
            </div>
            {/* <div className="profiledetails_about">
              <div className="about_text">A few words about what photography means to me</div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileDetails;
