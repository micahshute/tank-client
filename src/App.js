import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RequestManager from './requests/test'
class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      getData: "",
      postData: ""
    }
  }

  async componentDidMount(){
    const rm = new RequestManager(3001)
    const getData = await rm.users()
    const tokenData = await rm.csrfToken()
    const token = tokenData.csrfToken
    console.log(token)
    const postData = await rm.signup("gamer", "password", token)

    this.setState({
      getData, postData
    })

  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {JSON.stringify(this.state.getData)}
            <br/>{"POST DATA BELOW "}<br/>
            {JSON.stringify(this.state.postData)}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
