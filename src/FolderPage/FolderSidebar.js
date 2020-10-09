import React from 'react';
import { NavLink } from 'react-router-dom';

export default function FolderSidebar(props) {
  return (
    <ul className='Folders'>
      {props.folders.map(folder =>
        <NavLink 
          to={`/folder/${folder.id}`}
          activeClassName="selected"
          key={folder.id}
        >
          <li key={folder.id}>
            {folder.name}
          </li>
        </NavLink>
      )}
    </ul>
  )
}