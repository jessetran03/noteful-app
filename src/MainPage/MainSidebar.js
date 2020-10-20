import React from 'react';
import { Link } from 'react-router-dom';
import StoreContext from '../StoreContext';

export default function MainSidebar() {
  return (
    <>
      <StoreContext.Consumer>
        {(value) => {
          return (
            <ul className='Folders'>
              {value.folders.map(folder =>
                <Link to={`/folder/${folder.id}`} key={folder.id}>
                  <li key={folder.id}>
                    {folder.name}
                  </li>
                </Link>
              )}
            </ul>
          )
        }}
      </StoreContext.Consumer>
      <Link to={`/add-folder`}>
        <button>Add Folder</button>
      </Link>
    </>
  )
}