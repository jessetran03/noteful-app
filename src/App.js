import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import MainMain from './MainPage/MainMain';
import FolderMain from './FolderPage/FolderMain';
import NoteMain from './NotePage/NoteMain';
import MainSidebar from './MainPage/MainSidebar';
import FolderSidebar from './FolderPage/FolderSidebar';
import NoteSidebar from './NotePage/NoteSidebar';
import StoreContext from './StoreContext.js';
import './App.css';

class App extends Component {
  state = {
    notes: [],
    folders: []
  }
  
  componentDidMount() {
    this.getData()
  }

  onDeleteNote = (noteId) => {
    fetch('http://localhost:9090/notes/' + noteId, {
      method: 'delete'
    })
      .then(res => {
        this.setState({
          notes: this.state.notes.filter(note => note.id != noteId)
        })
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
            <Route exact path='/' component={MainSidebar} />
            <Route path='/folder/:folderId' component={FolderSidebar} />
            <Route path='/note/:noteId' component={NoteSidebar} />
          </nav>
          <main>
            <Route exact path='/' component={MainMain} />
            <Route path='/folder/:folderId' component={FolderMain} />
            <Route path='/note/:noteId' component={NoteMain} />
          </main>
        </div>
      </StoreContext.Provider>
    );
  }
}

export default App;