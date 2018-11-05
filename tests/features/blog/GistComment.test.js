import React from 'react';
import { shallow } from 'enzyme';
import { GistComment } from '../../../src/features/blog';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<GistComment />);
  expect(renderedComponent.find('.blog-gist-comment').length).toBe(1);
});
