import React from 'react';
import '../styles/main.scss';

function Buttons(props) {
  return (
    <footer className="footer">
      {props.showStartButton && 
        <div>
          <button className="footer--btn" onClick={props.startAlgorithm}>
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
            restart
          </button>
          <button className="footer--btn" onClick={props.nextStep}>
            next
          </button>
        </div>
      }
    </footer>
  )
}

export default Buttons;