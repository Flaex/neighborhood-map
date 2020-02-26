const api = 'https://api.foursquare.com'
const clientID = '3UJPLSNET0YBKB1A5IXRSCQRDT5BQ44YKXU22NSQUXF1LNIP'
const clientSecret = 'ESDPE0YYA4CIFNTWKZH3U1ADGZYMGIWNB1QILEM5MASGU4OP'
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