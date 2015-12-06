import events from './events';
import Rx from 'rx';

let persister;

export default (stateManager) => {
  const appEvent$ = new Rx.Subject();

  var subscription = subscribe(stateManager, appEvent$, events);

  const resubscribe = (newEvents) => {
    subscription.dispose();
    subscription = subscribe(stateManager, appEvent$, newEvents);
    
    return { appEvent$, subscription, resubscribe };
  };

  persister = { appEvent$, subscription, resubscribe };

  return persister;
};

if (module.hot) {
  // accept only events changes for now
  module.hot.accept('./events', () => {
    const newEvents = require('./events');
    persister = persister.resubscribe(newEvents);
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
          Rx.Observable.just(landingDataFixture)
            .delay(Math.floor(Math.random() * 500) + 10)
            .forEach(landingPageDataMapping(stateManager));
      }
    }
  );
};

// This is a giant hack to make mock data work
const landingPageDataMapping = (stateManager) => {
  return (landingData) => {
    stateManager.get().set({
          me: {
            links: landingData.links,
            data: landingData.data
          },
          overview: {
            people: landingData.included
              .filter(r => r.type == "person")
              .map(p => {
                let result = {
                  type: p.type,
                  id: p.id,
                  attributes: p.attributes,
                  relationships: p.relationships
                };

                result.attributes.fullName = p.attributes.firstName + " "
                  + p.attributes.lastName;

                return result;
              })
          },
          initialized: true
    });
  }
}

// This is what we should likely migrate towards

const landingDataFixture = {
  "links":{
    "self": "http://hairpiece.com/api/users/3"
  },
  "data": {
    "type": "user",
    "id": "3",
    "attributes": {
      "email": "james.garcia@nemitek.com",
      "lastLogin": "2015-11-30T11:41:29Z"
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
      },
      "people": {
        "links": {
          "related": "http://hairpiece.com/api/users/3/people"
        },
        "data": [
          { "type": "person", "id": "5" },
          { "type": "person", "id": "8" },
          { "type": "person", "id": "13" }
        ]
      }
    }
  },
  "included": [
    {
      "type": "person",
      "id": "5",
      "attributes": {
        "firstName": "Ricky",
        "lastName": "Booby",
        "email": "rick.booby@hairpiece.com"
      },
      "links": {
        "self": "http://hairpiece.com/api/people/5",
      },
      "relationships": {
        "manager": {
          "data": { "type": "manager", "id": "2" },
          "links": {
            "related": "http://hairpiece.com/api/managers/2"
          }
        }
      }
    },
    {
      "type": "person",
      "id": "8",
      "attributes": {
        "firstName": "General",
        "lastName": "Lisimo",
        "email": "general.lisimo@hairpiece.com"
      },
      "links": {
        "self": "http://hairpiece.com/api/people/8",
      },
      "relationships": {
        "manager": {
          "data": { "type": "manager", "id": "2" },
          "links": {
            "related": "http://hairpiece.com/api/managers/2"
          }
        }
      }
    },
    {
      "type": "person",
      "id": "13",
      "attributes": {
        "firstName": "Darth",
        "lastName": "Vader",
        "email": "darth.vader@hairpiece.com"
      },
      "links": {
        "self": "http://hairpiece.com/api/people/13",
      },
      "relationships": {
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
      "id": "16",
      "attributes": {
        "date": "2001-10-01T10:10:10Z", "themes": "System outage"
      },
      "links": {
        "self": "http://hairpiece.com/api/meetings/16"
      },
      "relationships": {
        "person": {
          "data": { "type": "person", "id": "3" },
          "links": {
            "related": "http://hairpiece.com/api/persons/1"
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
        "date": "2001-10-07T10:10:10Z", "themes": "Burnout"
      },
      "links": {
        "self": "http://hairpiece.com/api/meetings/17"
      },
      "relationships": {
        "person": {
          "data": { "type": "person", "id": "3" },
          "links": {
            "related": "http://hairpiece.com/api/persons/1"
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
        "date": "2001-10-14T10:10:10Z", "themes": "Need feedback"
      },
      "links": {
        "self": "http://hairpiece.com/api/meetings/18"
      },
      "relationships": {
        "person": {
          "data": { "type": "person", "id": "3" },
          "links": {
            "related": "http://hairpiece.com/api/persons/1"
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
        "date": "2001-10-21T10:10:10Z", "themes": "Training"
      },
      "links": {
        "self": "http://hairpiece.com/api/meetings/19"
      },
      "relationships": {
        "person": {
          "data": { "type": "person", "id": "3" },
          "links": {
            "related": "http://hairpiece.com/api/persons/1"
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
        "date": "2001-10-28T10:10:10Z", "themes": "Jerks"
      },
      "links": {
        "self": "http://hairpiece.com/api/meetings/20"
      },
      "relationships": {
        "person": {
          "data": { "type": "person", "id": "3" },
          "links": {
            "related": "http://hairpiece.com/api/persons/1"
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
        "person": {
          "data": { "type": "person", "id": "1" },
          "links": {
            "related": "http://hairpiece.com/api/persons/1"
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
        "person": {
          "data": { "type": "person", "id": "1" },
          "links": {
            "related": "http://hairpiece.com/api/persons/1"
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
        "person": {
          "data": { "type": "person", "id": "1" },
          "links": {
            "related": "http://hairpiece.com/api/persons/1"
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
        "person": {
          "data": { "type": "person", "id": "1" },
          "links": {
            "related": "http://hairpiece.com/api/persons/1"
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
        "person": {
          "data": { "type": "person", "id": "1" },
          "links": {
            "related": "http://hairpiece.com/api/persons/1"
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
