import React, { Component } from 'react';
import '../styles/main.scss';

class Box extends Component {
  render() {
    return (
      <div className={`${this.props.divClass}`} >
        <span className="Box--id">{this.props.id}</span>
      </div>
    );
  }
}

export default Box;