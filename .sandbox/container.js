module.exports = {
  "dataElements": {
    "Title": {
      "modulePath": "adobe-client-data-layer/dist/lib/dataElements/dataLayerElement.js",
      "settings": {
        "path": "page.title"
      },
      "storageDuration": "pageview"
    }
  },
  "rules": [{
    "id": "RL1575899234274",
    "events": [{
      "modulePath": "adobe-client-data-layer/dist/lib/events/dataLayerEvent.js",
      "settings": {
        "event": "datalayer:ready"
      }
    }],
    "actions": [{
      "modulePath": "sandbox/logEventInfo.js",
      "settings": {}
    }],
    "name": "Log Data Layer Ready"
  }],
  "extensions": {},
  "property": {
    "settings": {
      "domains": ["example.com"]
    }
  },
  "company": {
    "orgId": "ABCDEFGHIJKLMNOPQRSTUVWX@AdobeOrg"
  },
  "buildInfo": {
    "turbineVersion": "25.6.0",
    "turbineBuildDate": "2019-12-09T13:56:44.563Z",
    "buildDate": "2019-12-09T13:56:44.563Z",
    "environment": "development"
  }
}