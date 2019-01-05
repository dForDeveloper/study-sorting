import React, { Component } from 'react';
import '../styles/main.scss';

class Box extends Component {
  render() {
    const { id, index , i } = this.props;
    let divClass;
    switch (index) {
      case i:
        divClass = 'Box highlight';
        break;
      case i + 1:
        divClass = 'Box highlight';
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