const api = 'https://api.foursquare.com'
const clientID = '0J5F0MJE1OVQ2DEF1KE5W1X34JODQ3EOVCLAP2CMOPGUEWKX'
const clientSecret = 'J35KTFQ1JHJMQF05Y2E23MTTI4B4C54SLBFH0AA0JUNU0V0L'
const locations = [
  {id: 'a', title: 'La Casa Bistró', category:'Homemade food', location: {lat: 10.5023891, lng: -66.8436308}},
  {id: 'b', title: 'Prana Juice Bar', category: 'Vegetarian food', location: {lat: 10.501294, lng: -66.8435723}},
  {id: 'c', title: 'Chef Woo', category: 'Chinese food', location: {lat: 10.4972978, lng: -66.8475386}},
  {id: 'd', title: 'Franca Cupcakes', category: 'Coffeecakaes', location: {lat: 10.4987404, lng: -66.8472482}},
  {id: 'e', title: 'Pincho Pan', category:'Lebanese food', location: {lat: 10.5007164, lng: -66.8438593}},
  {id: 'f', title: 'Come a Casa', category: 'Italian food', location: {lat: 10.4990048, lng: -66.8471932}},
  {id: 'g', title: 'Los Costilla', category: 'Pork sandwiches', location: {lat: 10.5017731, lng: -66.8457472}},
  {id: 'h', title: 'Krispy Donuts', category: 'Dessert shop', location: {lat: 10.4992448, lng: -66.8411502}},
  {id: 'i', title: 'Cueva de Iria', category: 'Bakery', location: {lat: 10.5002619, lng: -66.8408081}},
]

export const searchVenue = (lat, lng) =>
fetch(`${api}/v2/venues/search?client_id=${clientID}&client_secret=${clientSecret}&v=20180323&limit=1&ll=${lat},${lng}`)
    .then(res => res.json())
    .catch(function() {
        console.log('Foursquare API is not responding')
    });

export const getImage = (id) =>
fetch(`${api}/v2/venues/${id}/photos?client_id=${clientID}&client_secret=${clientSecret}&v=20180323`)
    .then(res => res.json())
    .catch(function() {
        console.log('Foursquare API is not responding')
    });

export const getAll = () =>
  fetch(locations)
    .then(data => locations)
    .catch(function() {
        console.log('There was a problem loading locations')
    });
