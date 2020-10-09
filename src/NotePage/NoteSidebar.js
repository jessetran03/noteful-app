import React from 'react';
import { Link } from 'react-router-dom';

export default function NoteSidebar(props) {
  const note = props.notes.find(n => n.id === props.match.params.noteId)
  const folder = props.folders.find(f =>
    f.id === note.folderId
  ) || {}
  return (
    <div className="note-sidebar">
      <p>{folder.name}</p>
      <Link to={`/folder/${folder.id}`}>
        <p>
          <i>Back</i>
        </p>
      </Link>
      <button type='button' onClick={e => props.history.goBack()}>
        Back
      </button>
    </div>
  )
}
NoteSidebar.defaultProps = {
  note: {}
}