import React, { Component } from 'react';
import '../styles/main.scss';

class Box extends Component {
  render() {
    let { id, index } = this.props;
    let divClass = 'Box';
    if (index === 0) {
      divClass += ' right-swap';
    } else if (index === 1) {
      divClass += ' left-swap';
    }
    return (
      <div className={divClass}>
        <span className="Box--id">{id}</span>
      </div>
    );
  }
}

export default Box;