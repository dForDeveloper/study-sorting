import React, { Component } from 'react';
import '../styles/main.scss';

class Explanation extends Component {
  getExplanation = () => {
    const { boxIds, i, j, temp, animation } = this.props.step;
    switch (animation) {
      case 'compare':
        return (
          <p>compare <span>{boxIds[i]}</span> and <span>{boxIds[j]}</span></p>
        );
      case 'compare-adjacent':
        return (
          <p>compare <span>{boxIds[j]}</span> and <span>{boxIds[i]}</span></p>
        );
      case 'swap':
        return (
          <p><span>{boxIds[i]}</span> swaps with <span>{boxIds[j]}</span></p>
        );
      case 'unsorted':
        return (
          <p>
            <span>{boxIds[i]}</span> and <span>{boxIds[j]}</span>
            {' are out of order'}
          </p>
        );
      case 'sorted':
        return (
          <p>
            <span>{boxIds[i]}</span> and <span>{boxIds[j]}</span>
            {' are in the correct order'}
          </p>
        );
      case 'stop-first-comparison':
        return (
          <p>
            <span>{boxIds[j]}</span> and <span>{temp}</span>
            {' are in the correct order'}
          </p>
        );
      case 'stop-multiple-comparisons':
        return (
          <p>
            <span>{boxIds[j]}</span> and <span>{temp}</span>
            {' are in the correct order'}
          </p>
        );
      case 'examine':
        return (
          <div>
            <p>compare <span>{boxIds[i]}</span>
              {' with the elements to its left'}</p>
            <p>and stop at the first smaller element</p>
          </div>
        );
      case 'nothing-on-left':
      case 'less-than-all':
        return (
          <p>
            there are no numbers to compare with <span>{temp}</span>
          </p>
        );
      case 'compare-again':
        return (
          <p>compare <span>{boxIds[j]}</span> and <span>{temp}</span></p>
        );
      case 'greater-first-comparison':
      case 'greater-multiple-comparisons':
        return (
          <p>
            <span>{boxIds[j]}</span> is greater than <span>{temp}</span>
          </p>
        );
      case 'shift':
        return <p><span>{boxIds[j]}</span> shifts to the right</p>;
      case 'insert':
        return <p><span>{temp}</span> gets inserted</p>;
      case 'end':
        return <p><span>the algorithm is complete</span></p>;
      default:
        return <p></p>;
    }
  }

  render() {
    const explanation = this.getExplanation();
    return (
      <div className="explanation">{explanation}</div>
    );
  }
}

export default Explanation;