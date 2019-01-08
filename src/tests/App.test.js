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

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('it should have default state', () => {
    expect(wrapper.state()).toEqual({ showBubbleSort: true });
  });
  
  it('it should set showBubbleSort to false when goToInsertionSort is called',
  () => {
    expect(wrapper.state()).toEqual({ showBubbleSort: true });
    wrapper.instance().goToInsertionSort();
    expect(wrapper.state()).toEqual({ showBubbleSort: false });
  });
  
  it('it should set showBubbleSort to true when goToBubbleSort is called',
  () => {
    expect(wrapper.state()).toEqual({ showBubbleSort: true });
    wrapper.instance().goToInsertionSort();
    expect(wrapper.state()).toEqual({ showBubbleSort: false });
    wrapper.instance().goToBubbleSort();
    expect(wrapper.state()).toEqual({ showBubbleSort: true });
  });
});