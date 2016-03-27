import { createHistory as historyCreate } from 'history'; // this is not a recursive import!

export const createHistory = historyUpdate => {
  const history = historyCreate();

  history.listen(location => historyUpdate(location));

  return history;
}
