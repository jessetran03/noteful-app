import React, { Component } from 'react';
import StoreContext from '../StoreContext';
import ValidationError from '../ValidationError';
import PropTypes from 'prop-types';

export default class AddNote extends Component {
  static contextType = StoreContext;
  static propTypes = {
    history: PropTypes.any
  }
  constructor(props) {
    super(props)
    this.state = {
      name: {
        value: '',
        touched: false,
        error: null,
      },
      folderId: '',
      content: '',
    }
  }

  updateName(name) {
    this.setState({
      name: { value: name, touched: true }
    })
  }

  updateContent(content) {
    this.setState({
      content
    })
  }

  updateFolder(folderId) {
    this.setState({
      folderId
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const newNote = {
      name: this.state.name.value,
      modified: new Date(),
      folderId: this.state.folderId,
      content: this.state.content,
    }

    fetch('http://localhost:9090/notes', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote),
    })
      .then(res => res.json())
      .then(data => {
        console.log('Success:', data);
        this.context.addNote(data);
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({
          error: err.message
        });
      })
  }

  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "Name is required";
    }
  }

  render() {
    const nameError = this.validateName();

    return (
      <form className="addNote" onSubmit={e => this.handleSubmit(e)}>
        <div>{this.state.error}</div>
        <h2>Create a note</h2>
        <label>Name</label><br />
        <input
          type='text'
          name='name'
          id='name'
          onChange={e => this.updateName(e.target.value)}
        /><br />
        {this.state.name.touched && <ValidationError message={nameError} />}
        <label>Content</label><br />
        <input
          type='text'
          name='content'
          id='content'
          onChange={e => this.updateContent(e.target.value)}
        /><br />
        <label>Folder</label><br />
        <select
          required
          name='folder'
          id='content'
          onChange={e => this.updateFolder(e.target.value)}
        >
          <option value="">Select a folder</option>
          {this.context.folders.map(folder =>
            <option key={folder.id} value={folder.id}>{folder.name}</option>
          )}
        </select><br />
        <button
          type='submit'
          disabled={
            this.validateName()
          }
        >
          Add Note</button>
      </form>
    )
  }
}
