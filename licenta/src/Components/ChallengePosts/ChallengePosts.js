import React, {Component} from "react";
import "./ChallengePosts.css"
import Grid from '@material-ui/core/Grid'
import Post from "../Post/Post";
import profileimg from "../../Images/pp1.png"
import './ChallengePosts.css';



class ProfilePosts extends Component{
    constructor(props) {
        super(props);
        this.state={ 
            postArray:[]
        }
    }
    componentDidMount(){
        this.getPost();
    }
    getPost=()=>{ //API
        const thisContext=this;
        fetch('http://localhost:8222/api/posts/get-posts-by-challenge/'+JSON.parse(localStorage.getItem("challengeData")).id)
            .then(response => response.json())
            .then(data => {
                thisContext.setState({postArray: data});
        });
    }

    getPosts = () => {
        const thisContext = this;
        fetch(
          'http://localhost:8222/api/posts/get-posts-by-challenge/' +
            JSON.parse(localStorage.getItem("challengeData")).id
        )
          .then((response) => response.json())
          .then((data) => {
            // Extract the userIds from the posts
            const userIds = data.map((post) => post.userId);
            // Fetch the user data for each userId
            Promise.all(
              userIds.map((userId) =>
                fetch("http://localhost:8222/api/users/get-user/" + userId).then((response) => response.json())
              )
            )
              .then((userData) => {
                // Combine the user data with the posts
                const postsWithUser = data.map((post, index) => ({
                  ...post,
                  avatar: userData[index].avatar,
                }));
                thisContext.setState({ postArray: postsWithUser });
              })
              .catch((error) => {
                console.error("Error fetching user data:", error);
              });
          })
          .catch((error) => {
            console.error("Error fetching posts:", error);
          });
      };
    
    render() {
        return(
            <div>
                <div className="mainpage_container" style={{"textAlign":"center", "margin":"10px"}}>
                </div>
                {
                    this.state.postArray.map((item,index)=>(
                        <Post
                        key={item.id}
                        id={item.id}
                        profileImage={item.avatar} // Update the prop to use the avatar property
                        userName={item.username}
                        userId={item.userId}
                        postImage={item.objectUrl}
                        likes={item.likes}
                        description={item.description}
                      />
                    ))
                }
            </div>
        );

    }
}

export default ProfilePosts;