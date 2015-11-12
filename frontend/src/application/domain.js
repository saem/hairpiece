import Freezer from 'freezer-js';

const freezer = new Freezer({
  settings: {
    app: {
      name: "Hair Piece"
    }
  },
  overview: {
    pastMeetings: {
      data: [
        { date: "2001-10-01 10:10:10", id: "http://...", themes: "System outage" },
        { date: "2001-10-07 10:10:10", id: "http://...", themes: "Burnout" },
        { date: "2001-10-14 10:10:10", id: "http://...", themes: "Need feedback" },
        { date: "2001-10-21 10:10:10", id: "http://...", themes: "Training" },
        { date: "2001-10-28 10:10:10", id: "http://...", themes: "Jerks" },
      ],
      pastMeetingPage: 4  // pagination
    }
  }
});

export { freezer as freezer };
