import React, { Component } from 'react';
import '../styles/main.scss';
import Demo from './Demo.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      showBubbleSort: true,
      showInsertionSort: false
    }
  }

  goToLastDemo = () => {
    this.setState({
      showBubbleSort: true,
      showInsertionSort: false
    })
  }

  goToNextDemo = () => {
    this.setState({
      showBubbleSort: false,
      showInsertionSort: true
    })
  }

  render() {
    return (
      <div className="App">
        <h1 className="App--h1 fade-in">study sorting</h1>
        <main className="main">
          {this.state.showInsertionSort &&
            <div
              className="main--left-arrow"
              onClick={this.goToLastDemo}
            >
            </div>
          }
          {this.state.showBubbleSort &&
            <Demo
              algorithmName="Bubble Sort"
            />
          }
          {this.state.showInsertionSort &&
            <Demo
              algorithmName="Insertion Sort"
            />
          }
          {this.state.showBubbleSort &&
            <div
              className="main--right-arrow"
              onClick={this.goToNextDemo}
            >
            </div>
          }
        </main>
      </div>
    );
  }
}

export default App;