import React, { Component } from 'react';
import '../styles/main.scss';

class Box extends Component {
  render() {
    if (this.props.divClass.includes('insert')) {
      
    }
    return (
      <div className={`${this.props.divClass}`} >
        <span className="Box--id">{this.props.id}</span>
      </div>
    );
  }
}

export default Box;