# Ticketless API
Last-minute ticket marketplace.

## Installation

1. `git clone git@github.com:Cecchi/Ticketless.git`
2. `cd {path-to-repo}/api`
3. `npm install`
4. `node server/server.js`

## API Endpoints

<table>
  <tr>
    <th>METHOD</th><th>URI</th><th>BODY</th><th>RETURNS</th>
  </tr>
  <tr>
    <td>POST</td>
    <td>/tickets</td>
    <td>
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
    </td>
    <td>`ticket`
  </tr>
  <tr>
    <td>POST</td>
    <td>/ticket/{ticket_id}</td>
    <td></td>
    <td>`ticket</td>
  </tr>
</table>

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

**Coming Soon**