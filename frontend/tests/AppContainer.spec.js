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

  it('Renders Home Page', () => {
    const appData = {location: {pathname: '/'}};
    const component = shallowRender(<AppContainer appData={appData} />);
    expect(findComponentsByName(component, 'Home').length).to.equal(1);
  });

  it('Renders Home Page by Default', () => {
    const appData = {location: {pathname: '/does_not_exist'}};
    const component = shallowRender(<AppContainer appData={appData} />);
    expect(findComponentsByName(component, 'Home').length).to.equal(1);
  });

  it('Renders New Meeting Page', () => {
    const appData = {location: {pathname: '/new_meeting'}};
    const component = shallowRender(<AppContainer appData={appData} />);
    expect(findComponentsByName(component, 'NewMeeting').length).to.equal(1);
  });
});
