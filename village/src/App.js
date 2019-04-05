import React, { Component } from 'react';
import axios from 'axios';
import { NavLink, Route } from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import EditForm from './components/EditForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      smurf: null
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount = async () => {
    const res = await axios.get('http://localhost:3333/smurfs');
    this.setState({ smurfs: res.data });
    console.log(this.state.smurfs);
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

  setSmurf = (e, smurf) => {
    e.preventDefault();
    this.setState({
      smurf
    });
    this.props.history.push('/smurf-form');
  }

  updateSmurf = async smurf => {
    const res = await axios.put(`http://localhost:3333/smurfs/${smurf.id}`, smurf)
    console.log(res);
    this.setState({ 
        smurfs: res.data,
        smurf: null 
    })
    this.props.history.push('/');
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
              smurf={this.state.smurf}
            />
          )}
        />
        <Route 
          exact path="/smurfs"
          render = {props => (
            <Smurfs 
              {...props}
              smurfs={this.state.smurfs} 
              deleteSmurf={this.deleteSmurf}
              history={this.props.history}
              setSmurf={this.setSmurf}
            />
          )}
        />
        <Route 
          exact path="/smurf-form"
          render = {props => (
            <EditForm 
              {...props}
              updateSmurf={this.updateSmurf}
              smurf={this.state.smurf}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
