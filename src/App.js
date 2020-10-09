import React, {Component} from 'react';
import {Route, Link } from 'react-router-dom';
import MainMain from './MainPage/MainMain';
import FolderMain from './FolderPage/FolderMain';
import NoteMain from './NotePage/NoteMain';
import MainSidebar from './MainPage/MainSidebar';
import FolderSidebar from './FolderPage/FolderSidebar';
import NoteSidebar from './NotePage/NoteSidebar';
import STORE from './dummy-store.js';
import './App.css';

class App extends Component {
  state = {
    notes: [],
    folders: []
  }
  componentDidMount() {
    this.setState(STORE)
  }
  render() {
    return (
      <div className='App'>
        <header>
          <Link to='/'>
            <h1>Noteful</h1>
          </Link>
        </header>
        <nav>
          <Route
            exact
            path='/'
            render={() =>
              <MainSidebar
                folders={this.state.folders}
              />
            }
          />
          <Route
            path='/folder/:folderId'
            render={() =>
              <FolderSidebar
                folders={this.state.folders}
              />
            }
          />
          <Route
            path='/note/:noteId'
            render={(routerProps) =>
              <NoteSidebar
                history={routerProps.history}
                match={routerProps.match}
                notes={this.state.notes}
                folders={this.state.folders}
              />
            }
          />
        </nav>
        <main>
          <Route
            exact path='/'
            render={() =>
              <MainMain
                notes={this.state.notes}
              />
            }
          />
          <Route
            path='/folder/:folderId'
            render={(routerProps) =>
              <FolderMain
                match={routerProps.match}
                notes={this.state.notes}
              />
            }
          />
          <Route
            path='/note/:noteId'
            render={(routerProps) =>
              <NoteMain
                match={routerProps.match}
                notes={this.state.notes}
              />
            }
          />
        </main>
      </div>
    );
  }
}

export default App;