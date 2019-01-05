import React, { Component } from 'react';
import '../styles/main.scss';
import Box from './Box';
import Buttons from './Buttons';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxIds: [],
      i: 0,
      iteration: 0,
      action: '',
    };
  }

  componentDidMount = () => {
    const boxIds = [1, 2, 3, 4, 5, 6, 7, 8];
    this.fisherYatesShuffle(boxIds);
    this.setState({ boxIds });
  }

  fisherYatesShuffle = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
      const randomIndex = Math.floor((Math.random() * (arr.length - i))) + i;
      [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
  }

  getBoxes = () => {
    const { i, iteration, boxIds, action } = this.state;
    const shouldSwap = boxIds[i] > boxIds[i + 1];
    let [iClass, jClass] = this.getClassNames(action, shouldSwap);
    return boxIds.map((num, index) => {
      let divClass = 'Box ';
      if (index >= boxIds.length - iteration + 1) {
        divClass = 'Box Box-final-position';
      } else if (index === i) {
        divClass += iClass;
      } else if (index === i + 1) {
        divClass += jClass;
      }
      return <Box id={num} divClass={divClass} key={num}/>;
    });
  }

  getClassNames = (action, shouldSwap) => {
    let iClass, jClass;
    if (action === 'swap' && shouldSwap) {
      iClass = 'right-swap';
      jClass = 'left-swap';
    } else if (action === 'compare' && shouldSwap) {
      iClass = 'unsorted';
      jClass= 'unsorted';
    } else if (action === 'compare' && !shouldSwap) {
      iClass = 'sorted';
      jClass= 'sorted';
    }
    return [iClass, jClass];
  }

  getExplanation = () => {
    const { boxIds, action, i } = this.state;
    if (action === 'swap') {
      return (
        <div>
          <p>{boxIds[i]} swaps with {boxIds[i + 1]}</p>
        </div>
      );
    } else if (action === 'compare' && boxIds[i] < boxIds[i + 1]) {
      return (
        <div>
          <p>compare {boxIds[i]} and {boxIds[i + 1]}</p>
          <p>they do not need to swap</p>
        </div>
      );
    } else if (action === 'compare') {
      return (
        <div>
          <p>compare {boxIds[i]} and {boxIds[i + 1]}</p>
          <p>they are out of order</p>
        </div>
      );
    }
  }

  startAlgorithm = () => {
    this.setState({
      iteration: 1,
      action: 'compare'
    });
  }

  goForward = () => {
    const { i, iteration, boxIds, action } = this.state;
    const n = boxIds.length - 1;
    const shouldSwap = boxIds[i] > boxIds[i + 1];
    if (iteration >= n && !shouldSwap) {
      this.setState({
        action: '',
        iteration: boxIds.length + 1
      });
    } else if (iteration >= n && shouldSwap) {
      this.setState({
        action: 'swap'
      });
    } else if (i === n - iteration && action === 'swap') {
      const newBoxIds = this.swapNumbers(boxIds, i);
      this.setState({
        iteration: iteration + 1,
        boxIds: newBoxIds,
        action: 'compare',
        i: 0
      });
    } else if (i === n - iteration && action === 'compare' && !shouldSwap) {
      this.setState({
        iteration: iteration + 1,
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
      this.setState({
        action: 'swap'
      });
    } else {
      this.setState({
        i: i + 1
      });
    }
  }

  swapNumbers = (boxIds, i) => {
    if (boxIds[i] > boxIds[i + 1]) {
      [boxIds[i], boxIds[i + 1]] = [boxIds[i + 1], boxIds[i]]; 
    }
    return boxIds;
  }

  render() {
    const showStartButton = this.state.iteration === 0 ? true : false;
    const randomBoxes = this.getBoxes();
    const explanation = this.getExplanation();
    return (
      <section className="Demo">
        <h2 className="Demo--h2">Bubble Sort</h2>
        <div>{explanation}</div>
        <div className="algorithm">
          {randomBoxes}
          {this.state.boxIds.map((num, index) => {
            const spanClass = index === this.state.i ?
              'algorithm--span algorithm--span-underline' : 'algorithm--span';
            return <span id={index} className={spanClass} key={num}></span>
          })
          }
        </div>
        <Buttons
          showStartButton={showStartButton}
          startAlgorithm={this.startAlgorithm}
          goForward={this.goForward}
        />
      </section>
    );
  }
}

export default Demo;