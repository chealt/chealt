const geo = new GeoCoder({
    geocoderProvider: 'google',
    httpAdapter: 'https',
    apiKey: 'AIzaSyA2jFaKDk6FkIdfyXxaN1pXT3fRQ1hoXkU'
});

Meteor.methods({
    getGeoCode(address) {
        const geocode = geo.geocode(address);

        if (geocode.length) {
            return geocode[0];
        }
    }
});
