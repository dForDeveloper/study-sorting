import React, { Component } from 'react';
import Box from './Box';
import Buttons from './Buttons';
import Explanation from './Explanation';
import algorithms from '../utils/algorithms';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxIDs: [1, 2, 3, 4, 5, 6, 7, 8],
      allSteps: [],
      currentStep: null
    };
  }

  componentDidMount = () => {
    const { boxIDs } = this.state;
    this.fisherYatesShuffle(boxIDs);
    this.setState({ boxIDs });
  }

  fisherYatesShuffle = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
      const randomIndex = Math.floor((Math.random() * (arr.length - i))) + i;
      [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
  }

  getTempBox = (stepData) => {
    const { temp, boxIDs, i, j, animation } = stepData;
    return boxIDs.map((num, index) => {
      let divClass = 'Box Box-temp';
      if (animation === 'insert') {
        divClass += ` insert${i - (j + 1)}`;
      } else if (animation === 'compare-again') {
        divClass += ' examine';
      } else if (animation === 'less-than-all' ||
          animation === 'stop-mult-comparisons') {
        divClass += ' sorted';
      }
      if (index === i) {
        return <Box id={temp} divClass={divClass} key={temp} />;
      } else {
        return <div key={num}></div>;
      }
    })
  }

  getInitialBoxes = () => {
    return this.state.boxIDs.map(num => {
      return <Box id={num} divClass='Box' key={num} />
    });
  }

  getDemoBoxes = (stepData) => {
    const { i, j, iteration, boxIDs, animation } = stepData;
    let [iClass, jClass] = this.getClassNames(animation);
    return boxIDs.map((num, index) => {
      let divClass = 'Box ';
      if (index >= boxIDs.length - iteration || animation === 'end') {
        divClass += 'Box-final-position';
      } else if (num === null) {
        divClass = 'Box-empty'
      } else if (index === i) {
        divClass += iClass;
      } else if (index === j) {
        divClass += jClass;
      }
      return <Box id={num} divClass={divClass} key={num} />;
    });
  }

  getClassNames = (animation) => {
    switch (animation) {
      case 'swap':
        return ['right-swap', 'left-swap'];
      case 'unsorted':
        return ['unsorted', 'unsorted'];
      case 'sorted':
      case 'stop-first-comparison':
        return ['sorted', 'sorted'];
      case 'stop-mult-comparisons':
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
      case 'greater-mult-comparisons':
        return ['', 'unsorted'];
      case 'shift':
        return ['', 'shift-right'];
      default:
      return ['', ''];
    }
  }

  startDemo = () => {
    const { boxIDs } = this.state;
    const { algorithmName } = this.props;
    let allSteps = algorithms[algorithmName].getSteps(boxIDs);
    this.setState({ allSteps, currentStep: 1 });
  }

  goToStep = (increment) => {
    const { currentStep, allSteps } = this.state;
    const nextStep = currentStep + increment;
    if (0 < nextStep && nextStep < allSteps.length) {
      this.setState({ currentStep: nextStep });
    }
  }

  restartDemo = () => {
    this.setState({
      allSteps: [],
      currentStep: null
    })
  }

  render() {
    const { allSteps, currentStep } = this.state;
    const { algorithmName } = this.props;
    const demoStarted = this.state.allSteps.length > 0 ? true: false;
    const { boxIDs } = demoStarted ? allSteps[currentStep] : this.state; 
    return (
      <section className='Demo fade-in'>
        <h2 className="Demo--h2">{this.props.algorithmName}</h2>
        <div className="explanation">
          {!demoStarted && 
            <p className="p--description">
              {algorithms[algorithmName].description}
            </p>}
          {demoStarted &&
            <Explanation step={allSteps[currentStep]} />}
        </div>
        <div className="algorithm">
          {boxIDs.includes(null) && this.getTempBox(allSteps[currentStep])}
          {demoStarted && this.getDemoBoxes(allSteps[currentStep])}
          {!demoStarted && this.getInitialBoxes()}
        </div>
        <Buttons
          demoStarted={demoStarted}
          currentStep={this.state.currentStep}
          lastStep={this.state.allSteps.length - 1}
          startDemo={this.startDemo}
          goToStep={this.goToStep}
          restartDemo={this.restartDemo}
        />
      </section>
    );
  }
}

export default Demo;