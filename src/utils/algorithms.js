const algorithms = {
  'Bubble Sort': {
    description: 'Bubble sort works by repeatedly swapping adjacent elements' +
    ' if they are in the wrong order.',
    getSteps: (startingNumbers) => {
      const [...boxIDs] = startingNumbers;
      const allSteps = [];
      let iteration, i, j;
      const saveStep = (animation) => {
        allSteps.push({ boxIDs: [...boxIDs], animation, iteration, i, j });
      }
      saveStep('');
      for (iteration = 0; iteration < boxIDs.length; iteration++) {    
        for (i = 0; i < boxIDs.length - iteration - 1; i++) {
          j = i + 1;
          saveStep('compare');
          if (boxIDs[i] > boxIDs[j]) {
            saveStep('unsorted');
            saveStep('swap');
            [boxIDs[i], boxIDs[j]] = [boxIDs[j], boxIDs[i]];
          } else {
            saveStep('sorted');
          }
        }    
      }
      saveStep('end');
      return allSteps;
    }
  },
  'Insertion Sort': {
    description: 'Insertion sort works by sorting the left side of an array ' +
    'one element at a time.',
    getSteps: (startingNumbers) => {
      const [...boxIDs] = startingNumbers;
      const removeDuplicateIds = (arr, animation) => {
        let [...boxIDs] = arr;
        for (let i = 0; i < boxIDs.length - 1; i++) {
          if (boxIDs[i] === boxIDs[i + 1] && animation !== 'shift') {
            boxIDs[i] = null;
          } else if (boxIDs[i] === boxIDs[i + 1] && animation === 'shift') {
            boxIDs[i + 1] = null;
          }
        }
        return boxIDs;
      }
      const allSteps = [];
      let temp, i, j;
      const saveStep = (animation) => {
        allSteps.push({
          boxIDs: removeDuplicateIds([...boxIDs], animation),
          animation,
          temp,
          i,
          j
        });
      }
      saveStep('');
      for (i = 0; i < boxIDs.length; i++) {
        temp = boxIDs[i];
        j = i - 1;
        saveStep('examine');
        if (j === -1) {
          saveStep('nothing-on-left');
        } else {
          saveStep('compare-adjacent');
          if (j >= 0 && boxIDs[j] < temp) {
            saveStep('stop-first-comparison');
          }
        }
        while(j >= 0 && boxIDs[j] > temp) {
          if (i - j === 1) {
            saveStep('greater-first-comparison');
          } else {
            saveStep('greater-mult-comparisons');
          }
          boxIDs[j + 1] = boxIDs[j];
          saveStep('shift');
          j--;
          if (j === -1) {
            saveStep('less-than-all');
          } else {
            saveStep('compare-again');
            if (j >= 0 && boxIDs[j] < temp) {
              saveStep('stop-mult-comparisons');
            }
          }
        }
        if(boxIDs[j + 1] !== temp) {
          saveStep('insert');
        }
        boxIDs[j + 1] = temp;
      }
      saveStep('end');
      return allSteps;
    }
  }
}

export default algorithms;