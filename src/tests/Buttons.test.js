import React from 'react';
import Buttons from '../components/Buttons';
import { shallow } from 'enzyme';

const startDemoMock = jest.fn();
const goToStepMock = jest.fn();
const restartDemoMock = jest.fn();

describe('Buttons', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Buttons
          demoStarted={true}
          currentStep={10}
          lastStep={20}
          startDemo={startDemoMock}
          goToStep={goToStepMock}
          restartDemo={restartDemoMock}
        />
    );
  });

  it('should match the snapshot when is showStartButton is false', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call startDemo when the start button is clicked', () => {
    wrapper = shallow(
      <Buttons
          demoStarted={false}
          currentStep={10}
          lastStep={20}
          startDemo={startDemoMock}
          goToStep={goToStepMock}
          restartDemo={restartDemoMock}
        />
    );
    wrapper.find('.btn-start').simulate('click');
    expect(startDemoMock).toBeCalled();
  });

  it('should call restartDemo when the restart button is clicked', () => {
    wrapper.find('.btn-restart').simulate('click');
    expect(restartDemoMock).toBeCalled();
  });
  
  it('should call goToStep with -1 when the back button is clicked', () => {
    wrapper.find('.btn-back').simulate('click');
    expect(goToStepMock).toHaveBeenCalledWith(-1);
  });
  
  it('should call goToStep with 1 when the next button is clicked', () => {
    wrapper.find('.btn-next').simulate('click');
    expect(goToStepMock).toHaveBeenCalledWith(1);
  });
});