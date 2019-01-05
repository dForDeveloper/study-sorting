import React, { Component } from 'react';
import '../styles/main.scss';
import Box from './Box';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxIds: [],
      i: 0,
      iteration: 0,
      action: ''
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

  startAlgorithm = () => {
    this.setState({
      iteration: 1,
      action: 'compare'
    })
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
    const { boxIds, iteration } = this.state;
    const showStartButton = iteration === 0 ? true : false;
    const randomBoxes = this.getBoxes();
    return (
      <section className="Demo">
        <h2 className="Demo--h2">Bubble Sort</h2>
        <p>explanation of step</p>
        <div className="algorithm">
          {randomBoxes}
          {boxIds.map((num, index) => {
            const spanClass = index === this.state.i ?
              'algorithm--span algorithm--span-underline' : 'algorithm--span';
            return <span id={index} className={spanClass} key={num}></span>
          })
          }
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