import React, { Component } from 'react';
import '../styles/main.scss';
import Box from './Box';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxIds: [5, 7, 3, 8, 1, 4 ,6, 2],
      i: 0,
      currentPass: 1
    };
  }

  fisherYatesShuffle = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
      const randomIndex = Math.floor((Math.random() * (arr.length - i))) + i;
      [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
      return arr;
    }
  }

  setBoxesToCompare = () => {
    return true;
  }

  render() {
    let { boxIds, i } = this.state;
    let randomBoxes = boxIds.map((num, index) => {
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
            onClick={this.setBoxesToCompare}
          >
            next
          </button>
        </footer>
      </section>
    );
  }
}

export default Demo;