import React, { Component } from "react";
import "./Challenge.css";
import Grid from "@material-ui/core/Grid";
import bg from "../../Images/bg.jpeg";

class Challenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      image: null,
      description: "",
      uploadStatus: null
    };
  }

  handleImageChange = (e) => {
    this.setState({ file: e.target.files[0] });
    this.setState({ image: URL.createObjectURL(e.target.files[0]) });
  };

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { file, image, description } = this.state;
    const userId = JSON.parse(localStorage.getItem("users")).uid; // Retrieve userId from local storage
    const challengeId = JSON.parse(localStorage.getItem("challengeData")).id;

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("file", file);
    formData.append("description", description);
    formData.append("challengeId", challengeId);

    try {
      const response = await fetch("http://localhost:8222/api/posts/upload", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        // Handle successful upload
        console.log("Post uploaded successfully");
        this.setState({
          file: null,
          image: null,
          description: "",
          uploadStatus: "success",
        });
  
        // Call the callback function to trigger post refresh
        this.props.onPostUploadSuccess();
      } else {
        // Handle upload failure
        console.log("Failed to upload post");
        this.setState({ uploadStatus: "failure" });
      }
    } catch (error) {
      console.error("Error uploading post:", error);
    }
  };

  render() {
    const { file, image, description, uploadStatus } = this.state;
    const week = JSON.parse(localStorage.getItem("challengeData")).week;
    const challenge = JSON.parse(localStorage.getItem("challengeData")).challenge;
    return (
      <div>
        <div className="challenge_container">
          <img src={bg} className="backgroundimage" alt="Background" />
          <div className="challenge_content">
            <div className="content_challenge">{week}: {challenge}</div>
            <div className="challenge_form">
              <form onSubmit={this.handleSubmit}>
                <div>
                  <label htmlFor="image">Image:</label>
                  <br />
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={this.handleImageChange}
                  />
                  {image && (
                    <img
                      src={image}
                      alt="Preview"
                      style={{ maxWidth: "300px" }}
                    />
                  )}
                </div>
                <div>
                  <label htmlFor="description">Description:</label>
                  <br />
                  <textarea
                    id="description"
                    value={description}
                    onChange={this.handleDescriptionChange}
                  />
                </div>
                <button type="submit">Post</button>
              </form>
              {uploadStatus === "success" && (
                <p margin-left="50px">Upload successful!</p>
              )}
              {uploadStatus === "failure" && (
                <p>Upload failed. Please try again.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Challenge;
