import assert    from 'assert';
import React     from 'react';
import TestUtils from 'react-addons-test-utils';
import _ from 'lodash';
import { NewMeeting } from '../../src/meetings/NewMeeting';
import {
  shallowRender,
  findComponent,
  findComponentsByName
} from '../../src/testHelpers';

describe('NewMeeting', () => {
  let component;
  const props = {
    newMeeting: {
      reportedMetrics: [
        {name: 'work', value: 'same'}
      ],
      validMetricValues: ['better', 'same', 'worse'],
      notes: { format: 'text', value: '' }
    }
  };

  beforeEach(() => {
    component = shallowRender(<NewMeeting {...props} />);
  });

  it('Renders Metrics', () => {
    expect(findComponentsByName(component, 'Metrics').length).to.equal(1);
  });
  //
  // it('Renders Notes', () => {
  //   expect(findComponentsByName(component, 'NotesEditor').length).to.equal(1);
  // });
});
