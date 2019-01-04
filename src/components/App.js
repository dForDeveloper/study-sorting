import React, { Component } from 'react';
import '../styles/main.scss';
import Demo from './Demo.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Study Sorting</h1>
        <main>
          <Demo />
        </main>
      </div>
    );
  }
}

export default App;