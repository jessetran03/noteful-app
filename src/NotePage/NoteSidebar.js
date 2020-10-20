import React from 'react';
import { Link } from 'react-router-dom';
import StoreContext from '../StoreContext';
import PropTypes from 'prop-types';

export default function NoteSidebar(props) {
  return (
    <StoreContext.Consumer>
      {(value) => {
        const note = value.notes.find(n => n.id === props.match.params.noteId) || {}
        const folder = value.folders.find(f =>
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
      }}
    </StoreContext.Consumer>
  )
}
NoteSidebar.defaultProps = {
  match: {
    params: {}
  }
}
NoteSidebar.propTypes = {
  match: PropTypes.any
}