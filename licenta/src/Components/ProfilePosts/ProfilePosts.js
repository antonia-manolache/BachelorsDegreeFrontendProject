import React, {Component} from "react";
import "./ProfilePosts.css"
import Grid from '@material-ui/core/Grid'
import Post from "../Post/Post";
import profileimg from "../../Images/pp1.png"
import './ProfilePosts.css';



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
        fetch('http://localhost:8222/api/posts/get-posts-by/'+JSON.parse(localStorage.getItem("users")).uid)
            .then(response => response.json())
            .then(data => {
                thisContext.setState({postArray: data});
        });
    }
    render() {
        return(
            <div>
                <div className="mainpage_container" style={{"textAlign":"center", "margin":"10px"}}>
                </div>
                {
                    this.state.postArray.map((item,index)=>(
                        <Post id={item.id} profileImage = {profileimg} userName={item.username} userId={item.userId} postImage={item.objectUrl} likes={item.likes}/>
                    ))
                }
            </div>
        );

    }
}

export default ProfilePosts;