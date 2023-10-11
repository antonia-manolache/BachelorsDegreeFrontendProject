import React, {Component} from "react";
import "./ChallengePage.css"
import Grid from '@material-ui/core/Grid'
import Challenge from "../Challenge/Challenge";
import ChallengePosts from "../ChallengePosts/ChallengePosts"



class ChallengePage extends Component{
    constructor(props) {
        super(props);
        this.state={ }
    }
    handlePostUploadSuccess = () => {
        // Trigger post refresh in ChallengePosts component
        this.refs.challengePosts.getPosts();
      };
    
      render() {
        return (
          <div>
            <Challenge onPostUploadSuccess={this.handlePostUploadSuccess} />
            <div>
              <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                  <ChallengePosts ref="challengePosts" />
                </Grid>
                <Grid item xs={2}></Grid>
              </Grid>
            </div>
          </div>
        );
      }
}

export default ChallengePage;