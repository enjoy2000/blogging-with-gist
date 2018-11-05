import React from 'react';
import { shallow } from 'enzyme';
import { CreateComment } from '../../../src/features/blog/CreateComment';

describe('blog/CreateComment', () => {
  it('renders node with correct class name', () => {
    const props = {
      blog: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <CreateComment {...props} />
    );

    expect(
      renderedComponent.find('.blog-create-comment').length
    ).toBe(1);
  });
});
