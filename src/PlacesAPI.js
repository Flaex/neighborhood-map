const api = 'https://api.foursquare.com'
const clientID = '1RINFOK1DN0RE00V3WWMQCPM2GSZOYVNDLW1MH0SQKLYMH01'
const clientSecret = 'LQ51YTAAMIZTJPULKSPENWRMVECOOF5JLCTBFVDXZZLN25PS'
const locations = [
  {id: 'a', title: 'La Casa Bistró', location: {lat: 10.5023891, lng: -66.8436308}},
  {id: 'b', title: 'Prana Juice Bar', location: {lat: 10.501294, lng: -66.8435723}},
  {id: 'c', title: 'Chef Woo', location: {lat: 10.4972978, lng: -66.8475386}},
  {id: 'd', title: 'Franca Cupcakes', location: {lat: 10.4987404, lng: -66.8472482}},
  {id: 'e', title: 'Pincho Pan', location: {lat: 10.5007164, lng: -66.8438593}},
]

export const search = () =>
fetch(`${api}/v2/venues/search?client_id=${clientID}&client_secret=${clientSecret}&v=20180323&limit=1&ll=10.5023891,-66.8436308`)
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
