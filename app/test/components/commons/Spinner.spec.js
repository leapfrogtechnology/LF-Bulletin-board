import React from 'react';
import {shallow} from 'enzyme';

import Spinner from '../../../src/components/commons/Spinner';

describe('<Spinner />', ()=> {
  it('renders App component successfully', ()=> {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.length).toEqual(1);
  });

  it('has div with className loader', ()=> {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.find('.loader').length).toEqual(1);
  });

  it('has div with className loader with some value', ()=> {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.find('.loader').text()).toEqual('Loading...');
  });
});
