import Reaxt, {Component} from 'react';
import './LoginPage.css';
import Grid from '@material-ui/core/Grid'
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state={ 
            isLogin: true
        }
    }

    changeLogin=()=>{
        if(this.state.isLogin)
            this.setState({isLogin: false});
        else
            this.setState({isLogin: true});
    }

    render() {
        return(
            <div>
                <Grid container>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={6}>
                        <div className='loginpage_main'>                            
                            <div className='loginpage_rightcomponent'>
                                <div>
                                    <h1 className='loginpage_logo'>Photogram</h1>
                                </div>
                            
                                <div className='loginpage_signin'>
                                    {
                                        this.state.isLogin ? <SignIn/> : <SignUp/>
                                    }
                                  
                                    <div className='login_ordiv'>
                                        <div className='login_divor'></div>
                                        <div className='login_or'>OR</div>
                                        <div className='login_divor'></div>
                                    </div>

                        
                                </div>
                                <div className='loginpage_signupoption'>
                                    {
                                        this.state.isLogin ?
                                        <div className='loginpage_signup'>
                                        Don't have an account? 
                                        <span onClick={this.changeLogin} style={{"fontWeight":"bold", "color":"#EA906C"}}> Sign up</span>
                                        </div> :
                                        <div className='loginpage_signIn'>
                                        Have an account? 
                                        <span onClick={this.changeLogin} style={{"fontWeight":"bold", "color":"#EA906C"}}> Log in</span>
                                    </div>
                                    }
                                    
                                    
                                </div>
                            
                            </div>

                            
                        </div>
                        
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default LoginPage;