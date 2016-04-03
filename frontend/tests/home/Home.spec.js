import assert from 'assert';
import React     from 'react';
import _ from 'lodash';
import { Home } from '../../src/home/Home';
import { shallowRender,
  findComponent,
  findComponentsByName
} from '../../src/testHelpers';

describe('Home', () => {
  let component;
  const props = { appData: { myMeetings: {} }};

  beforeEach(() => {
    component = shallowRender(<Home {...props} />);
  });

  it('Renders MyMeetings', () => {
    expect(findComponentsByName(component, 'MyMeetings').length).to.equal(1);
  });
});
