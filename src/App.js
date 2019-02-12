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


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      getData: "",
      postData: ""
    }
  }

  componentDidMount(){
    this.props.getToken()
  }

  render() {
    return ( 
      <Router>
        <div className="App">
        <header className="App-header">
          <Route exact path="/" component={Welcome} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/signup" component={SignupContainer} />
          <Route path="/home" render={props => (
            <PrivatePage>
              <Homepage {...props}/>
            </PrivatePage>
          )} />
          <Route path="/users/:user_id/games/tank_game/:id" component={TankGame} />
        </header>
      </div>
      </Router>
      
    );
  }
}


const mapDispatchToProps = dispatch => ({
    getToken: () => dispatch(getToken())
})

export default connect(null, mapDispatchToProps)(App);
