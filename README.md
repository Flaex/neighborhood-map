# Neighborhood Map (React) Project
This is my version for Neighborhood Map project for Udacity Front-end nanodegree program. The objective is to build an application using React framework that make requests to Google maps and Foursquare API's to search, fetch places provided on the [`locations.json`](public/utils/locations.json) file.

# PlacesAPI.js
 The provided file [`PlacesAPI.js`](src/PlacesAPI.js) contains the methods needed to perform necessary operations to make request to Foursquare API and local database.
* [`getAll`] --> Get all locations specified on json file
* [`searchVenue`] --> Get a specific venue on Foursquare API.
* [`getImage`] --> Get a specific venue photo on Foursquare API.
In the very top of this file there are the credentials needed to connect to Foursquare API successfully and a couple of variables to help with development and production tests

## Installling
To run successfully the frontend application it is required to have node.js installed on the system.
* [`npm install`]. To install required node modules and dependencies

## Running
To start and open the front-end application on the default browser, navigate to you project on command prompt and type the following command
* [`npm start`] to run development environment.
* [`npm run build`] --> To be able to test and verify serviceworker configuration it is necessary to run a production version. This repository does not track any file of the mentioned version of the app, the following code must be placed on the serviceworker in order to cache images and font folders correctly:

workbox.routing.registerRoute(
  // Cache image files
  new RegExp('/static/fonts/'),
  // Use the cache if it's available
  workbox.strategies.cacheFirst({
    // Use a custom cache name
    cacheName: 'fonts-cache-v1',
  })
);

workbox.routing.registerRoute(
  // Cache image files
  new RegExp('/static/img/'),
  // Use the cache if it's available
  workbox.strategies.cacheFirst({
    // Use a custom cache name
    cacheName: 'img-cache-v1',
  })
);

## Using the App
* [`Main page`] The main page will show a map and the list of locations with its filter. Each location has its own marker in the map, the filter will display specific details of the selected option in the dropdown. There is a button below the panel title that will reset the list to show all places.

## Contributing
This is my first react app made from scratch. Please feel free on suggesting better patterns or better ways to achieve specific tasks.
