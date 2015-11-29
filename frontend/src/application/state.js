import Freezer from 'freezer-js';

export default (initialState) => {
  const freezer = new Freezer(initialState);

  return freezer;
};
