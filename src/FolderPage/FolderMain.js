import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default function FolderMain(props) {
  const notes = props.notes.filter(n =>
    n.folderId === props.match.params.folderId
  )
  return (
    <ul className='MainPage'>
      {notes.map(note =>
        <li key={note.id}>
          <Link to={`/note/${note.id}`}>
            <h2>{note.name}</h2>
          </Link>
          <p>Modified: {moment(note.modified).format('MM-DD-YYYY')}</p>
        </li>
      )}
    </ul>
  )
}