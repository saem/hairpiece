const Events = {
  APPLICATION_INIT: 'application:init'
};

class Feature {
  build (state, clientLog, serverLog) { /* figure out return type */ }
}

const MeetingApplication = ({model}) => { /* react rendering stuff */ };

class MeetingApplication extends Feature {
  build (state, clientLog, serverLog) {

    // build is doing two (?) things, is this ok?

    // rx subscriptions and side-effects?

    state.on(Events.APPLICATION_INIT, e => {
      serverLog.onNext({
        this.props.clientLog.onNext({
          type: events.Type.Http,
          method: "GET",
          url: "doesn't matter right now"
        });
      });
    });

    // return feature tree?

    return [
      MeetingFeature(state.meeting, clientLog, serverLog)
    ];
  }

  renderer (model) { return MeetingApplication; }
}

const MeetingComponent = ({model}) => { /* react rendering stuff */ };

class MeetingFeature extends Feature {
  build (state, clientLog, serverLog) {
    return [
      MetricsFeature(state.metrics, clientLog, serverLog),
      NotesFeature(state.notes, clientLog, serverLog)
    ];
  }

  renderer (model) { return MeetingComponent; }
}

const MetricsComponent = ({model}) => {
  const metrics = model.metrics.map(m => <Metric model={m}>);

  return (
    <Row>
      {metrics}
    </Row>
  )
}

class MetricsFeature extends Feature {
  build (state, clientLog, serverLog) {}

  renderer (model) { return MetricsComponent; }
}

const NotesComponent = ({model}) => { /* react rendering stuff */ };

const NotesFeature extends Feature {
  build (state, clientLog, serverLog) {}

  renderer (model) {
    return NotesComponent;
  }
}
