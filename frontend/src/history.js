import { createHistory as historyCreate } from 'history'; // this is not a recursive import!

export const createHistory = state => {
  const history = historyCreate();

  history.listen(location => {
    // Listen for changes to the current location. The
    // listener is called once immediately.
    state.set({location});
  });

  return history;
}
