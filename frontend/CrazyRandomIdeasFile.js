import React from 'react';

// These all map directly to domain concepts and their hierarchy

// persistence / meeting | people | users

domainOrServerData = {
  meetings: [
    { name: "awesome meeting" } // 2) Cool story, I'll try and save
  ]
}

// goes back and forth

// These all map directly to components and their hierarchy
// ui / overview / meetings | people
// ui / detail / meetings | people
// ui / settings / user-profile

uiData = {
  overview: {
    meetings: [
      {
        name: "awesome meeting" // 3) was updated because domainOrServerData adopted the new value 
      }
    ]
  },
  detail: {
    meeting: {
      name: "awesome meeting" // 1) click done/save -> State.trigger ("meeting:name-changed", { relevant data })
    }
  }
}

render (uiData) -> ReactComponents

//Top level concerns
// - analytics
// - debugging

const meeting = {
  date: "2001-11-01 10:10:10",
  metrics: {
    "work": 0,
    "company": "not-provided",
    "team": 1,
    "yourself": -1,
//    "manager": 0
  },
  themes: [
    "Training",
    "Time-off"
  ],
  notes: [
    {
      metadata: {
        format: "MARKDOWN",
        version: 1
      },
      content: "Totally awesome notes"
    },
    {
      metadata: {
        format: "YOUTUBE",
        version: 2
      },
      url: "http://youtube.com/SLKDJFLKSJDFSD"
    },
    {
      metadata: {
        format: "MARKDOWN",
        version: 1
      },
      content: "More awesome notes"
    },
  ]
};

const viewModel = {
  settings: {
    user: { friendlyName: "Bobby", email: "bobby@bobbins.com" },
    app: { name: "Bobbins' one on ones" }
  },
  overview: {
    pastMeetings: {
      data: [
        { date: "2001-10-01 10:10:10", id: "http://...", themes: "System outage" },
        { date: "2001-10-07 10:10:10", id: "http://...", themes: "Burnout" },
        { date: "2001-10-14 10:10:10", id: "http://...", themes: "Need feedback" },
        { date: "2001-10-21 10:10:10", id: "http://...", themes: "Training" },
        { date: "2001-10-28 10:10:10", id: "http://...", themes: "Jerks" },
      ],
      pastMeetingPage: 4  // pagination
    }
  },
  detail: {
    type: "meeting",
    data: meeting
  }
};

const view = (
  <App>
    <Overview>
      <PastMeetings>
        <PastMeeting> ...
      </PastMeetings>
      <Settings />
    </Overview>
    <Detail>
      <Meeting>
      <Metrics>
        <Metric /> ...
      </Metrics>
      <Themes>
        <Theme /> ...
      </Themes>
      <Notes>             <!-- 2 Made you go away -->
        <NoteMarkdown />
        <NoteYoutube />   <!-- 1 Go away -->
        <NoteMarkdown />
      </Notes>
    </Meeting>
    </Detail>
  </App>
);

const localStorage = {
  "restful_address": ".../meetings/123",
  "restful_address": ".../meetings/124",
  "restful_address": ".../meetings/125",
  "restful_address": ".../meetings/126",
  "restful_address": ".../meetings/127",
  "restful_address": ".../meetings/128",
  "restful_address": ".../session/1235",
  "restful_address": ".../metrics/12",
  "restful_address": ".../metrics/13",
  "restful_address": ".../metrics/14",
};

// Nuances about tags
// html tags: <h>, <div>              - Native
// bootstrap tags: <Button>, <Nav>    - Widgets
// highlevel tags: <Metrics>, <Notes> - Application

// ViewModel shape is structurally the same as Application tag hierarchy

// Architectures I've seen:

// Classic React
// Flux
  // Stores, actions, ... (ExtJS)
// Hub and spoke
  // Redux
  // Freeze.js
  // Immutable

class App extends React.Component {
  static childContextTypes = {
    get	upstream$: PropTypes.func
    get parent: PropTypes.string
  };

  getChildContext() {
    return {
      upstream$: () => new Rx.Subject(),
      parent: 'app'
    };
  }
}

class Overview extends React.Component {
  static childContextTypes = {
    get	upstream$: PropTypes.func
    get parent: PropTypes.string
  };

  getChildContext() {
    return {
      upstream$: () => this.context.upstream$,
      parent: this.context.parent + '.overview'
    };
  }
}

class Detail extends React.Component {
  static childContextTypes = {
    get	upstream$: PropTypes.func
    get parent: PropTypes.string
  };

  getChildContext() {
    return {
      upstream$: () => this.context.upstream$,
      parent: this.context.parent + '.detail'
    };
  }
}

class PastMeetings extends React.Component {
  static childContextTypes = {
    get	upstream$: PropTypes.func
    get parent: PropTypes.string
  };

  getChildContext() {
    return {
      upstream$: () => this.context.upstream$,
      parent: this.context.parent + '.past-meetings'
    };
  }
}

class PastMeeting extends React.Component {
  static childContextTypes = {
    get	upstream$: PropTypes.func
    get parent: PropTypes.string
  };

  getChildContext() {
    return {
      upstream$: () => this.context.upstream$,
      parent: this.context.parent + `.past-meeting.${id}`
    };
  }
}

class Overview extends React.Component {
  static childContextTypes = {
    get	upstream$: PropTypes.func
    get parent: PropTypes.string
  };

  getChildContext() {
    return {
      upstream$: () => this.context.upstream$,
      parent: this.context.parent + '.overview'
    };
  }
}

const metrics$ = new Rx.Subject();

var freezer = new Freezer({ metrics: {
    "work": "not-provided",
    "company": "not-provided",
    "team": "not-provided",
    "yourself": "not-provided"
  } }),
    state = freezer.get(),
    listener = state.metrics.getListener()
;

listener.on('metrics:updated', function( newState ){
    metrics$.onNext(newState);
});

state.metrics.push( {
    "work": 1,
    "company": "not-provided",
    "team": "not-provided",
    "yourself": "not-provided"
  });

state.metrics.push( {
    "work": 1,
    "company": 1,
    "team": "not-provided",
    "yourself": "not-provided"
  });

state.metrics.push( {
    "work": 1,
    "company": 1,
    "team": 1,
    "yourself": "not-provided"
  });

state.metrics.push( {
    "work": 1,
    "company": 1,
    "team": 1,
    "yourself": 1
  });

update$
  .scan((ignore, current) => current)
  .debounce(250).forEach(metrics => {
  // do some http stuff
});
