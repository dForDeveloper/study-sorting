import React from 'react';
import Explanation from '../components/Explanation';
import { shallow } from 'enzyme';

const step = {
  boxIds: [8, 7, 6, 5, 4, 3, 2, 1],
  i: 0,
  j: 1,
  temp: 8,
  animation: 'compare'
};

describe('Explanation', () => {
  it('should match the snapshot', () => {
    let wrapper = shallow(
      <Explanation step={step} />
    );
  });
});