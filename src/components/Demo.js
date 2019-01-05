import React, { Component } from 'react';
import '../styles/main.scss';
import Box from './Box';

class Demo extends Component {

  
  fisherYatesShuffle(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
      const randomIndex = Math.floor((Math.random() * (arr.length - i))) + i;
      [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
      return arr;
    }
  }

  render() {
    let randomBoxes = [5, 7, 3, 8, 1, 4 ,6, 2].map((num, index) => {
      return (
        <Box
          id={num}
          index={index}
          key={num}
        />
      );
    });
    return (
      <div className="Demo">
        <h2 className="Demo--h2">Bubble Sort</h2>
        <p>explanation of step</p>
        <div className="algorithm">
          {randomBoxes}
        </div>
        <footer className="footer">
          <button className="footer--btn footer--btn-back">back</button>
          <button className="footer--btn footer--btn-replay">replay</button>
          <button className="footer--btn footer--btn-next">next</button>
        </footer>
      </div>
    );
  }
}

export default Demo;