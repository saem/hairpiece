import TestUtils from 'react-addons-test-utils';
import _ from 'lodash';

export const shallowRender = component => {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
};

export const findComponentsByName = (tree, type) => {
  return findComponent(tree, c => {
    return c.type && c.type.name == type;
  });
}

export const findComponent = (tree, filter) => {
  let result = filter(tree) ? [tree] : [];

  if (!tree.props || !tree.props.children) {
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
