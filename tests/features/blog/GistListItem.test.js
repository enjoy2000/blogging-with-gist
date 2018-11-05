import React from 'react';
import { shallow } from 'enzyme';
import { GistListItem } from '../../../src/features/blog/GistListItem';

describe('blog/GistListItem', () => {
  it('renders node with correct class name', () => {
    const props = {
      blog: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <GistListItem {...props} />
    );

    expect(
      renderedComponent.find('.blog-gist-list-item').length
    ).toBe(1);
  });
});
