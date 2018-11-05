import React from 'react';
import { shallow } from 'enzyme';
import { GistDetailPage } from '../../../src/features/blog/GistDetailPage';

describe('blog/GistDetailPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      blog: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <GistDetailPage {...props} />
    );

    expect(
      renderedComponent.find('.blog-gist-detail-page').length
    ).toBe(1);
  });
});
