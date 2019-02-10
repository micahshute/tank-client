import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RequestManager from './requests/test'
class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      data: ""
    }
  }

  async componentDidMount(){
    const rm = new RequestManager(3004)
    const data = await rm.users()
    this.setState({
      data
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {this.state.data}
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
