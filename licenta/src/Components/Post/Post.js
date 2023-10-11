import React, { Component } from "react";
import "./Post.css";
import Grid from "@material-ui/core/Grid";
import { Avatar } from "@material-ui/core";
import love from "../../Images/love.png";
import unlike from "../../Images/unlike.png";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentList: [],
      comment: "",
      liked: false,
      numberOfLikes: 0,
      avatar: null,
    };
  }

  componentDidMount() {
    this.getComments();
    this.hasUserLikedPost();
    this.getNumberOfLikes();
    this.getAvatar();
  }

  getAvatar = () => {
    const userId = this.props.userId;
    fetch(`http://localhost:8222/api/avatars/get-avatar-by/${userId}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error fetching avatar data");
        }
      })
      .then(data => {
        this.setState({ avatar: data });
      })
      .catch(error => {
        console.error(error);
      });
  };

  hasUserLikedPost = () => {
    const userId = JSON.parse(localStorage.getItem("users")).uid;
    const postId = this.props.id;
    fetch(`http://localhost:8222/api/likes?userId=${userId}&postId=${postId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ liked: data });
      })
      .catch(error => {
        console.error(error);
      });
  };

  getNumberOfLikes = () => {
    const postId = this.props.id;
    fetch(`http://localhost:8222/api/likes/number?postId=${postId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ numberOfLikes: data });
      })
      .catch(error => {
        console.error(error);
      });
  };

  handleLike = () => {
    const userId = JSON.parse(localStorage.getItem("users")).uid;
    const postId = this.props.id;
    if (this.state.liked) {
      // User unlikes the post
      fetch(`http://localhost:8222/api/likes/delete?userId=${userId}&postId=${postId}`, {
        method: "DELETE"
      })
        .then(response => {
          if (response.ok) {
            this.setState(prevState => ({
              liked: false,
              numberOfLikes: prevState.numberOfLikes - 1
            }));
          }
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      // User likes the post
      fetch(`http://localhost:8222/api/likes/add?userId=${userId}&postId=${postId}`, {
        method: "POST"
      })
        .then(response => {
          if (response.ok) {
            this.setState(prevState => ({
              liked: true,
              numberOfLikes: prevState.numberOfLikes + 1
            }));
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  getComments = () => {
    fetch("http://localhost:8222/api/comments/" + this.props.id)
      .then(response => response.json())
      .then(data => {
        this.setState({ commentList: data });
      })
      .catch(error => {
        console.error(error);
      });
  };

  submitComment = () => {
    const comment = this.state.comment;
    if (comment.trim() !== "") {
      const payload = {
        userId: JSON.parse(localStorage.getItem("users")).uid,
        postId: this.props.id,
        timeStamp: new Date().getTime(),
        comment: comment
      };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      };

      fetch("http://localhost:8222/api/comments", requestOptions)
        .then(response => {
          console.log(response); // Log the response data
          return response.json();
        })
        .then(data => {
          this.getComments();
          this.setState({ comment: "" }); // Clear the comment state
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  handleCommentChange = event => {
    this.setState({ comment: event.target.value });
  };

  render() {
    const { avatar } = this.state;
    const avatarUrl = avatar ? avatar.objectUrl : "";
    return (
      <div className="post_container">
        {/* Header */}
        <div className="post_header">
          <Avatar className="post_avatar" src={avatarUrl} />
          <div className="post_username">{this.props.userName}</div>
        </div>

        {/* Image */}
        <div>
          <img className="postImage" src={this.props.postImage} alt="Post" />
        </div>

        {/* Analytics */}
        <div className="post_analytics" style={{ marginLeft: "10px" }}>
          <img
            src={this.state.liked ? love : unlike}
            className="post_reactimage"
            alt={this.state.liked ? "Love" : "Unlike"}
            onClick={this.handleLike}
          />
          <div className="likesText">{this.state.numberOfLikes} like(s)</div>
        </div>

        {/* Description */}
        <div className="post_description" style={{ marginLeft: "10px" }}>
          <div className="description">{this.props.description}</div>
        </div>
        

        {/* Comment Section */}
        <div className="post_commentSection">
          <div className="post_commentsContainer">
            {this.state.commentList.map((item, index) => (
              <div className="post_comment" key={index}>
                <b>{item.username}: </b>
                {item.comment}
              </div>
            ))}
          </div>
        </div>
        <div className="add_comment">
          <input
            type="text"
            className="post_commentbox"
            value={this.state.comment}
            onChange={this.handleCommentChange}
            placeholder="Add a comment..."
          />
          <button className="submitComment_btn" onClick={this.submitComment}>
            Send
          </button>
        </div>
      </div>
    );
  }
}

export default Post;
