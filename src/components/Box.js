import React, { Component } from 'react';
import '../styles/main.scss';

function Box(props) {
  return (
    <div className={`${props.divClass}`} >
      <span className="Box--id">{props.id}</span>
    </div>
  );
}

export default Box;