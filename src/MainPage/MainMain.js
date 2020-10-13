import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import StoreContext from '../StoreContext';
import moment from 'moment';

export default class MainMain extends Component {
  static contextType = StoreContext;
  render() {
    return (
      <ul className='MainPage'>
        {this.context.notes.map(note =>
          <li key={note.id}>
            <Link to={`/note/${note.id}`}>
              <h2>{note.name}</h2>
            </Link>
            <p>Modified: {moment(note.modified).format('MM-DD-YYYY')}</p>
            <button onClick={e => this.context.onDeleteNote(note.id)}>Delete</button>
          </li>
        )}
      </ul>
    )
  }
}
