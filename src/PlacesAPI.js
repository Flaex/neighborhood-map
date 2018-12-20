const api = 'https://api.foursquare.com'
const clientID = 'YUQKQR3PF1UWPQ4WKAHPYXNILEDTEJZIMTFHUD1DDZBUFZLS'
const clientSecret = 'ZW4TLD54NRJ11WLKT12DFOURLWHUTLJ2VFZLJZXMEINPS2XS'
const locations = [
  {id: 'a', title: 'La Casa Bistró', description:'Homemade food', location: {lat: 10.5023891, lng: -66.8436308}},
  {id: 'b', title: 'Prana Juice Bar', description: 'Vegetarian food', location: {lat: 10.501294, lng: -66.8435723}},
  {id: 'c', title: 'Chef Woo', description: 'Chinese food', location: {lat: 10.4972978, lng: -66.8475386}},
  {id: 'd', title: 'Alto Restaurant', description: 'Mantuan food', location: {lat: 10.5005094, lng: -66.8475176}},
  {id: 'e', title: 'Pincho Pan', description:'Lebanese food', location: {lat: 10.5007164, lng: -66.8438593}},
  {id: 'f', title: 'Come a Casa', description: 'Italian food', location: {lat: 10.4990048, lng: -66.8471932}},
  {id: 'g', title: 'Los Costilla', description: 'Pork sandwiches', location: {lat: 10.5017731, lng: -66.8457472}},
  {id: 'h', title: 'Krispy Donuts', description: 'Dessert shop', location: {lat: 10.4992448, lng: -66.8411502}},
  {id: 'i', title: 'Heladería 4D', description: 'Ice cream shop', location: {lat: 10.5014252, lng: -66.8428608}},
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
