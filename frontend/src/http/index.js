import reqwest from 'reqwest';
import Kefir from 'kefir';

const mockApiBody = {
  "links": {
    "self":     "https://www.hairpiece.com/api",
    "user":     "https://www.hairpiece.com/api/users/243",
    "meetings": "https://www.hairpiece.com/api/users/243/meetings",
    "settings": "https://www.hairpiece.com/api/users/243/settings",
    "logout":   "https://www.hairpiece.com/api/logout"
  },
  "data": {
    "type": "api",
    "id": "",
    "attributes": {
      "version": "8bbc4a48fc592bf3e440d6bc8e8fc11d734eb2dd",
      "updated": "2015-11-30T11:41:29Z",
      "userTrace": "session-id.user-id.service-id1"
    }
  }
};

export const initApi = () => (Kefir.later(100, mockApiBody));

const prodInitApi = () => (Kefir.stream(emitter => {
  const request = reqwest({
    url:      "https://www.hairpiece.com/api",
    success:  emitter.emit,
    error:    emitter.error,
    complete: emitter.end
  });

  return () => { request.abort(); }
}));
