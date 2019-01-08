import React from 'react';
import '../styles/main.scss';

function Buttons(props) {
  return (
    <footer className="footer">
      {!props.demoStarted && 
        <div>
          <button className="footer--btn" onClick={props.startAlgorithm}>
            start
          </button>
        </div>
      }
      {props.demoStarted && 
        <div>
          <button className="footer--btn" onClick={() => true}>
            back
          </button>
          <button className="footer--btn" onClick={() => true}>
            restart
          </button>
          <button className="footer--btn" onClick={props.goToNextStep}>
            next
          </button>
        </div>
      }
    </footer>
  )
}

export default Buttons;