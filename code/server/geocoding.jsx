const geo = new GeoCoder({
    geocoderProvider: 'google',
    httpAdapter: 'https',
    apiKey: 'AIzaSyCwo4n63B8CiW0x1Zf0KYHctSNW2qkmRbI'
});

Meteor.methods({
    getGeoCode(address) {
        const geocode = geo.geocode(address);

        if (geocode.length) {
            return geocode[0];
        }
    }
});
