Ticketless API
==============

Last-minute ticket marketplace.

Installation
------------

1. `git clone git@github.com:Cecchi/Ticketless.git`
2. `cd {path-to-repo}/api`
3. `npm install`
4. `node server/server.js`

Api
---

POST /ticket
  * Add (sell) a ticket

POST /offer/{ticket_id}

GET /ticket/{ticket_id}
  * Get data for a ticket

GET /event/{event_id}
  * Get data for a given event

GET /event/{event_id}/tickets
  * Get data for tickets for a given event
    * Include basic data for the event itself
    * Constrain by:
      * Price
      * Section
      * Row
      * Number of seats

GET /venue/{venue_id}
  * Get data for a given venue

GET /venue/{venue_id}/tickets
  * Get data for tickets at a given venue
    * Include basic data for the venue itself