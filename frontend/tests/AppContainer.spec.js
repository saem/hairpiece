import assert from 'assert';
import React     from 'react';
import TestUtils from 'react-addons-test-utils';
import _ from 'lodash';
import { AppContainer } from '../src/AppContainer';
import {
  shallowRender,
  findComponent,
  findComponentsByName
} from '../src/testHelpers';

describe('AppContainer', () => {
  let component;
  const props = { appData: { location: {pathname: '/'}, myMeetings: {}, newMeetings: {} }};

  beforeEach(() => {
    component = shallowRender(<AppContainer {...props} />);
  });

  it('Renders Home Page', () => {
    expect(findComponentsByName(component, 'Home').length).to.equal(1);
  });
});
