import React from 'react';
import Buttons from '../components/Buttons';
import { shallow } from 'enzyme';

const startAlgorithmMock = jest.fn();
const goForwardMock = jest.fn();

describe('Buttons', () => {
  it('should match the snapshot when is showStartButton is false', () => {
    let wrapper = shallow(
      <Buttons
        showStartButton={false}
        startAlgorithm={startAlgorithmMock}
        goForward={goForwardMock}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});