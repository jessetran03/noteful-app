import React from 'react';
import { Link } from 'react-router-dom';

export default function MainSidebar(props) {
  return (
    <ul className='Folders'>
      {props.folders.map(folder =>
        <Link to={`/folder/${folder.id}`} key={folder.id}>
          <li key={folder.id}>
            {folder.name}
          </li>
        </Link>
      )}
    </ul>
  )
}