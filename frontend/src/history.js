import { createHistory as historyCreate } from 'history'; // this is not a recursive import!
import { Kefir } from './kefir';

const history$ = Kefir.emitter();

export const history = historyCreate();

export const historyStream = history$.map(location => {
  return location.pathname == '/new_meeting' ?
      {actionType: 'new_meeting', creator: 'app', location} :
      {actionType: 'home', creator: 'app', location};
});

export const historyListen = () => {
  // Listen for changes to the current location. The
  // listener is called once immediately.
  return history.listen(location => {
    history$.emit(location);
  });
};
