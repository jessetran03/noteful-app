import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import MainMain from './MainPage/MainMain';
import FolderMain from './FolderPage/FolderMain';
import NoteMain from './NotePage/NoteMain';
import MainSidebar from './MainPage/MainSidebar';
import FolderSidebar from './FolderPage/FolderSidebar';
import NoteSidebar from './NotePage/NoteSidebar';
import StoreContext from './StoreContext.js';
import AddFolder from './AddFolder/AddFolder';
import AddSidebar from './AddSidebar';
import AddNote from './AddNote/AddNote';
import NoteError from './NoteError';
import './App.css';

class App extends Component {
  state = {
    notes: [],
    folders: [],
    addFolder: this.addFolder,
    addNote: this.addNote
  }

  componentDidMount() {
    this.getData()
  }

  onDeleteNote = (noteId) => {
    fetch('http://localhost:9090/notes/' + noteId, {
      method: 'DELETE'
    })
      .then(res => {
        this.setState({
          notes: this.state.notes.filter(note => note.id !== noteId)
        })
      })
  }

  addFolder = newFolder => {
    this.setState({
      folders: [...this.state.folders, newFolder]
    })
  }

  addNote = newNote => {
    this.setState({
      notes: [...this.state.notes, newNote]
    })
  }

  getData = () => {
    fetch('http://localhost:9090/folders')
      .then(res => res.json())
      .then(folders => {
        this.setState({
          folders,
        })
        return fetch('http://localhost:9090/notes')
      })
      .then(res => res.json())
      .then(notes => {
        this.setState({
          notes,
        })
      })
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      onDeleteNote: this.onDeleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote,
    }
    return (
      <StoreContext.Provider value={value}>
        <div className='App'>
          <header>
            <Link to='/'>
              <h1>Noteful</h1>
            </Link>
          </header>
          <nav>
            <NoteError>
              <Route exact path='/' component={MainSidebar} />
              <Route path='/folder/:folderId' component={FolderSidebar} />
              <Route path='/note/:noteId' component={NoteSidebar} />
              <Route path='/add-folder' component={AddSidebar} />
              <Route path='/add-note' component={AddSidebar} />
            </NoteError>
          </nav>
          <main>
            <NoteError>
              <Route exact path='/' component={MainMain} />
              <Route path='/folder/:folderId' component={FolderMain} />
              <Route path='/note/:noteId' component={NoteMain} />
              <Route path='/add-folder' component={AddFolder} />
              <Route path='/add-note' component={AddNote} />
            </NoteError>
          </main>
        </div>
      </StoreContext.Provider>
    );
  }
}

export default App;