import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import { shallow } from 'enzyme';

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should match the snapshot when showBubbleSort is true', () => {
    expect(wrapper.state()).toEqual({ showBubbleSort: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('it should have default state', () => {
    expect(wrapper.state()).toEqual({ showBubbleSort: true });
  });
  
  it('it should set showBubbleSort to false when right arrow is clicked',
  () => {
    expect(wrapper.state()).toEqual({ showBubbleSort: true });
    wrapper.find('.main--right-arrow').simulate('click');
    expect(wrapper.state()).toEqual({ showBubbleSort: false });
  });
  
  it('should match the snapshot when showBubbleSort is false', () => {
    expect(wrapper.state()).toEqual({ showBubbleSort: true });
    wrapper.find('.main--right-arrow').simulate('click');
    expect(wrapper.state()).toEqual({ showBubbleSort: false });
    expect(wrapper).toMatchSnapshot();
  });

  it('it should set showBubbleSort to true when left arrow is clicked',
  () => {
    expect(wrapper.state()).toEqual({ showBubbleSort: true });
    wrapper.find('.main--right-arrow').simulate('click');
    expect(wrapper.state()).toEqual({ showBubbleSort: false });
    wrapper.find('.main--left-arrow').simulate('click');
    expect(wrapper.state()).toEqual({ showBubbleSort: true });
  });
});