import React, { Component } from 'react';
import Demo from './Demo.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      displayedAlgorithm: 'Bubble Sort'
    }
  }

  goToBubbleSort = () => {
    this.setState({ displayedAlgorithm: 'Bubble Sort' });
  }

  goToInsertionSort = () => {
    this.setState({ displayedAlgorithm: 'Insertion Sort' });
  }

  render() {
    const { displayedAlgorithm } = this.state;
    return (
      <div className="App">
        <h1 className="App--h1 fade-in">study sorting</h1>
          {displayedAlgorithm === 'Bubble Sort' &&
            <main className="main">
              <Demo algorithmName="Bubble Sort" />
              <div
                className="main--right-arrow"
                onClick={this.goToInsertionSort}
              >
              </div>
            </main>}
          {displayedAlgorithm === 'Insertion Sort' &&
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