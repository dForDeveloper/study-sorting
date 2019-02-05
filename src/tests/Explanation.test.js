import React from 'react';
import Explanation from '../components/Explanation';
import { shallow } from 'enzyme';

const step = {
  boxIDs: [8, 7, 6, 5, 4, 3, 2, 1],
  i: 0,
  j: 1,
  temp: 5,
  animation: ''
};

describe('Explanation', () => {
  afterEach(() => {
    expect(shallow(<Explanation step={step} />)).toMatchSnapshot();
  })

  it('should match snapshot for "compare" case', () => {
    step.animation = 'compare';
  });

  it('should match snapshot for "compare-adjacent" case', () => {
    step.animation = 'compare-adjacent';
  });

  it('should match snapshot for "swap" case', () => {
    step.animation = 'swap';
  });

  it('should match snapshot for "unsorted" case', () => {
    step.animation = 'unsorted';
  });

  it('should match snapshot for "sorted" case', () => {
    step.animation = 'sorted';
  });

  it('should match snapshot for "stop-first-comparison" case', () => {
    step.animation = 'stop-first-comparison';
  });

  it('should match snapshot for "stop-mult-comparisons" case', () => {
    step.animation = 'stop-mult-comparisons';
  });
  it('should match snapshot for "examine" case', () => {
    step.animation = 'examine';
  });

  it('should match snapshot for "nothing-on-left" case', () => {
    step.animation = 'nothing-on-left';
  });

  it('should match snapshot for "less-than-all" case', () => {
    step.animation = 'less-than-all';
  });

  it('should match snapshot for "compare-again" case', () => {
    step.animation = 'compare-again';
  });

  it('should match snapshot for "greater-first-comparison" case', () => {
    step.animation = 'greater-first-comparison';
  });

  it('should match snapshot for "greater-mult-comparisons" case', () => {
    step.animation = 'greater-mult-comparisons';
  });

  it('should match snapshot for "shift" case', () => {
    step.animation = 'shift';
  });

  it('should match snapshot for "insert" case', () => {
    step.animation = 'insert';
  });

  it('should match snapshot for "end" case', () => {
    step.animation = 'end';
  });

  it('should match snapshot for default case', () => {
    step.animation = '';
  });
});