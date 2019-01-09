import React, { Component } from 'react';
import '../styles/main.scss';
import Demo from './Demo.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      showBubbleSort: true
    }
  }

  goToBubbleSort = () => {
    this.setState({ showBubbleSort: true });
  }

  goToInsertionSort = () => {
    this.setState({ showBubbleSort: false });
  }

  render() {
    return (
      <div className="App">
        <h1 className="App--h1 fade-in">study sorting</h1>
          {this.state.showBubbleSort &&
            <main className="main">
              <Demo algorithmName="Bubble Sort" />
              <div
                className="main--right-arrow"
                onClick={this.goToInsertionSort}
              >
              </div>
            </main>}
          {!this.state.showBubbleSort &&
            <main className="main">
              <div
                className="main--left-arrow"
                onClick={this.goToBubbleSort}
              >
              </div>
              <Demo algorithmName="Insertion Sort" />
            </main>}
      </div>
    );
  }
}

export default App;