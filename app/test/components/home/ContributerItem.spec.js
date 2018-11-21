import React from 'react';
import {shallow} from 'enzyme';

import ContributerItem from '../../../src/components/home/ContributerItem';

describe('<ContributerItem />', ()=> {

  it('renders home component successfully', ()=> {
    const wrapper = shallow(<ContributerItem imageUrl={'dummyImageUrl'} profileUrl={'dummyProfileUrl'}/>);
    expect(wrapper.length).toEqual(1);
  });

  it('should have <a> tag', ()=> {
    const wrapper = shallow(<ContributerItem imageUrl={'dummyImageUrl'} profileUrl={'dummyProfileUrl'}/>);
    expect(wrapper.find('a').length).toEqual(1);
  });

  it('should have href same as sent in the props', ()=> {
    const wrapper = shallow(<ContributerItem imageUrl={'dummyImageUrl'} profileUrl={'dummyProfileUrl'}/>);
    expect(wrapper.find('a').href).toEqual(wrapper.prop('profileUrl'));
  });

  it('should have img tag', ()=> {
    const wrapper = shallow(<ContributerItem imageUrl={'dummyImageUrl'} profileUrl={'dummyProfileUrl'}/>);
    expect(wrapper.find('img').length).toEqual(1);
  });

  it('should have img src same as sent in the props', ()=> {
    const wrapper = shallow(<ContributerItem imageUrl={'dummyImageUrl'} profileUrl={'dummyProfileUrl'}/>);
    expect(wrapper.find('img').src).toEqual(wrapper.prop('imageUrl'));
  });

});
