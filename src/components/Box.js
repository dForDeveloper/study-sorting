import React, { Component } from 'react';
import '../styles/main.scss';

class Box extends Component {
  render() {
    const { id, index , i, action, boxIds } = this.props;
    const shouldSwap = boxIds[i] > boxIds[i + 1];
    let divClass;
    const iClass = action === 'swap' && shouldSwap ? 'right-swap' : 'compare';
    const jClass = action === 'swap' && shouldSwap ? 'left-swap' : 'compare';
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