import React, { Component } from 'react';
import StoreContext from '../StoreContext';
import PropTypes from 'prop-types';

export default class AddFolder extends Component {
  static contextType = StoreContext;
  static propTypes = {
    history: PropTypes.any
  }
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      error: null
    }
  }

  updateName(name) {
    this.setState({
      name
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const newFolder = {
      name: this.state.name
    };
    console.log('Name: ', newFolder);

    fetch('http://localhost:9090/folders', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFolder)
    })
      .then(res => res.json())
      .then(data => {
        console.log('Success:', data);
        this.context.addFolder(data);
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({
          error: err.message
        });
      })
  }

  render() {
    return (
      <form className="addFoler" onSubmit={e => this.handleSubmit(e)} >
        <div>{this.state.error}</div>
        <h2>Create a folder</h2>
        <label htmlFor="name">Name</label><br />
        <input
          required
          type='text'
          name='name'
          id='name'
          onChange={e => this.updateName(e.target.value)}
        />
        <br />
        <button type='submit'>Add Folder</button>
      </form>
    )
  }
}