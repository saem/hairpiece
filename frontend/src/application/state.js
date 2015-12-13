import Freezer from 'freezer-js';

export default (initialState: Any) => {
  const freezer = new Freezer(initialState);

  return freezer;
};
