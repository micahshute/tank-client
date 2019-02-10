import React, { Component } from 'react';
import './App.css';
import Welcome from './containers/Welcome'
import LoginContainer from './containers/LoginContainer'
import SignupContainer from './containers/SignupContainer'
import Homepage from './containers/Homepage'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      getData: "",
      postData: ""
    }
  }

  // async componentDidMount(){
  //   const rm = new RequestManager(3001)
  //   const getData = await rm.users()
  //   const tokenData = await rm.csrfToken()
  //   const token = tokenData.csrfToken
  //   console.log(token)
  //   const postData = await rm.signup("gamer", "password", token)

  //   this.setState({
  //     getData, postData
  //   })

  // }


  render() {
    return (
      <Router>
        <div className="App">
        <header className="App-header">
          <Route exact path="/" component={Welcome} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/signup" component={SignupContainer} />
          <Route path="/home" component={Homepage} />
        </header>
      </div>
      </Router>
      
    );
  }
}

export default App;
