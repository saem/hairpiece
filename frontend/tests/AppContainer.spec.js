import assert from 'assert';
import React     from 'react';
import TestUtils from 'react-addons-test-utils';
import _ from 'lodash';
import { AppContainer } from '../src/AppContainer';

function shallowRender (component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
};

function findComponentsByName (tree, type) {
  return findComponent(tree, c => {
    return c.type.name == type;
  });
}

function findComponent(tree, filter) {
  let result = filter(tree) ? [tree] : [];

  if (!tree.props.children) {
    return result;
  }

  if (Array.isArray(tree.props.children)) {
    for (var i = 0; i < tree.props.children.length; i++) {
      result = _.concat(result, findComponent(tree.props.children[i], filter));
    }
  } else {
    result = _.concat(result, findComponent(tree.props.children, filter));
  }

  return result;
}

describe('AppContainer', () => {
  let component;
  const props = { appData: { meetings: {} }, dispatchFactory: null};

  beforeEach(() => {
    component = shallowRender(<AppContainer {...props} />);
  });

  it('Renders HomeControls', () => {
    expect(findComponentsByName(component, 'HomeControls').length).to.equal(1);
  });

  it('Renders MyMeetings', () => {
    expect(findComponentsByName(component, 'MyMeetings').length).to.equal(1);
  })
});
