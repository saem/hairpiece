import Freezer from 'freezer-js';

const freezer = new Freezer({
  settings: {
    app: {
      name: "Hair Piece"
    }
  },
  initialized: false
});

export { freezer as freezer };

