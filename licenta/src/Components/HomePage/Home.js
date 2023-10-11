import React, { Component } from "react";
import NavBar from "../NavBar/NavBar";
import MainContent from "../MainContent/MainContent";
import Profile from "../Profile/Profile";
import ChallengePage from "../ChallengePage/ChallengePage";
import "./Home.css"

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: "home",
      challengeData: [], 
      avatarData: null,
    };
  }

  componentDidMount() {
    this.fetchChallengeData(); 
    this.fetchAvatarData();
  }

  fetchChallengeData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8222/api/challenges`
      );
      const data = await response.json();
      this.setState({ challengeData: data });
      localStorage.setItem("challengeData", JSON.stringify(data)); // Save challengeData to localStorage
    } catch (error) {
      console.log("Error fetching challenge data:", error);
    }
  };

  fetchAvatarData = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("users")).uid; // Retrieve the user's ID from local storage
      const response = await fetch(`http://localhost:8222/api/avatars/get-avatar-by/${userId}`);
      const data = await response.json();
      this.setState({ avatarData: data });
      localStorage.setItem("avatarData", JSON.stringify(data)); // Save avatarData to local storage
    } catch (error) {
      console.log("Error fetching avatar data:", error);
    }
  };

  handlePageChange = (page) => {
    this.setState({ selectedPage: page });
  };

  handleSignOut = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  render() {
    const { selectedPage, avatarData } = this.state;

    // Check if avatarData is null or undefined
    const avatarUrl = avatarData?.objectUrl || ""; 

    return (
      <div>
        <NavBar
          className="navbar"
          selectedPage={selectedPage}
          onPageChange={this.handlePageChange}
          onSignOut={this.handleSignOut}
          avatarUrl={avatarUrl} // Pass the avatarUrl as a prop to NavBar
        />
        {selectedPage === "home" && <MainContent />}
        {selectedPage === "profile" && <Profile />}
        {selectedPage === "challenges" && <ChallengePage />}
      </div>
    );
  }
}

export default Home;
