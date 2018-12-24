const api = 'https://api.foursquare.com'
const clientID = '3UJPLSNET0YBKB1A5IXRSCQRDT5BQ44YKXU22NSQUXF1LNIP'
const clientSecret = 'ESDPE0YYA4CIFNTWKZH3U1ADGZYMGIWNB1QILEM5MASGU4OP'
const port = 3000
const host = '127.0.0.1'

export const getAll = () =>
  fetch(`http://${host}:${port}/utils/locations.json`)
 .then((places) => places.json())
 .catch(() => console.log('Foursquare API is not responding'))

export const searchVenue = (lat, lng) =>
fetch(`${api}/v2/venues/search?client_id=${clientID}&client_secret=${clientSecret}&v=20180323&limit=1&ll=${lat},${lng}`)
    .then(res => res.json())
    .catch(() => console.log('Foursquare API is not responding'))

export const getImage = (id) =>
fetch(`${api}/v2/venues/${id}/photos?client_id=${clientID}&client_secret=${clientSecret}&v=20180323`)
    .then(res => res.json())
    .catch(() => console.log('Foursquare API is not responding'))
