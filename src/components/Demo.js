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
      iteration: null,
      animation: '',
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
    const { temp, boxIds, i, j, animation } = this.state;
    return boxIds.map((num, index) => {
      let divClass = 'Box temp';
      if (animation === 'insert') {
        divClass += ` insert${i - (j + 1)}`;
      } else if (animation === 'compare-again') {
        divClass += ' examine';
      } else if (animation === 'less-than-all' || (animation === 'stop-multiple-comparisons')) {
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
    const { i, j, iteration, boxIds, animation } = this.state;
    let [iClass, jClass] = this.getClassNames();
    return boxIds.map((num, index) => {
      let divClass = 'Box ';
      if (index >= boxIds.length - iteration || animation === 'end') {
        divClass += 'Box-final-position';
      } else if (num === null) {
        divClass = 'Box-empty'
      } else if (index === i) {
        divClass += iClass;
      } else if (index === j && num !== null) {
        divClass += jClass;
      }
      return <Box id={num} divClass={divClass} key={num} />;
    });
  }

  getClassNames = () => {
    switch (this.state.animation) {
      case 'swap':
        return ['right-swap', 'left-swap'];
      case 'unsorted':
        return ['unsorted', 'unsorted'];
      case 'sorted':
      case 'stop-first-comparison':
        return ['sorted', 'sorted'];
      case 'stop-multiple-comparisons':
        return ['', 'sorted'];
      case 'examine':
      case 'move':
        return ['examine', ''];
      case 'nothing-on-left':
        return ['sorted', ''];
      case 'compare-adjacent':
        return ['examine', 'examine'];
      case 'compare-again':
        return ['', 'examine'];
      case 'greater-first-comparison':
        return ['move-up unsorted', 'unsorted'];
      case 'greater-multiple-comparisons':
        return ['', 'unsorted'];
      case 'shift':
        return ['', 'shift-right'];
      default:
      return ['', ''];
    }
  }

  startBubbleSort = () => {
    const [...boxIds] = this.state.boxIds;
    const allSteps = [];
    let step = 0;
    let iteration = 0;
    allSteps.push({ boxIds: [...boxIds], step, iteration, animation: '' })
    for(iteration = 0; iteration < boxIds.length; iteration++) {    
      for(let i = 0; i < boxIds.length - iteration - 1; i++) {
        const j = i + 1;
        step++
        allSteps.push({ boxIds: [...boxIds], step, iteration, animation: 'compare-adjacent', i, j })
        if(boxIds[i] > boxIds[j]) {
          step++;
          allSteps.push({ boxIds: [...boxIds], step, iteration, animation: 'unsorted', i, j })
          step++;
          allSteps.push({ boxIds: [...boxIds], step, iteration, animation: 'swap', i, j });
          [boxIds[i], boxIds[j]] = [boxIds[j], boxIds[i]];
        } else {
          step++;
          allSteps.push({ boxIds: [...boxIds], step, iteration, animation: 'sorted', i, j })
        }
      }    
    }
    step++;
    allSteps.push({ boxIds: [...boxIds], step, iteration, animation: 'end' })
    this.setState({
      allSteps,
      iteration: 0,
      currentStep: 1,
      i: 0,
      j: 1,
      animation: 'compare-adjacent'
    })
  }

  startInsertionSort = () => {
    const [...boxIds] = this.state.boxIds;
    const allSteps = [];
    let step = 0;
    allSteps.push({ boxIds: [...boxIds], step, animation: '' })
    for(let i = 0; i < boxIds.length; i++) {
      let temp = boxIds[i];
      let j = i - 1;
      step++;
      allSteps.push({ boxIds: [...boxIds], step, i, j, animation: 'examine', temp });
      if(j === -1) {
        step++;
        allSteps.push({ boxIds: [...boxIds], step, i, j, animation: 'nothing-on-left', temp });
      } else {
        step++
        allSteps.push({ boxIds: [...boxIds], step, i, j, animation: 'compare-adjacent', temp });
        if(j >= 0 && boxIds[j] < temp) {
          step++
          allSteps.push({ boxIds: [...boxIds], step, i, j, animation: 'stop-first-comparison', temp });
        }
      }
      while(j >= 0 && boxIds[j] > temp) {
        step++;
        if (i - j === 1) {
          allSteps.push({ boxIds: this.removeDuplicateIds(boxIds), step, i, j, animation: 'greater-first-comparison', temp });
        } else {
          allSteps.push({ boxIds: this.removeDuplicateIds(boxIds), step, i, j, animation: 'greater-multiple-comparisons', temp });
        }
        boxIds[j + 1] = boxIds[j];
        step++;
        allSteps.push({ boxIds: this.removeDuplicateIds(boxIds, true), step, i, j, animation: 'shift', temp });
        j--;
        if(j === -1) {
          step++;
          allSteps.push({ boxIds: this.removeDuplicateIds(boxIds), step, i, j, animation: 'less-than-all', temp });
        } else {
          step++;
          allSteps.push({ boxIds: this.removeDuplicateIds(boxIds), step, i, j, animation: 'compare-again', temp });
          if(j >= 0 && boxIds[j] < temp) {
          step++
          allSteps.push({ boxIds: this.removeDuplicateIds(boxIds), step, i, j, animation: 'stop-multiple-comparisons', temp });
          }
        }
      }
      if(boxIds[j + 1] !== temp) {
        step++
        allSteps.push({ boxIds: this.removeDuplicateIds(boxIds), step, i, j, animation: 'insert', temp });
      }
      boxIds[j + 1] = temp;
    }
    step++
    allSteps.push({ boxIds: [...boxIds], step, animation: 'end'});
    this.setState({
      allSteps,
      iteration: 0,
      currentStep: 1,
      i: 0,
      j: -1,
      animation: 'examine'
    })
  }

  swapNumbers = (boxIds, i) => {
    if (boxIds[i] > boxIds[i + 1]) {
      [boxIds[i], boxIds[i + 1]] = [boxIds[i + 1], boxIds[i]]; 
    }
    return boxIds;
  }

  nextBubbleStep = () => {
    const { currentStep, allSteps } = this.state;
    const nextStep = currentStep + 1;
    console.log('step:', nextStep) 
    if (nextStep < allSteps.length) {
      this.setState({
        currentStep: nextStep,
        boxIds: allSteps[nextStep].boxIds,
        i: allSteps[nextStep].i,
        j: allSteps[nextStep].j,
        animation: allSteps[nextStep].animation,
        iteration: allSteps[nextStep].iteration
      });
    }
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
        animation: allSteps[nextStep].animation,
        temp: allSteps[nextStep].temp
      });
    }
  }

  render() {
    const showStartButton = this.state.iteration === null ? true : false;
    const randomBoxes = this.getBoxes();
    const tempBox = this.getTempBox();
    return (
      <section className='Demo fade-in'>
        <h2 className="Demo--h2">{this.props.algorithmName}</h2>
        <div className="explanation">
          {this.state.animation !== '' &&
            <Explanation 
              algorithmName={this.props.algorithmName}
              boxIds={this.state.boxIds}
              animation={this.state.animation}
              i={this.state.i}
            />
          }
        </div>
        <div className="algorithm">
          {this.state.boxIds.includes(null) && tempBox}
          {randomBoxes}
          {this.state.boxIds.map((num, index) => {
            let spanClass = 'algorithm--span';
            if (this.state.animation !== '' &&
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