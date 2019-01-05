import React, { Component } from 'react';
import '../styles/main.scss';

class Box extends Component {
  render() {
    let { id } = this.props;
    return (
      <div className="Box">
        <span className="Box--id">{id}</span>
      </div>
    );
  }
}

export default Box;