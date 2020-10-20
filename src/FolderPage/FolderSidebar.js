import React from 'react';
import StoreContext from '../StoreContext';
import { NavLink, Link } from 'react-router-dom';

export default function FolderSidebar() {
  return (
    <>
      <StoreContext.Consumer>
        {(value) => {
          return (
            <ul className='Folders'>
              {value.folders.map(folder =>
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
        }}
      </StoreContext.Consumer>
      <Link to={`/add-folder`}>
        <button>Add Folder</button>
      </Link>
    </>
  )
}