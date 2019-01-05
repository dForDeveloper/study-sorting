import React, { Component } from 'react';
import '../styles/main.scss';
import Demo from './Demo.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="App--h1">study sorting</h1>
        <main>
          <Demo />
        </main>
      </div>
    );
  }
}

export default App;