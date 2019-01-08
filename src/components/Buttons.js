import React from 'react';
import '../styles/main.scss';

function Buttons(props) {
  return (
    <footer className="footer">
      {!props.demoStarted && 
        <div className="btn-container">
          <button className="btn-start" onClick={props.startAlgorithm}>
            start
          </button>
        </div>
      }
      {props.demoStarted && 
        <div className="btn-container">
          {props.currentStep > 1 &&
            <button className="btn-back" onClick={() => props.goToStep(-1)}>
              back
            </button>
          }
          <button className="btn-start" onClick={props.restartDemo}>
            restart
          </button>
          {props.currentStep !== props.lastStep &&
            <button className="btn-next" onClick={() => props.goToStep(1)}>
              next
            </button>
          }
        </div>
      }
    </footer>
  )
}

export default Buttons;