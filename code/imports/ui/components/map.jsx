Map = React.createClass({
    propTypes: {
        geocode: React.PropTypes.object.isRequired,
        isMapShown: React.PropTypes.bool.isRequired,
        mapId: React.PropTypes.string.isRequired
    },
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            isGoogleMapsLoaded: GoogleMaps.loaded()
        };
    },
    getInitialState() {
        return {
            isMapLoaded: false
        };
    },
    componentWillUpdate(nextProps) {
        if (nextProps.isMapShown && !this.state.isMapLoaded) {
            this.loadMap();
        }
    },
    loadMap() {
        const latitude = this.props.geocode.latitude;
        const longitude = this.props.geocode.longitude;
        const mapId = 'map-' + this.props.mapId;

        GoogleMaps.create({
            name: mapId,
            element: this._map.getDOMNode(),
            options: {
                center: new google.maps.LatLng(latitude, longitude),
                zoom: 16
            }
        });

        GoogleMaps.ready(mapId, (map) => {
            const marker = new google.maps.Marker({
                position: map.options.center,
                map: map.instance
            });
        });

        this.setState({
            isMapLoaded: true
        });
    },
    render() {
        let classes = 'map';
        
        if (this.data.isGoogleMapsLoaded) {
            if (this.props.isMapShown) {
                classes += ' loaded';
            }
        }

        return (
            <div className={classes} ref={(ref) => this._map = ref}></div>
        );
    }
});