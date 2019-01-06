import React from 'react';
import Explanation from '../components/Explanation';
import { shallow } from 'enzyme';

describe('Explanation', () => {
  it('should match the snapshot', () => {
    let wrapper = shallow(
      <Explanation
        boxIds={[1, 2, 3 , 4, 5, 6, 7, 8]}
        action="compare"
        i={0}
      />
    );
  });
});