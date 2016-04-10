/* @flow */

import assert    from 'assert';
import React     from 'react';

import { AppContainer } from '../src/AppContainer';
import {
  shallowRender,
  findComponent,
  findComponentsByName
} from '../src/testHelpers';

describe('AppContainer', () => {
  let component = shallowRender(<AppContainer />);

  it('Renders Home Page', () => {
    const h1 = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');

    expect(h1).to.exist();
    expect(h1.textContent).to.match(/Oh Hai/);
  });
});
