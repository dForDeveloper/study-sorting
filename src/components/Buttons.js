import React from 'react';
import '../styles/main.scss';

function Buttons(props) {
  let startFunction, nextFunction;
  switch (props.algorithmName) {
    case 'Insertion Sort':
      startFunction = props.startInsertionSort;
      nextFunction = props.nextInsertionStep;
      break;
    default:
      startFunction = props.startBubbleSort;
      nextFunction = props.nextBubbleStep;
      break;
  }
  return (
    <footer className="footer">
      {props.showStartButton && 
        <div>
          <button className="footer--btn" onClick={startFunction}>
            start
          </button>
        </div>
      }
      {!props.showStartButton && 
        <div>
          <button className="footer--btn" onClick={() => true}>
            back
          </button>
          <button className="footer--btn" onClick={() => true}>
            replay
          </button>
          <button className="footer--btn" onClick={nextFunction}>
            next
          </button>
        </div>
      }
    </footer>
  )
}

export default Buttons;