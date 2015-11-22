import React from 'react';
import { freezer } from './domain';
import { Grid, Row, Col } from 'react-bootstrap';
import { Overview } from './Overview';
import { Detail } from './Detail';
import Rx from 'rx';

const Events = {
  APPLICATION_INIT: 'application_init'
};

export { Events as Events };

const applicationState = freezer;

export default class AppContainer extends React.Component {
  constructor () {
    super();
  }
  
  componentWillMount () {
    applicationState.get().getListener().trigger(Events.APPLICATION_INIT);
  }

  render () {
    const state = applicationState.get();

    return state.initialized ?
      ( <Application state={state} /> ) :
      ( <UninitializedApplication /> );
  }

  componentDidMount () {
    const me = this;
    freezer.on('update', () => me.forceUpdate() );
  }
}

class Application extends React.Component {
  static PropTypes = {
    state : React.PropTypes.object.isRequired
  }
  
  render () {
    const state = this.props.state;

    return (
      <Grid>
        <Row className="show-grid">
          <Col md={4}>
            <Overview state={state.overview} settings={state.settings} />
          </Col>
          <Col md={8}>
            <Detail state={state.detail} settings={state.settings} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

class UninitializedApplication extends React.Component {
  render () {
    return (
      <Grid>
        <Row className="show-grid">
          <h1>Loading...</h1>
        </Row>
      </Grid>
    );
  }
}

const app$ = new Rx.Subject();

applicationState.get().getListener()
  .on(Events.APPLICATION_INIT, (e) => app$.onNext(Events.APPLICATION_INIT));

app$.subscribe(
  e => {
    switch(e) {
      case Events.APPLICATION_INIT:
        // pretend data came back from the server
        Rx.Observable.just(pastMeetingDataFixture)
          .delay(Math.floor(Math.random() * 500) + 10)
          .forEach(meetings => {
            applicationState.get()
              .set({
                      overview: {
                        pastMeetings: meetings
                      },
                      initialized: true
                   });
          });
    }
  }
);

const pastMeetingDataFixture = {
  "links": {
    "self": "http://hairpiece.com/api/users/3/past-meetings?page[offset]=16",
    "previous": "http://hairpiece.com/api/users/3/past-meetings?page[offset]=11",
    "next": "http://hairpiece.com/api/users/3/past-meetings?page[offset]=21",
  },
  "data": [
    {
      "type": "meeting",
      "id": "16",
      "attributes": {
        "date": "2001-10-01 10:10:10", "themes": "System outage"
      },
      "links": {
        "self": "http://hairpiece.com/api/meetings/16"
      },
      "relationships": {
        "employee": {
          "data": { "type": "employee", "id": "1" },
          "links": {
            "related": "http://hairpiece.com/api/employees/1"
          }
        },
        "manager": {
          "data": { "type": "manager", "id": "2" },
          "links": {
            "related": "http://hairpiece.com/api/managers/2"
          }
        }
      }
    },
    {
      "type": "meeting",
      "id": "17",
      "attributes": {
        "date": "2001-10-07 10:10:10", "themes": "Burnout"
      },
      "links": {
        "self": "http://hairpiece.com/api/meetings/17"
      },
      "relationships": {
        "employee": {
          "data": { "type": "employee", "id": "1" },
          "links": {
            "related": "http://hairpiece.com/api/employees/1"
          }
        },
        "manager": {
          "data": { "type": "manager", "id": "2" },
          "links": {
            "related": "http://hairpiece.com/api/managers/2"
          }
        }
      }
    },
    {
      "type": "meeting",
      "id": "18",
      "attributes": {
        "date": "2001-10-14 10:10:10", "themes": "Need feedback"
      },
      "links": {
        "self": "http://hairpiece.com/api/meetings/18"
      },
      "relationships": {
        "employee": {
          "data": { "type": "employee", "id": "1" },
          "links": {
            "related": "http://hairpiece.com/api/employees/1"
          }
        },
        "manager": {
          "data": { "type": "manager", "id": "2" },
          "links": {
            "related": "http://hairpiece.com/api/managers/2"
          }
        }
      }
    },
    {
      "type": "meeting",
      "id": "19",
      "attributes": {
        "date": "2001-10-21 10:10:10", "themes": "Training"
      },
      "links": {
        "self": "http://hairpiece.com/api/meetings/19"
      },
      "relationships": {
        "employee": {
          "data": { "type": "employee", "id": "1" },
          "links": {
            "related": "http://hairpiece.com/api/employees/1"
          }
        },
        "manager": {
          "data": { "type": "manager", "id": "2" },
          "links": {
            "related": "http://hairpiece.com/api/managers/2"
          }
        }
      }
    },
    {
      "type": "meeting",
      "id": "20",
      "attributes": {
        "date": "2001-10-28 10:10:10", "themes": "Jerks"
      },
      "links": {
        "self": "http://hairpiece.com/api/meetings/20"
      },
      "relationships": {
        "employee": {
          "data": { "type": "employee", "id": "1" },
          "links": {
            "related": "http://hairpiece.com/api/employees/1"
          }
        },
        "manager": {
          "data": { "type": "manager", "id": "2" },
          "links": {
            "related": "http://hairpiece.com/api/managers/2"
          }
        }
      }
    }
  ]
};

// This is what we should likely migrate towards

const landingDataFixture = {
  "links":{
    "self": "http://hairpiece.com/api/users/3"
  },
  "data": {
    "type": "user",
    "id": "3",
    "attributes": {
      "email": "james.garcia@nemitek.com"
    },
    "relationships": {
      "my-meetings": {
        "links": {
          "related": "http://hairpiece.com/api/users/3/my-meetings?page[offset]=16",
          "previous": "http://hairpiece.com/api/users/3/my-meetings?page[offset]=11",
          "next": "http://hairpiece.com/api/users/3/my-meetings?page[offset]=21"
        },
        "data": [
          { "type": "meeting", "id": "16" },
          { "type": "meeting", "id": "17" },
          { "type": "meeting", "id": "18" },
          { "type": "meeting", "id": "19" },
          { "type": "meeting", "id": "20" }
        ]
      },
      "facilitated-meetings": {
        "links": {
          "related": "http://hairpiece.com/api/users/3/facilitated-meetings?page[offset]=50",
          "previous": "http://hairpiece.com/api/users/3/facilitated-meetings?page[offset]=39",
          "next": "http://hairpiece.com/api/users/3/facilitated-meetings?page[offset]=72"
        },
        "data": [
          { "type": "meeting", "id": "50" },
          { "type": "meeting", "id": "56" },
          { "type": "meeting", "id": "59" },
          { "type": "meeting", "id": "64" },
          { "type": "meeting", "id": "68" }
        ]
      }
    }
  },
  "included": [
    {
      "type": "meeting",
      "id": "16",
      "attributes": {
        "date": "2001-10-01 10:10:10", "themes": "System outage"
      },
      "links": {
        "self": "http://hairpiece.com/api/meetings/16"
      },
      "relationships": {
        "employee": {
          "data": { "type": "employee", "id": "3" },
          "links": {
            "related": "http://hairpiece.com/api/employees/1"
          }
        },
        "manager": {
          "data": { "type": "manager", "id": "2" },
          "links": {
            "related": "http://hairpiece.com/api/managers/2"
          }
        }
      }
    },
    {
      "type": "meeting",
      "id": "17",
      "attributes": {
        "date": "2001-10-07 10:10:10", "themes": "Burnout"
      },
      "links": {
        "self": "http://hairpiece.com/api/meetings/17"
      },
      "relationships": {
        "employee": {
          "data": { "type": "employee", "id": "3" },
          "links": {
            "related": "http://hairpiece.com/api/employees/1"
          }
        },
        "manager": {
          "data": { "type": "manager", "id": "2" },
          "links": {
            "related": "http://hairpiece.com/api/managers/2"
          }
        }
      }
    },
    {
      "type": "meeting",
      "id": "18",
      "attributes": {
        "date": "2001-10-14 10:10:10", "themes": "Need feedback"
      },
      "links": {
        "self": "http://hairpiece.com/api/meetings/18"
      },
      "relationships": {
        "employee": {
          "data": { "type": "employee", "id": "3" },
          "links": {
            "related": "http://hairpiece.com/api/employees/1"
          }
        },
        "manager": {
          "data": { "type": "manager", "id": "2" },
          "links": {
            "related": "http://hairpiece.com/api/managers/2"
          }
        }
      }
    },
    {
      "type": "meeting",
      "id": "19",
      "attributes": {
        "date": "2001-10-21 10:10:10", "themes": "Training"
      },
      "links": {
        "self": "http://hairpiece.com/api/meetings/19"
      },
      "relationships": {
        "employee": {
          "data": { "type": "employee", "id": "3" },
          "links": {
            "related": "http://hairpiece.com/api/employees/1"
          }
        },
        "manager": {
          "data": { "type": "manager", "id": "2" },
          "links": {
            "related": "http://hairpiece.com/api/managers/2"
          }
        }
      }
    },
    {
      "type": "meeting",
      "id": "20",
      "attributes": {
        "date": "2001-10-28 10:10:10", "themes": "Jerks"
      },
      "links": {
        "self": "http://hairpiece.com/api/meetings/20"
      },
      "relationships": {
        "employee": {
          "data": { "type": "employee", "id": "3" },
          "links": {
            "related": "http://hairpiece.com/api/employees/1"
          }
        },
        "manager": {
          "data": { "type": "manager", "id": "2" },
          "links": {
            "related": "http://hairpiece.com/api/managers/2"
          }
        }
      }
    }
  ]
};
