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

  it('should match the snapshot when displayedAlgorithm is Bubble Sort', () => {
    expect(wrapper.state()).toEqual({ displayedAlgorithm: 'Bubble Sort' });
    expect(wrapper).toMatchSnapshot();
  });

  it('it should have default state', () => {
    expect(wrapper.state()).toEqual({ displayedAlgorithm: 'Bubble Sort' });
  });
  
  it('it should set displayedAlgorithm to Insertion Sort when right arrow is clicked',
  () => {
    expect(wrapper.state()).toEqual({ displayedAlgorithm: 'Bubble Sort'  });
    wrapper.find('.main--right-arrow').simulate('click');
    expect(wrapper.state()).toEqual({ displayedAlgorithm: 'Insertion Sort' });
  });
  
  it('should match the snapshot when displayedAlgorithm is Insertion Sort', () => {
    expect(wrapper.state()).toEqual({ displayedAlgorithm: 'Bubble Sort' });
    wrapper.find('.main--right-arrow').simulate('click');
    expect(wrapper.state()).toEqual({ displayedAlgorithm: 'Insertion Sort' });
    expect(wrapper).toMatchSnapshot();
  });

  it('it should set showBubbleSort to true when left arrow is clicked',
  () => {
    expect(wrapper.state()).toEqual({ displayedAlgorithm: 'Bubble Sort' });
    wrapper.find('.main--right-arrow').simulate('click');
    expect(wrapper.state()).toEqual({ displayedAlgorithm: 'Insertion Sort' });
    wrapper.find('.main--left-arrow').simulate('click');
    expect(wrapper.state()).toEqual({ displayedAlgorithm: 'Bubble Sort' });
  });
});