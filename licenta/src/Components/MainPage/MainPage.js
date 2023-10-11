import React, {Component} from "react";
import "./MainPage.css"
import Grid from '@material-ui/core/Grid'
import Post from "../Post/Post";
import profileimg from "../../Images/pp1.png"
import uploadImage from "../../Images/uploadPost.png"

class MainPage extends Component{
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
        fetch('http://localhost:8222/api/posts/get-posts')
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
                        <Post id={item.id} profileImage = {profileimg} userName={item.username} userId={item.userId} postImage={item.objectUrl} likes={item.likes} description={item.description} challengeId={item.challengeId}/>
                    ))
                }
            </div>
        );

    }
}

export default MainPage;