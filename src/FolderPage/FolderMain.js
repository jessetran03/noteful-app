import React from 'react';
import { Link } from 'react-router-dom';
import StoreContext from '../StoreContext';
import moment from 'moment';
import PropTypes from 'prop-types';

export default function FolderMain(props) {
  return (
    <>
      <StoreContext.Consumer>
        {(value) => {
          const notes = value.notes.filter(n => n.folderId === props.match.params.folderId)
          return (
            <ul className='MainPage'>
              {notes.map(note =>
                <li key={note.id}>
                  <Link to={`/note/${note.id}`}>
                    <h2>{note.name}</h2>
                  </Link>
                  <p>Modified: {moment(note.modified).format('MM-DD-YYYY')}</p>
                  <button onClick={e => value.onDeleteNote(note.id)}>Delete</button>
                </li>
              )}
            </ul>
          )
        }}
      </StoreContext.Consumer>
      <Link to={`/add-note`}>
        <button>Add Note</button>
      </Link>
    </>
  )
}
FolderMain.defaultProps = {
  match: {
    params: {}
  }
}
FolderMain.propTypes = {
  match: PropTypes.any
}