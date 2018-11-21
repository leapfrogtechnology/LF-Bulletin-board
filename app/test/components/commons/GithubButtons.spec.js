import React from 'react';
import {shallow} from 'enzyme';

import GithubButtons from '../../../src/components/commons/GithubButtons';

describe('<GithubButtons />', ()=> {
  it('renders App component successfully', ()=> {
    const wrapper = shallow(<GithubButtons user={'dummyUser'} repo={'dummyRepo'}/>);
    expect(wrapper.length).toEqual(1);
  });

  it('renders two iframes', ()=> {
    const wrapper = shallow(<GithubButtons user={'dummyUser'} repo={'dummyRepo'}/>);
    expect(wrapper.find('iframe').length).toEqual(2);
  });

  it('first iframe url contains starUrl', ()=> {
    const user = 'dummyUser';
    const repo = 'dummyRepo';
    const wrapper = shallow(<GithubButtons user={user} repo={repo}/>);
    expect(wrapper.find('iframe').get(0).props.src).toBe(`https://ghbtns.com/github-btn.html?user=${user}&repo=${repo}&type=star&count=true&size=large`);
  });

  it('first iframe url contains starUrl', ()=> {
    const user = 'dummyUser';
    const repo = 'dummyRepo';
    const wrapper = shallow(<GithubButtons user={user} repo={repo}/>);
    expect(wrapper.find('iframe').get(1).props.src).toBe(`https://ghbtns.com/github-btn.html?user=${user}&repo=${repo}&type=fork&count=true&size=large`);
  });
});
