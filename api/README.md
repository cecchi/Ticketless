# Ticketless API
Last-minute ticket marketplace.

## Installation

1. `git clone git@github.com:Cecchi/Ticketless.git`
2. `cd {path-to-repo}/api`
3. `npm install`
4. `node server/server.js`

## API Endpoints
### POST */ticket*
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
**Response Type:**

```json
ticket
```
---------------------------------------
### PUT */ticket/{ticket_id}*
**Purpose:** Updates information for a ticket  
**Response Type:**
```json
ticket
```
---------------------------------------
### GET */ticket/{ticket_id}*
**Purpose:** Returns information about a ticket  
**Response Type:**
```json
ticket
```
---------------------------------------
### POST */offer/{ticket_id}*
**Body:**
```json
{
  "ticket": {int},
  "price": {decimal}
}
```
**Response Type:**
```json
offer
```
---------------------------------------
### GET */event/{event_id}*
**Response Type:**
```json
event
```
---------------------------------------
### GET */event/{event_id}/tickets*
**Response Type:**
```json
[ticket, ticket, ticket, ... ticket]
```
---------------------------------------
### GET */venue/{venue_id}*
**Response Type:**
```json
venue
```
---------------------------------------
### GET */venue/{venue_id}/tickets*
**Response Type:**
```json
[ticket, ticket, ticket, ... ticket]
```

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