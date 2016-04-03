import { createHistory as historyCreate } from 'history'; // this is not a recursive import!

export const createHistory = freezer => {
  const history = historyCreate();

  history.listen(location => {
    // Listen for changes to the current location. The
    // listener is called once immediately.

    //console.log('history', location);

    freezer.get().set({location});
  });

  return history;
}
