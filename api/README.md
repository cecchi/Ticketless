# Ticketless API
Last-minute ticket marketplace.

## Installation

1. `git clone git@github.com:Cecchi/Ticketless.git`
2. `cd {path-to-repo}/api`
3. `npm install`
4. `node server/server.js`

## API Endpoints
### POST */ticket*
**Purpose:** Adds a ticket to be sold
**Body:**

```json
{
  "event": {int},
  "section": {string},
  "row": {int},
  "seats": {comma-delimited string},
  "available": {boolean},
  "seller": {int},
  "price": {decimal},
  "negotiable": {boolean}
}
```
**Response Type:** `ticket`

---------------------------------------
### PUT */ticket/{ticket_id}*
**Purpose:** Updates information for a ticket  
**Body:** `TBD`  
**Response Type:** `ticket`

---------------------------------------
### GET */ticket/{ticket_id}*
**Purpose:** Returns information about a ticket  
**Body:** `empty`  
**Response Type:** `ticket`

---------------------------------------
### POST */offer/{ticket_id}*
**Purpose:** Adds an offer for, or buys, a ticket
**Body:**
```json
{
  "ticket": {int},
  "price": {decimal}
}
```
**Response Type:** `offer`

---------------------------------------
### GET */event/{event_id}*
**Purpose:** Returns information about an event  
**Body:** `empty`  
**Response Type:** `event`

---------------------------------------
### GET */event/{event_id}/tickets*
**Purpose:** Returns a list of tickets for an event
**Body:** `empty`  
**Response Type:** `[ticket, ticket, ticket, ... ticket]`

---------------------------------------
### GET */venue/{venue_id}*
**Purpose:** Returns information about a venue  
**Body:** `empty`  
**Response Type:** `venue`

---------------------------------------
### GET */venue/{venue_id}/tickets*
**Purpose:** Returns a list of tickets for a venue
**Body:** `empty`  
**Response Type:** `[ticket, ticket, ticket, ... ticket]`

## API Response Types

**All API responses will be wrapped in the following json:**
```json
{
  "success": {boolean},
  "error": {null || string},
  "results": [ ]
}
```
**The `results` array will be populated with zero or more results, each of one of the following response types**

---------------------------------------
### *ticket*
```json
{
  "id": "1",
  "section": "133",
  "row": "10",
  "price": "70.0000",
  "seller": {
    "id": "1",
    "phone": "6175250192"
  },
  "event": {
    "id": "1",
    "name": "Red Sox @ Braves",
    "category": 2,
    "description": "",
    "time": null,
    "venue": {
      "name": "Turner Field",
      "latitude": null,
      "longitude": null
    }
  }
}
```
---------------------------------------
### *event*
```json
{
  "id": "1",
  "name": "Red Sox @ Braves",
  "category": 2,
  "description": "",
  "time": null,
  "venue": {
    "name": "Turner Field",
    "latitude": null,
    "longitude": null
  }
}
```
---------------------------------------
### *venue*
```json
{
  "name": "Turner Field",
  "latitude": null,
  "longitude": null
}
```