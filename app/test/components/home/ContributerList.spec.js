import React from 'react';
import {shallow} from 'enzyme';

import Spinner from '../../../src/components/commons/Spinner';
import ContributerList from '../../../src/components/home/ContributerList';
import ContributerItem from '../../../src/components/home/ContributerItem';

const contributors = [
  {
    id: 1,
    html_url: 'http://html-url-1.com',
    avatar_url: 'http://avatar_url-1.com'
  },
  {
    id: 2,
    html_url: 'http://html-url-2.com',
    avatar_url: 'http://avatar_url-2.com'
  }
];

describe('<ContributerList />', ()=> {

  it('renders home component successfully', ()=> {
    const wrapper = shallow(<ContributerList />);
    expect(wrapper.length).toEqual(1);
  });

  it('renders <ContributerItem /> when value are provided to the contributers', ()=> {
    const wrapper = shallow(<ContributerList />);
    wrapper.setState({isLoading: false, contributers: contributors});
    setTimeout(()=>expect(wrapper.find(<ContributerItem/>).length).toEqual(2), 0);
  });

  it('does not render <ContributerItem /> when value are provided to the contributers', ()=> {
    const wrapper = shallow(<ContributerList />);
    expect(wrapper.find(<ContributerItem imageUrl={'dummyImageUrl'}
                                         profileUrl={'dummyProfileUrl'}/>).length).toEqual(0);
  });

  it('renders <Spinner /> when state isLoading is true', ()=> {
    const wrapper = shallow(<ContributerList />);
    wrapper.setState({isLoading: true});
    setTimeout(()=>expect(wrapper.find(<Spinner />).length).toEqual(1), 0);
  });

  it('does not render <Spinner /> when state isLoading is true', ()=> {
    const wrapper = shallow(<ContributerList />);
    wrapper.setState({isLoading: false});
    setTimeout(()=>expect(wrapper.find(<Spinner />).length).toEqual(0), 0);
  });

});
