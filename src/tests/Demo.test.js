import React from 'react';
import Demo from '../components/Demo';
import { shallow } from 'enzyme';

const stepData = {
  animation: 'compare',
  boxIds: [5, 1, 4, 7, 3, 6, 8, 2],
  i: 0,
  iteration: 0,
  j: 1
}

describe('Demo', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Demo algorithmName='Bubble Sort' />);
    wrapper.setState({ boxIds: [5, 1, 4, 7, 3, 6, 8, 2] });
  });

  it('should match the snapshot when allSteps.length === 0', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have default state', () => {
    expect(wrapper.state('boxIds').length).toEqual(8);
    expect(wrapper.state('allSteps')).toEqual([]);
    expect(wrapper.state('currentStep')).toEqual(null);
  });

  it('should not do anything crazy when fisherYatesShuffle is called', () => {
    const testArray = [1, 2, 3, 4, 5, 6, 7, 8];
    wrapper.instance().fisherYatesShuffle(testArray);
    expect(testArray.length).toEqual(8);
  });

  it('should remove duplicate IDs when removeDuplicateIds is called', () => {
    const testArray = [1, 1, 3, 4, 5, 6, 7, 8];
    const arr1 = wrapper.instance().removeDuplicateIds(testArray);
    expect(arr1).toEqual([null, 1, 3, 4, 5, 6, 7, 8]);
    const arr2 = wrapper.instance().removeDuplicateIds(testArray, 'shift');
    expect(arr2).toEqual([1, null, 3, 4, 5, 6, 7, 8]);
  });

  it(`should set allSteps and currentStep when startDemo is called
  when the algorithm is Bubble Sort`, () => {
    expect(wrapper.state('allSteps')).toEqual([]);
    expect(wrapper.state('currentStep')).toEqual(null);
    wrapper.instance().startDemo();
    expect(wrapper.state('allSteps').length).toBeGreaterThan(0);
    expect(wrapper.state('currentStep')).toEqual(1);
  });

  it(`should set allSteps and currentStep when startDemo is called
  when the algorithm is Insertion Sort`, () => {
    wrapper = shallow(<Demo algorithmName='Insertion Sort' />);
    wrapper.setState({ boxIds: [5, 1, 4, 7, 3, 6, 8, 2] });
    expect(wrapper.state('allSteps')).toEqual([]);
    expect(wrapper.state('currentStep')).toEqual(null);
    wrapper.instance().startDemo();
    expect(wrapper.state('allSteps').length).toBeGreaterThan(0);
    expect(wrapper.state('currentStep')).toEqual(1);
  });

  it('should set allSteps and currentStep when restartDemo is called', () => {
    wrapper.instance().startDemo();
    expect(wrapper.state('allSteps').length).toBeGreaterThan(0);
    expect(wrapper.state('currentStep')).toEqual(1);
    wrapper.instance().restartDemo();
    expect(wrapper.state('allSteps')).toEqual([]);
    expect(wrapper.state('currentStep')).toEqual(null);
  });

  it('should set currentStep when goToStep is called', () => {
    wrapper.instance().startDemo();
    expect(wrapper.state('currentStep')).toEqual(1);
    wrapper.instance().goToStep(1);
    expect(wrapper.state('currentStep')).toEqual(2);
  });

  it('should return an array of Boxes when getInitialBoxes is called', () => {
    expect(wrapper.state('boxIds').length).toEqual(8);
    const initialBoxes = wrapper.instance().getInitialBoxes();
    expect(initialBoxes.length).toEqual(8);
  });

  it('should return an array of Boxes when getDemoBoxes is called', () => {
    const demoBoxes = wrapper.instance().getDemoBoxes(stepData);
    expect(demoBoxes.length).toEqual(8);
  });

  it('should return an array of Boxes when getTempBox is called', () => {
    const tempBoxes = wrapper.instance().getDemoBoxes(stepData);
    expect(tempBoxes.length).toEqual(8);
  });

  it('should return an array of strings when getClassNames is called', () => {
    const swap = wrapper.instance().getClassNames('swap');
    expect(swap).toEqual(['right-swap', 'left-swap']);
    const unsorted = wrapper.instance().getClassNames('unsorted');
    expect(unsorted).toEqual(['unsorted', 'unsorted']);
    const sorted = wrapper.instance().getClassNames('sorted');
    expect(sorted).toEqual(['sorted', 'sorted']);
    const sFC = wrapper.instance().getClassNames('stop-first-comparison');
    expect(sFC).toEqual(['sorted', 'sorted']);
    const sMC = wrapper.instance().getClassNames('stop-mult-comparisons');
    expect(sMC).toEqual(['', 'sorted']);
    const examine = wrapper.instance().getClassNames('examine');
    expect(examine).toEqual(['examine', '']);
    const nothing = wrapper.instance().getClassNames('nothing-on-left');
    expect(nothing).toEqual(['sorted', '']);
    const compare1 = wrapper.instance().getClassNames('compare');
    expect(compare1).toEqual(['examine', 'examine']);
    const compare2 = wrapper.instance().getClassNames('compare-adjacent');
    expect(compare2).toEqual(['examine', 'examine']);
    const compare3 = wrapper.instance().getClassNames('compare-again');
    expect(compare3).toEqual(['', 'examine']);
    const gFC = wrapper.instance().getClassNames('greater-first-comparison');
    expect(gFC).toEqual(['move-up unsorted', 'unsorted']);
    const gMC = wrapper.instance().getClassNames('greater-mult-comparisons');
    expect(gMC).toEqual(['', 'unsorted']);
    const shift = wrapper.instance().getClassNames('shift');
    expect(shift).toEqual(['', 'shift-right']);
    const defaultCase = wrapper.instance().getClassNames('');
    expect(defaultCase).toEqual(['', '']);
  });

  it('should return an array of allSteps when getBubbleSort is called', () => {
    const allSteps = wrapper.instance().getBubbleSortSteps();
    expect(allSteps.length).toBeGreaterThan(0);
  });

  it('should return an array of allSteps when getInsertionSort is called',
  () => {
    const allSteps = wrapper.instance().getInsertionSortSteps();
    expect(allSteps.length).toBeGreaterThan(0);
  });

  it('should return a string when getDescription is called', () => {
    const bubbleDesc = wrapper.instance().getDescription('Bubble Sort');
    const insertionDesc = wrapper.instance().getDescription('Insertion Sort');
    expect(bubbleDesc).toEqual('Bubble sort works by repeatedly swapping ' +
    'adjacent elements if they are in the wrong order.');
    expect(insertionDesc).toEqual('Insertion sort works by sorting the left ' +
    'side of an array one element at a time.');
  });
});