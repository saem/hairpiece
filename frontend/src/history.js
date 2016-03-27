import { createHistory as historyCreate } from 'history'; // this is not a recursive import!

export const createHistory = freezer => {
  const history = historyCreate();

  history.listen(location => {
    // Listen for changes to the current location. The
    // listener is called once immediately.
    freezer.get().set({location}).now();
  });

  return history;
}
