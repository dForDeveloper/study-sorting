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
    const shouldSwap = boxIds[i] > boxIds[i + 1]
    if (iteration === n) {
      this.setState({ action: '' });
    } else if (i === n - iteration && action === 'swap') {
      const newBoxIds = this.swapNumbers(boxIds, i);
      this.setState({
        iteration: iteration + 1,
        boxIds: newBoxIds,
        action: 'compare',
        i: 0
      });
    } else if (action === 'swap') {
      const newBoxIds = this.swapNumbers(boxIds, i);
      this.setState({
        action: 'compare',
        boxIds: newBoxIds,
        i: i + 1
      });
    } else if (action === 'compare' && shouldSwap) {
      this.setState({ action: 'swap' });
    } else {
      this.setState({ i: i + 1 });
    }
  }

  swapNumbers = (boxIds, i) => {
    if (boxIds[i] > boxIds[i + 1]) {
      [boxIds[i], boxIds[i + 1]] = [boxIds[i + 1], boxIds[i]]; 
    }
    return boxIds;
  }

  render() {
    const { boxIds, i , iteration, action } = this.state;
    const showStartButton = iteration === 0 ? true : false;
    const randomBoxes = boxIds.map((num, index) => {
      return (
        <Box
          id={num}
          index={index}
          i={i}
          action={action}
          boxIds={boxIds}
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