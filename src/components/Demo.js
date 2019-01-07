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
      j: 1,
      iteration: 0,
      action: '',
      allSteps: [],
      currentStep: null
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

  removeDuplicateIds = (arr, isShifted = false) => {
    let [...boxIds] = arr;
    for (let i = 0; i < boxIds.length - 1; i++) {
      if (boxIds[i] === boxIds[i + 1] && !isShifted) {
        boxIds[i] = null;
      } else if (boxIds[i] === boxIds[i + 1] && isShifted) {
        boxIds[i + 1] = null;
      }
    }
    return boxIds;
  }

  getTempBox = () => {
    const { temp, boxIds, i, j, action } = this.state;
    
    return boxIds.map((num, index) => {
      let divClass = 'Box temp';
      if (action === 'insert') {
        divClass += ` insert${i - (j + 1)}`;
      } else if (action === 'compareagain') {
        divClass += ' examine';
      } else if (action === 'leftmost' || (action === 'stop' && i - j > 1)) {
        divClass += ' sorted'
      }
      if (index === i) {
        return <Box id={temp} divClass={divClass} key={temp} />;
      } else {
        return <div key={num}></div>
      }
    })
  }

  getBoxes = () => {
    const { i, j, iteration, boxIds, action } = this.state;
    const shouldSwap = boxIds[i] > boxIds[j];
    let [iClass, jClass] = this.getClassNames(action, shouldSwap);
    return boxIds.map((num, index) => {
      let divClass = 'Box ';
      if (index >= boxIds.length - iteration + 1 || action === 'end') {
        divClass += 'Box-final-position';
      } else if (num === null) {
        divClass = 'Box-empty'
      } else if (index === i) {
        console.log('index of i', index);
        divClass += iClass;
      } else if (index === j && num !== null) {
        console.log('index of j', index);
        divClass += jClass;
      }
      return <Box id={num} divClass={divClass} key={num} />;
    });
  }

  getClassNames = (action, shouldSwap) => {
    console.log('action', action)
    if (action === 'swap' && shouldSwap) {
      return ['right-swap', 'left-swap'];
    } else if (action === 'compare' && shouldSwap) {
      return ['unsorted', 'unsorted'];
    } else if ((action === 'compare' && !shouldSwap) ||
      (action === 'stop' && this.state.i - this.state.j === 1)) {
      return ['sorted', 'sorted'];
    } else if (action === 'examine' ||   action === 'move') {
      return ['examine', ''];
    } else if (action === 'leftmost' && this.state.i === this.state.temp) {
      return ['sorted', ''];
    } else if (action === 'stop' && this.state.i - this.state.j > 1) {
      return ['', 'sorted'];
    } else if (action === 'compareadjacent') {
      return ['examine', 'examine'];
    } else if (action === 'compareagain') {
      return ['', 'examine'];
    } else if (action === 'greater' && this.state.i - this.state.j === 1) {
      return ['move-up unsorted', 'unsorted'];
    } else if (action === 'greater' && this.state.i - this.state.j > 1) {
      return ['', 'unsorted'];
    } else if (action === 'shift') {
      return ['', 'shift-right'];
    } else {
      return ['', ''];
    }
  }

  startBubbleSort = () => {
    this.setState({
      iteration: 1,
      action: 'compare'
    });
  }

  startInsertionSort = () => {
    const [...boxIds] = this.state.boxIds;
    let step = 0;
    const allSteps = [];
    allSteps.push({ boxIds: [...boxIds], step, action: '' })
    for(let i = 0; i < boxIds.length; i++) {
      let temp = boxIds[i];
      let j = i - 1;
      step++;
      console.log(`${step}: examine ${boxIds[i]} and compare it with each element on its left.\nstop at the first element less than ${boxIds[i]}\n`)
      allSteps.push({ boxIds: [...boxIds], step, i, j, action: 'examine', temp });
      if(j === -1) {
        step++;
        console.log(`${step}: there is nothing to the left of ${boxIds[i]}\n`)
        allSteps.push({ boxIds: [...boxIds], step, i, j, action: 'leftmost', temp });
      } else {
        step++
        console.log(`${step}: compare ${boxIds[j]} and ${temp}\n`)
        allSteps.push({ boxIds: [...boxIds], step, i, j, action: 'compareadjacent', temp });
        if(j >= 0 && boxIds[j] < temp) {
          step++
          console.log(`${step}: ${boxIds[j]} is less than ${temp}. stop.\n`)
          allSteps.push({ boxIds: [...boxIds], step, i, j, action: 'stop', temp });
        }
      }
      while(j >= 0 && boxIds[j] > temp) {
        step++;
        console.log(`${step}: ${boxIds[j]} is greater than ${temp}\n`)
        allSteps.push({ boxIds: this.removeDuplicateIds(boxIds), step, i, j, action: 'greater', temp });
        boxIds[j + 1] = boxIds[j];
        step++;
        console.log(`${step}: ${boxIds[j]} shifts to the right\n`)
        allSteps.push({ boxIds: this.removeDuplicateIds(boxIds, true), step, i, j, action: 'shift', temp });
        j--;
        if(j === -1) {
          step++;
          console.log(`${step}: there is nothing to the left of ${temp}\n`)
          allSteps.push({ boxIds: this.removeDuplicateIds(boxIds), step, i, j, action: 'leftmost', temp });
        } else {
          step++;
          console.log(`${step}: compare ${boxIds[j]} and ${temp}\n`)
          allSteps.push({ boxIds: this.removeDuplicateIds(boxIds), step, i, j, action: 'compareagain', temp });
          if(j >= 0 && boxIds[j] < temp) {
          step++
          console.log(`${step}: ${boxIds[j]} is less than ${temp}. stop.\n`)
          allSteps.push({ boxIds: this.removeDuplicateIds(boxIds), step, i, j, action: 'stop', temp });
          }
        }
      }
      if(boxIds[j + 1] !== temp) {
        step++
        console.log(`${step}: ${temp} is inserted here\n`)
        allSteps.push({ boxIds: this.removeDuplicateIds(boxIds), step, i, j, action: 'insert', temp });
      }
      boxIds[j + 1] = temp;
    }
    step++
    console.log(`${step}: insertion sort complete`)
    allSteps.push({ boxIds: [...boxIds], step, action: 'end'});
    this.setState({
      allSteps,
      iteration: 1,
      currentStep: 1,
      i: 0,
      j: -1,
      action: 'examine'
    })
  }

  nextBubbleStep = () => {
    const { i, j, iteration, boxIds, action } = this.state;
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
        i: 0,
        j: 1
      });
    } else if (i === n - iteration && action === 'compare' && !shouldSwap) {
      console.log('else if 4')
      this.setState({
        iteration: iteration + 1,
        action: 'compare',
        i: 0,
        j: 1
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
        i: i + 1,
        j: j + 1
      });
    } else {
      console.log('else')
      this.setState({
        i: i + 1,
        j: j + 1
      });
    }
  }

  swapNumbers = (boxIds, i) => {
    if (boxIds[i] > boxIds[i + 1]) {
      [boxIds[i], boxIds[i + 1]] = [boxIds[i + 1], boxIds[i]]; 
    }
    return boxIds;
  }

  nextInsertionStep = () => {
    const { currentStep, allSteps } = this.state;
    const nextStep = currentStep + 1;
    console.log('step:', nextStep) 
    if (nextStep < allSteps.length) {
      this.setState({
        currentStep: nextStep,
        boxIds: allSteps[nextStep].boxIds,
        i: allSteps[nextStep].i,
        j: allSteps[nextStep].j,
        action: allSteps[nextStep].action,
        temp: allSteps[nextStep].temp
      });
    }
  }

  render() {
    const showStartButton = this.state.iteration === 0 ? true : false;
    const randomBoxes = this.getBoxes();
    const tempBox = this.getTempBox();
    return (
      <section className='Demo fade-in'>
        <h2 className="Demo--h2">{this.props.algorithmName}</h2>
        <div className="explanation">
          {this.state.action !== '' &&
            <Explanation 
              algorithmName={this.props.algorithmName}
              boxIds={this.state.boxIds}
              action={this.state.action}
              i={this.state.i}
            />
          }
        </div>
        <div className="algorithm">
          {this.state.boxIds.includes(null) && tempBox}
          {randomBoxes}
          {this.state.boxIds.map((num, index) => {
            let spanClass = 'algorithm--span';
            if (this.state.action !== '' &&
                (index === this.state.i || index === this.state.i + 1) &&
                this.props.algorithmName === 'Bubble Sort') {
              spanClass = 'algorithm--span-underline';
            }
            return <span id={index} className={spanClass} key={num}></span>
          })}
        </div>
        <Buttons
          showStartButton={showStartButton}
          algorithmName={this.props.algorithmName}
          startBubbleSort={this.startBubbleSort}
          startInsertionSort={this.startInsertionSort}
          nextBubbleStep={this.nextBubbleStep}
          nextInsertionStep={this.nextInsertionStep}
        />
      </section>
    );
  }
}

export default Demo;