const api = process.env.API
const clientID = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const port = 3000 //Set port for testing purposes
const host = 'localhost' //Set host for testing purposes, change this to localhost for development

export const getAll = () =>
  fetch(`http://${host}:${port}/utils/locations.json`)
    .then((places) => places.json())
    .catch(() => alert('Locations could not be loaded'))

export const searchVenue = (lat, lng) =>
  fetch(`${api}/v2/venues/search?client_id=${clientID}&client_secret=${clientSecret}&v=20180323&limit=1&ll=${lat},${lng}`)
    .then(res => res.json())
    .catch(() => alert('Foursquare API is not responding'))

export const getImage = id =>
  fetch(`${api}/v2/venues/${id}/photos?client_id=${clientID}&client_secret=${clientSecret}&v=20180323`)
    .then(res => res.json())
    .catch(() => alert('Foursquare API is not responding'))