import React, { Component } from 'react';
import '../styles/main.scss';
import Box from './Box';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxIds: [5, 7, 3, 8, 1, 4 ,6, 2],
      i: 0,
      iteration: 0,
      action: ''
    };
  }

  fisherYatesShuffle = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
      const randomIndex = Math.floor((Math.random() * (arr.length - i))) + i;
      [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
      return arr;
    }
  }

  startAlgorithm = () => {
    this.setState({
      iteration: 1,
      action: 'compare'
    })
  }

  goForward = () => {
    const { i, iteration, boxIds, action } = this.state;
    const n = boxIds.length - 1;
    if (i === n - iteration) {
      this.setState({
        iteration: iteration + 1,
        i: 0
      });
    } else if (action === 'swap') {
      this.setState({
        action: 'compare',
        i: i + 1
      });
    } else {
      this.setState({ action: 'swap' });
    }
  }

  render() {
    const { boxIds, i , iteration } = this.state;
    const showStartButton = iteration === 0 ? true : false;
    const randomBoxes = boxIds.map((num, index) => {
      return (
        <Box
          id={num}
          index={index}
          i={i}
          key={num}
        />
      );
    });
    return (
      <section className="Demo">
        <h2 className="Demo--h2">Bubble Sort</h2>
        <p>explanation of step</p>
        <div className="algorithm">
          {randomBoxes}
        </div>
          {showStartButton && 
            <footer className="footer">
              <button
                className="footer--btn footer--btn-start"
                onClick={this.startAlgorithm}
              >
                start
              </button>
            </footer>
          }
          {!showStartButton && 
            <footer className="footer">
              <button
                className="footer--btn footer--btn-back"
                onClick={() => true}
              >
                back
              </button>
              <button
                className="footer--btn footer--btn-replay"
                onClick={() => true}
              >
                replay
              </button>
              <button
              className="footer--btn footer--btn-next"
              onClick={this.goForward}
              >
                next
              </button>
            </footer>
          }
            
        
      </section>
    );
  }
}

export default Demo;