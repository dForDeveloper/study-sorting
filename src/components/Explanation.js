import React, { Component } from 'react';

class Explanation extends Component {
  getExplanation = () => {
    const { boxIDs, i, j, temp, animation } = this.props.step;
    switch (animation) {
      case 'compare':
        return (
          <p>compare <span>{boxIDs[i]}</span> and <span>{boxIDs[j]}</span></p>
        );
      case 'compare-adjacent':
        return (
          <p>compare <span>{boxIDs[j]}</span> and <span>{boxIDs[i]}</span></p>
        );
      case 'swap':
        return (
          <p><span>{boxIDs[i]}</span> swaps with <span>{boxIDs[j]}</span></p>
        );
      case 'unsorted':
        return (
          <p>
            <span>{boxIDs[i]}</span> and <span>{boxIDs[j]}</span>
            {' are out of order'}
          </p>
        );
      case 'sorted':
        return (
          <p>
            <span>{boxIDs[i]}</span> and <span>{boxIDs[j]}</span>
            {' are in the correct order'}
          </p>
        );
      case 'stop-first-comparison':
        return (
          <p>
            <span>{boxIDs[j]}</span> and <span>{temp}</span>
            {' are in the correct order'}
          </p>
        );
      case 'stop-mult-comparisons':
        return (
          <p>
            <span>{boxIDs[j]}</span> and <span>{temp}</span>
            {' are in the correct order'}
          </p>
        );
      case 'examine':
        return (
          <p>
            compare <span>{boxIDs[i]}</span> with the elements to its left
          </p>
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
          <p>compare <span>{boxIDs[j]}</span> and <span>{temp}</span></p>
        );
      case 'greater-first-comparison':
      case 'greater-mult-comparisons':
        return (
          <p>
            <span>{boxIDs[j]}</span> is greater than <span>{temp}</span>
          </p>
        );
      case 'shift':
        return <p><span>{boxIDs[j]}</span> shifts to the right</p>;
      case 'insert':
        return <p><span>{temp}</span> gets inserted</p>;
      case 'end':
        return <p>the array is sorted</p>;
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