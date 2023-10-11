import React, {Component} from "react";
import "./Profile.css"
import Grid from '@material-ui/core/Grid'
import ProfileDetails from "../ProfileDetails/ProfileDetails"
import ProfilePosts from "../ProfilePosts/ProfilePosts"


class Profile extends Component{
    constructor(props) {
        super(props);
        this.state={ }
    }
    render() {
        return(
            <div>
                
                <div>
                    <Grid container>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                      <ProfileDetails/>
                      <ProfilePosts/>
                    </Grid>
                    <Grid item xs={2}></Grid>
                    </Grid>
                </div>
                
            </div>
        );

    }
}

export default Profile;