import React from 'react';
import {shallow} from 'enzyme';

import Home from '../../../src/components/home';
import GithubButtons from '../../../src/components/commons/GithubButtons';
import ContributerList from '../../../src/components/home/ContributerList';

describe('<Home />', ()=> {
  it('renders home component successfully', ()=> {
    const wrapper = shallow(<Home />);
    expect(wrapper.length).toEqual(1);
  });

  it('should have img tag', ()=> {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('img').length).toEqual(1);
  });

  it('should have h1 tag with a text', ()=>{
    const wrapper = shallow(<Home />);
    const expectedText = 'React Starter';
    expect(wrapper.find('h1').text()).toEqual(expectedText);
  });

  it('should contain <GithubButtons /> component', ()=> {
    const wrapper = shallow(<Home/>);
    expect(wrapper.find(GithubButtons).length).toEqual(1);
  });

  it('should contain <ContributerList /> component', ()=>{
    const wrapper = shallow(<Home />);
    expect(wrapper.find(ContributerList).length).toEqual(1);
  });
});
