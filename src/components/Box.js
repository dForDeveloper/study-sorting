import React, { Component } from 'react';
import '../styles/main.scss';

class Box extends Component {
  render() {
    const { id, index , i, action, boxIds } = this.props;
    const shouldSwap = boxIds[i] > boxIds[i + 1];
    let [divClass, iClass, jClass] = ['', '', ''];
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
    switch (index) {
      case i:
        divClass = `Box ${iClass} Box-underlined`;
        break;
      case i + 1:
        divClass = `Box ${jClass}`;
        break;
      default:
        divClass = 'Box';
        break;
    }
    return (
      <div className={divClass}>
        <span className="Box--id">{id}</span>
      </div>
    );
  }
}

export default Box;