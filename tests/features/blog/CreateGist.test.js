import React from 'react';
import { shallow } from 'enzyme';
import { CreateGist } from '../../../src/features/blog/CreateGist';

describe('blog/CreateGist', () => {
  it('renders node with correct class name', () => {
    const props = {
      blog: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <CreateGist {...props} />
    );

    expect(
      renderedComponent.find('.blog-create-gist').length
    ).toBe(1);
  });
});
