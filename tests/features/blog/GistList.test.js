import React from 'react';
import { shallow } from 'enzyme';
import { GistList } from '../../../src/features/blog/GistList';

describe('blog/GistList', () => {
  it('renders node with correct class name', () => {
    const props = {
      blog: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <GistList {...props} />
    );

    expect(
      renderedComponent.find('.blog-gist-list').length
    ).toBe(1);
  });
});
