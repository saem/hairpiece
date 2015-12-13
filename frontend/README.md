Design
======

Components
----------
* Just render based on the immutable state passed in
* Three levels (identified thus far):
  * HTML (<div></div>)
  * Widgets (like react-bootstrap)
  * Feature Components (things that have application behaviour)
* If a feature component can't handle the behaviour (because it doesn't have
  enough information), then it should just trigger an event

Events
------
* Triggering an event from the UI will move down the state tree, might be
  handled by an intermediate feature component, or eventually end up on the
  client log (Rx Stream) where the Persistence can see it
* If persistence cares about the event, it may fetch data from the server
* When persistence gets new data from the server, it pushes it onto the server
  log, and the application can respond to it appropriately

Notes
=====
clientLog -> ev -> lookup_who_cares -> cares(ev) -> http_side_effects
serverLog -> ev -> lookup_who_cares -> cares(ev) -> state_side_effects
how to register cares for both (server and client)?
feature(state, clientLog, serverLog)
 render(state)
 serverUpdate(serverLog, state)
 clientUpdate(clientLog)

TODO
====
* Everything
