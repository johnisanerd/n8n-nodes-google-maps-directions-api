# n8n-nodes-google-maps-directions-api

An [n8n](https://n8n.io/) community node that gets Google Maps directions between two places and returns distance, duration, and route options. It is backed by the [Google Maps Directions API](https://apify.com/johnvc/google-maps-directions-api?fpr=9n7kx3) on [Apify](https://apify.com?fpr=9n7kx3) and bills per result, so there are no subscriptions and no minimums.

[Installation](#installation) · [Credentials](#credentials) · [Operations](#operations) · [Output](#output) · [Example workflows](#example-workflows) · [Pricing](#pricing) · [Resources](#resources)

## What it does

Give the node a start and end address, and it returns the best distance and duration plus a list of route options. It also works as an **AI Agent tool**, so an agent can plan routes on demand.

- Get directions for driving, transit, walking, or bicycling
- Avoid tolls or highways
- Localize with a country code and language code
- Choose how much data to return: Simplified, Raw, or Selected Fields

## Installation

Follow the n8n [community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/):

1. In n8n, open **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-google-maps-directions-api` as the npm package name.
4. Agree to the risks of using community nodes, then select **Install**.

After it installs, the **Google Maps Directions** node appears in the nodes panel.

> n8n Cloud only allows verified community nodes. Until this node is verified, install it on a self-hosted n8n instance.

## Credentials

You need a free [Apify account](https://apify.com?fpr=9n7kx3) and an API token.

1. Sign in to the [Apify Console](https://console.apify.com?fpr=9n7kx3).
2. Open **Settings > Integrations** and copy your **Personal API token**.
3. In n8n, create a new **Apify API** credential and paste the token.
4. Use the credential's **Test** button to confirm it works.

The node also supports **Apify OAuth2** if you prefer to connect that way.

## Operations

**Route > Get** returns directions between two places.

| Parameter | Description |
| --- | --- |
| Start Address | The starting address or place. Required. |
| End Address | The destination address or place. Required. |
| Travel Mode | Best, Driving, Transit, Walking, or Bicycling. |
| Avoid Tolls / Avoid Highways | Route preferences. |
| Country Code / Language Code | Localization, for example `us` and `en`. |
| Output | How much data to return: Simplified, Raw, or Selected Fields. |

## Output

One item is returned per directions query. The **Output** parameter lets you choose how much to return:

- **Simplified** (default): a compact object with `start`, `end`, `travelMode`, `bestDistance`, `bestDuration`, `directionsCount`, `mapsUrl`, and `routes` (each with `via`, `distance`, `duration`, `travelMode`). This mode is also used automatically when the node runs as an AI Agent tool, to keep responses small.
- **Raw**: every field the API returns, using the original field names below.
- **Selected Fields**: pick exactly which fields to include.

### Fields (Raw and Selected Fields)

| Field | Type | Description |
| --- | --- | --- |
| `result_type` | string | Result type, for example `directions` |
| `start` | object | Resolved start place |
| `end` | object | Resolved end place |
| `travel_mode` | string | Travel mode used |
| `directions_found` | boolean | Whether routes were found |
| `directions_count` | integer | Number of route options |
| `best_duration` | object | Best route duration |
| `best_distance` | object | Best route distance |
| `places_info` | object | Details about the start and end places |
| `directions` | array | All route options with via, distance, duration, and trips |
| `durations` | array | Durations across the day, when available |
| `google_maps_directions_url` | string | Link to the route on Google Maps |

## Example workflows

### 1. Compute ETAs for a list of trips

1. **Read** a list of start/end pairs.
2. **Google Maps Directions**: get directions for each, Output `Simplified`.
3. **Google Sheets**: append `bestDistance` and `bestDuration`.

### 2. Toll-free route planning

1. **Manual Trigger**.
2. **Google Maps Directions**: set Avoid Tolls, Travel Mode `Driving`.
3. **Set**: keep `routes` and `mapsUrl`.

### 3. Let an AI Agent plan a route

1. **AI Agent** node.
2. Attach **Google Maps Directions** as a tool.
3. Ask "How long to drive from Austin to Dallas avoiding tolls?" The agent calls the node (in Simplified mode) and answers with the route.

## Pricing

This node calls the [Google Maps Directions API](https://apify.com/johnvc/google-maps-directions-api?fpr=9n7kx3) on Apify, which is billed **pay-per-result**, with no subscription and no minimums. Apify also includes a free monthly usage tier that covers typical volumes. See the [Actor page](https://apify.com/johnvc/google-maps-directions-api?fpr=9n7kx3) for current rates.

## Resources

- [Google Maps Directions API on Apify](https://apify.com/johnvc/google-maps-directions-api?fpr=9n7kx3)
- [npm package](https://www.npmjs.com/package/n8n-nodes-google-maps-directions-api)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Apify n8n integration guide](https://docs.apify.com/platform/integrations/n8n)

## License

[MIT](LICENSE.md)
