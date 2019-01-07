import React from 'react';
import '../styles/main.scss';

function Explanation(props) {
  // const { boxIds, action, i , algorithmName } = props;
  let explanation = '';
  return (
    <div className="explanation">
      <p>
        <span>{explanation}</span>
      </p>
    </div>
  )
  // if (action === 'swap' && algorithmName === 'Bubble Sort') {
  //   return (
  //     <div className="explanation">
  //       <p>
  //         <span>{boxIds[i]}</span> swaps with <span>{boxIds[i + 1]}</span>
  //       </p>
  //     </div>
  //   );
  // } else if (action === 'compare' && boxIds[i] < boxIds[i + 1] &&
  //     algorithmName === 'Bubble Sort') {
  //   return (
  //     <div className="explanation">
  //       <p>
  //         compare <span>{boxIds[i]}</span> and <span>{boxIds[i + 1]}</span>
  //       </p>
  //       <p>they are in order</p>
  //     </div>
  //   );
  // } else if (action === 'compare' && algorithmName === 'Bubble Sort') {
  //   return (
  //     <div className="explanation">
  //       <p>
  //         compare <span>{boxIds[i]}</span> and <span>{boxIds[i + 1]}</span>
  //       </p>
  //       <p>they are out of order</p>
  //     </div>
  //   );
  // } else if (algorithmName === 'Insertion Sort') {
  //   return (
  //     <div className="explanation">
  //       <p>insertion sort explanation</p>
  //     </div>
  //   )
  // }
}

export default Explanation;