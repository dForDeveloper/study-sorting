import React from 'react';
import Box from '../components/Box';
import { shallow } from 'enzyme';

describe('Box', () => {
  it('should match the snapshot', () => {
    let wrapper = shallow(
      <Box id="1" divClass="Box" key="0" />
    );
    expect(wrapper).toMatchSnapshot();
  });
});