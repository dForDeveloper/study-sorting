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

  removeDuplicateIds = (arr, animation) => {
    let [...boxIds] = arr;
    for (let i = 0; i < boxIds.length - 1; i++) {
      if (boxIds[i] === boxIds[i + 1] && animation !== 'shift') {
        boxIds[i] = null;
      } else if (boxIds[i] === boxIds[i + 1] && animation === 'shift') {
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
      } else if (animation === 'less-than-all' ||
          animation === 'stop-multiple-comparisons') {
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
        return ['examine', ''];
      case 'nothing-on-left':
        return ['sorted', ''];
      case 'compare':
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

  getBubbleSortSteps = () => {
    const [...boxIds] = this.state.boxIds;
    const allSteps = [];
    let step = -1;
    let iteration = 0;
    let i, j;
    const saveStep = (animation) => {
      step++;
      allSteps.push({ boxIds: [...boxIds], animation, step, iteration, i, j });
    }
    saveStep('');
    for(iteration = 0; iteration < boxIds.length; iteration++) {    
      for(i = 0; i < boxIds.length - iteration - 1; i++) {
        j = i + 1;
        saveStep('compare');
        if(boxIds[i] > boxIds[j]) {
          saveStep('unsorted');
          saveStep('swap');
          [boxIds[i], boxIds[j]] = [boxIds[j], boxIds[i]];
        } else {
          saveStep('sorted');
        }
      }    
    }
    saveStep('end');
    return allSteps;
  }

  getInsertionSortSteps = () => {
    const [...boxIds] = this.state.boxIds;
    const allSteps = [];
    let step = -1;
    let temp = 0;
    let i, j;
    const saveStep = (animation) => {
      step++;
      allSteps.push({
        boxIds: this.removeDuplicateIds([...boxIds], animation),
        animation,
        step,
        temp,
        i,
        j
      });
    }
    saveStep('');
    for(i = 0; i < boxIds.length; i++) {
      temp = boxIds[i];
      j = i - 1;
      saveStep('examine');
      if(j === -1) {
        saveStep('nothing-on-left');
      } else {
        saveStep('compare-adjacent');
        if(j >= 0 && boxIds[j] < temp) {
          saveStep('stop-first-comparison');
        }
      }
      while(j >= 0 && boxIds[j] > temp) {
        if (i - j === 1) {
          saveStep('greater-first-comparison');
        } else {
          saveStep('greater-multiple-comparisons');
        }
        boxIds[j + 1] = boxIds[j];
        saveStep('shift');
        j--;
        if(j === -1) {
          saveStep('less-than-all');
        } else {
          saveStep('compare-again');
          if(j >= 0 && boxIds[j] < temp) {
            saveStep('stop-multiple-comparisons');
          }
        }
      }
      if(boxIds[j + 1] !== temp) {
        saveStep('insert');
      }
      boxIds[j + 1] = temp;
    }
    saveStep('end');
    return allSteps;
  }

  startAlgorithm = () => {
    let j, animation, allSteps;
    if (this.props.algorithmName === 'Bubble Sort') {
      allSteps = this.getBubbleSortSteps();
      animation = 'compare';
    } else if (this.props.algorithmName === 'Insertion Sort') {
      allSteps = this.getInsertionSortSteps();
      animation = 'examine';
    }
    this.setState({
      allSteps,
      currentStep: 1,
      i: 0,
      j,
      animation,
      iteration: 0
    });
  }

  nextStep = () => {
    const { currentStep, allSteps } = this.state;
    const nextStep = currentStep + 1;
    if (nextStep < allSteps.length) {
      this.setState({
        currentStep: nextStep,
        boxIds: allSteps[nextStep].boxIds,
        i: allSteps[nextStep].i,
        j: allSteps[nextStep].j,
        animation: allSteps[nextStep].animation,
        iteration: allSteps[nextStep].iteration,
        temp: allSteps[nextStep].temp
      });
    }
  }

  render() {
    const showStartButton = this.state.allSteps.length === 0 ? true : false;
    const randomBoxes = this.getBoxes();
    const tempBox = this.getTempBox();
    return (
      <section className='Demo fade-in'>
        <h2 className="Demo--h2">{this.props.algorithmName}</h2>
        <div className="explanation">
          {!showStartButton &&
            <Explanation step={this.state.allSteps[this.state.currentStep]} />}
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
          startAlgorithm={this.startAlgorithm}
          nextStep={this.nextStep}
        />
      </section>
    );
  }
}

export default Demo;