import assert    from 'assert';
import React     from 'react';
import TestUtils from 'react-addons-test-utils';
import _ from 'lodash';
import { MyMeetings } from '../../src/home/MyMeetings';
import {
  shallowRender,
  findComponent,
  findComponentsByName
} from '../../src/testHelpers';

describe('MyMeetings', () => {
  let component;
  const props = { meetings: { list: [] } };

  beforeEach(() => {
    component = shallowRender(<MyMeetings {...props} />);
  });

  it('Renders MeetingList', () => {
    expect(findComponentsByName(component, 'MeetingList').length).to.equal(1);
  });

  it('Renders MeetingFilter', () => {
    expect(findComponentsByName(component, 'MeetingFilter').length).to.equal(1);
  })
});
