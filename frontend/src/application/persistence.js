import events from 'application/events';
import Rx from 'rx';

let persister;

export default (stateManager) => {
  const appEvent$ = new Rx.Subject();

  let subscription = subscribe(stateManager, appEvent$, events);

  const resubscribe = (newEvents) => {
    subscription.dispose();
    subscription = subscribe(stateManager, appEvent$, newEvents);
  };

  persister = { appEvent$, subscription, resubscribe };

  return persister;
};

if (module.hot) {
  console.log("Module is hot: persistence");
  // accept itself
  module.hot.accept('application/events', () => {
    console.log("hot loading: persistence");
    const newEvents = require('application/events');
    subscription = persister.resubscribe(stateManager, appEvent$, newEvents);
  });
}

const subscribe = (stateManager, appEvent$, events) => {
  stateManager.get()
    .getListener()
    .on(events.APPLICATION_INIT, () => appEvent$.onNext(events.APPLICATION_INIT));
  stateManager.get()
    .getListener()
    .on(events.APPLICATION_INIT, () => console.log("APPLICATION_INIT happened"));

  return appEvent$.subscribe(
    e => {
      switch(e) {
        case events.APPLICATION_INIT:
          // pretend data came back from the server
          Rx.Observable.just(pastMeetingDataFixture)
            .delay(Math.floor(Math.random() * 500) + 10)
            .forEach(meetings => {
              stateManager.get()
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
};

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
