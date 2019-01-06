import React from 'react';
import '../styles/main.scss';

function Explanation(props) {
  const { boxIds, action, i } = props;
  if (action === 'swap') {
    return (
      <div className="explanation">
        <p>
          <span>{boxIds[i]}</span> swaps with <span>{boxIds[i + 1]}</span>
        </p>
      </div>
    );
  } else if (action === 'compare' && boxIds[i] < boxIds[i + 1]) {
    return (
      <div className="explanation">
        <p>
          compare <span>{boxIds[i]}</span> and <span>{boxIds[i + 1]}</span>
        </p>
        <p>they are in order</p>
      </div>
    );
  } else if (action === 'compare') {
    return (
      <div className="explanation">
        <p>
          compare <span>{boxIds[i]}</span> and <span>{boxIds[i + 1]}</span>
        </p>
        <p>they are out of order</p>
      </div>
    );
  }
}

export default Explanation;