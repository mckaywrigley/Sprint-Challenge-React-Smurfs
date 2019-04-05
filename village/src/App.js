import React, { Component } from 'react';
import axios from 'axios';
import { NavLink, Route } from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount = async () => {
    const res = await axios.get('http://localhost:3333/smurfs');
    this.setState({ smurfs: res.data });
  }

  componentDidUpdate = async () => {
    const res = await axios.get('http://localhost:3333/smurfs');
    this.setState({ smurfs: res.data });
  }

  deleteSmurf = async (e, id) => {
    e.preventDefault();
    const res = await axios.delete(`http://localhost:3333/smurfs/${id}`);
    this.setState({ smurfs: res.data });
  };

  render() {
    return (
      <div className="App">
      <NavLink to='/smurfs'>
        Smurfs
      </NavLink>

      <NavLink to='/smurfs-form'>
        New Smurf
      </NavLink>
      
        <Route
          exact path="/smurfs-form"
          render = {props => (
            <SmurfForm 
              {...props}
              history={this.props.history}
            />
          )}
        />
        <Route 
          path="/smurfs"
          render = {props => (
            <Smurfs 
              {...props}
              smurfs={this.state.smurfs} 
              deleteSmurf={this.deleteSmurf}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
