/** @flow */

import Kefir from 'kefir';

const REQUEST  = 'request';
const RESPONSE = 'response';

const GET = 'GET';

const METHODS = {
  GET
};

const mockApiBody = {
  "links": {
    "self": "http://www.hairpiece.com/api",
    "user": "http://www.hairpiece.com/api/users/243",
    "meetings": "http://www.hairpiece.com/api/users/243/meetings",
    "settings": "http://www.hairpiece.com/api/users/243/settings",
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

const mockHttp = {
  call: (request, successCallback, failureCallback) => {
    successCallback({
      type: RESPONSE,
      status: 200,
      body: mockApiBody
    });
  }
};

type Request = { type: REQUEST, method: METHOD, url: string}

// @todo see if this can be replaced with a Kefir.merge
let httpEmitter: Emitter<Request|Reponse>;
const http$ = Kefir.stream(emitter => {
  httpEmitter = emitter;
});

export function get(url: string): Observable<Request|Response> {
  const request = {
    type: REQUEST,
    method : GET,
    url: url
  };

  httpEmitter.emit(request);

  mockHttp.call(
    request,
    (response) => httpEmitter.emit(response),
    () => console.log('lol, what\'s a failure?')
  );

  return http$;
}
