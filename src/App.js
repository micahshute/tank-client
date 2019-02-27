import React, { Component } from 'react';
import './App.css';
import Welcome from './containers/Welcome'
import LoginContainer from './containers/LoginContainer'
import SignupContainer from './containers/SignupContainer'
import Homepage from './containers/Homepage'
import TankGame from './containers/TankGame'
import getToken from './actions/get_token'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { connect } from 'react-redux'
import PrivatePage from './hocs/PrivatePage'
import BypassAuthPage from './hocs/BypassAuthPage'
import ChooseUser from './containers/ChooseUser'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      getData: "",
      postData: ""
    }
  }

  componentDidMount(){
    // this.props.getToken()
  }

  render() {
    return ( 
      <Router>
          <React.Fragment>
            <Route exact path="/" render={props => (
              <BypassAuthPage>
                <Welcome {...props} />
              </BypassAuthPage>
            )} />
            <Route path="/login" render={props => (
              <BypassAuthPage>
                <LoginContainer {...props} />
              </BypassAuthPage>
            )} />
            <Route path="/signup" render={props => (
              <BypassAuthPage>
                <SignupContainer {...props} />
              </BypassAuthPage>
            )} />
            <Route path="/home" render={props => (
              <PrivatePage>
                <Homepage {...props}/>
              </PrivatePage>
            )} />
            
            <Route exact path="/games/tank_games/:id" render={ props => (
              <PrivatePage>
                <TankGame 
                    id={props.match.params.id}
                />
              </PrivatePage>
            )} />
            <Route path="/games/tank_games/remote/new"
                render={ props => (
                  <PrivatePage>
                    <ChooseUser />
                  </PrivatePage>
                )}
             />
          </React.Fragment>
      </Router>
      
    );
  }
}


const mapDispatchToProps = dispatch => ({
    getToken: () => dispatch(getToken())
})

export default connect(null, mapDispatchToProps)(App);
