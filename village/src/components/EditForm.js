import React, { Component } from 'react';

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurf: this.props.smurf
    };
  }

    handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    };

  render() {
    return (
      <div className="SmurfForm">
        <form onSubmit={this.props.updateSmurf}>
          <input
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.age}
            name="age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.height}
            name="height"
          />
          <button type="submit">Edit Smurf</button>
        </form>
      </div>
    );
  }
}

export default EditForm;