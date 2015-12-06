class Signal { address (data) => { /* things changed */} }

const buildReducer = (signal: Signal, actions: Object, reduce: Function) => {

};

# Metric

const instance = (label: String, signal: Signal) => {
  return {
    label: label,
    possibleAnswers: possibleAnswers,
    actionCallbacks: buildReducer(signal, actions, reduce);
  };
};

const possibleAnswers = [ "Unanswered", "Better", "Same", "Worse" ]

const actions = {
  ANSWER: "answer"
};

const reduce = ( action: {name: String, data: {answer: String}},
                 model: String ) => {
  switch (action.name) {
    case actions.ANSWER => action.data.answer
  }
};

class Metric extends React.Component {
  render () {
    const actionCallbacks =
    return (
      <Select>
        <Option />
      </Select>
    );
  }
}

export { instance as instance, Metric as Metric }

# Metrics
