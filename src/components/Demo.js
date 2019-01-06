import React, { Component } from 'react';
import '../styles/main.scss';
import Box from './Box';
import Buttons from './Buttons';
import Explanation from './Explanation';

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
        divClass += 'Box-final-position';
      } else if (index === i) {
        divClass += iClass;
      } else if (index === i + 1) {
        divClass += jClass;
      }
      return <Box id={num} divClass={divClass} key={num}/>;
    });
  }

  getClassNames = (action, shouldSwap) => {
    if (action === 'swap' && shouldSwap) {
      return ['right-swap', 'left-swap'];
    } else if (action === 'compare' && shouldSwap) {
      return ['unsorted', 'unsorted'];
    } else if (action === 'compare' && !shouldSwap) {
      return ['sorted', 'sorted'];
    } else {
      return ['', ''];
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
      console.log('sorting complete, if 1')
      this.setState({
        action: '',
        iteration: boxIds.length + 1
      });
    } else if (iteration >= n && action === 'swap') {
      console.log(('else if 1'))
      const newBoxIds = this.swapNumbers(boxIds, i);
      this.setState({
        action: '',
        boxIds: newBoxIds,
        iteration: boxIds.length + 1
      });
    } else if (iteration >= n && shouldSwap) {
      console.log('else if 2')
      this.setState({
        action: 'swap'
      });
    } else if (i === n - iteration && action === 'swap') {
      console.log('else if 3')
      const newBoxIds = this.swapNumbers(boxIds, i);
      this.setState({
        iteration: iteration + 1,
        boxIds: newBoxIds,
        action: 'compare',
        i: 0
      });
    } else if (i === n - iteration && action === 'compare' && !shouldSwap) {
      console.log('else if 4')
      this.setState({
        iteration: iteration + 1,
        action: 'compare',
        i: 0
      });
    } else if (action === 'compare' && shouldSwap) {
      console.log('else if 5')
      this.setState({
        action: 'swap'
      });
    } else if (action === 'swap') {
      console.log('else if 6')
      const newBoxIds = this.swapNumbers(boxIds, i);
      this.setState({
        action: 'compare',
        boxIds: newBoxIds,
        i: i + 1
      });
    } else {
      console.log('else')
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
    return (
      <section className="Demo">
        <h2 className="Demo--h2">Bubble Sort</h2>
        <div className="explanation">
          {this.state.action !== '' &&
            <Explanation 
              boxIds={this.state.boxIds}
              action={this.state.action}
              i={this.state.i}
            />
          }
        </div>
        <div className="algorithm">
          {randomBoxes}
          {this.state.boxIds.map((num, index) => {
            let spanClass = 'algorithm--span';
            if (this.state.action !== '' &&
                (index === this.state.i || index === this.state.i + 1)) {
              spanClass += ' algorithm--span-underline';
            }
            return <span id={index} className={spanClass} key={num}></span>
          })}
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