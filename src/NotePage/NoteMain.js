import React from 'react';
import moment from 'moment';
import StoreContext from '../StoreContext'

export default function NoteMain(props) {
  return (
    <StoreContext.Consumer>
      {(value) => {
        const note = value.notes.find(n => n.id === props.match.params.noteId) || {}
        function deleteNote() {
          value.onDeleteNote(note.id)
          props.history.push('/')
        }
        return (
          <article className='note'>
            <div className='note-header'>
              <h2>{note.name}</h2>
              <p>Modified: {moment(note.modified).format('MM-DD-YYYY')}</p>
              <button onClick={deleteNote}>Delete</button>
            </div>
            <p>{note.content}</p>
          </article>
        )
      }}
    </StoreContext.Consumer>
  )
}