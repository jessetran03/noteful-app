import React from 'react';
import moment from 'moment';

export default function NoteMain(props) {
  const note = props.notes.find(n => n.id === props.match.params.noteId)
  return (
    <article className='note'>
      <div className='note-header'>
        <h2>{note.name}</h2>
        <p>Modified: {moment(note.modified).format('MM-DD-YYYY')}</p>
      </div>
      <p>{note.content}</p>
    </article>
  )
}
NoteMain.defaultProps = {
  note: {}
}