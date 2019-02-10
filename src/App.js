import React, { Component } from 'react';
import './App.css';
import Welcome from './containers/Welcome'
import RequestManager from './requests/test'

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
      <div className="App">
        <header className="App-header">
          <Welcome />
        </header>
      </div>
    );
  }
}

export default App;
