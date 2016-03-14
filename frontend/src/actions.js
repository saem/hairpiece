import { Kefir } from './kefir';

const actionDispatcher = (action) => {
  return calltimeArgs => {

    const args = calltimeArgs || {};
    onAction(_.merge(action, args));
  };
}

const dispatchFactory = (actionDispatcher, creatorPrefix) => {
  creatorPrefix = creatorPrefix ? creatorPrefix : 'app';

  return {
    forwardTo: (creatorName) => {
      return dispatchFactory(
        actionDispatcher, creatorPrefix + '.' + creatorName);
    },
    send: (actionName, optionalArgs) => {
      const args = optionalArgs || {};
      const action = _.merge(
        { actionType: actionName, creator: creatorPrefix },
        args
      );

      return actionDispatcher(action);
    }
  };
};

const actionEmitter = Kefir.emitter();

const onAction = action => {
  actionEmitter.emit(action);
};

export const actionStream = actionEmitter;
export const dispatcher = dispatchFactory(actionDispatcher);
