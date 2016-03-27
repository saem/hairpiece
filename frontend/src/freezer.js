import Freezer from 'freezer-js';

export const createFreezer = initialState => {
  const freezer = new Freezer(initialState);
  return freezer;
}
