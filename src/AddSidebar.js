import React from 'react';
import PropTypes from 'prop-types';

export default function AddSidebar(props) {
  return (
    <div className="addFolder">
      <button type='button' onClick={e => props.history.goBack()}>
        Back
        </button>
    </div>
  )
}
AddSidebar.propTypes = {
  history: PropTypes.any
}