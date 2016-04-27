import React, { Component } from 'react';

export default class GoogleMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMapLoaded: false
        };
    }

    isGoogleMapsLoaded() {
        return GoogleMaps.loaded();
    }

    componentWillUpdate(nextProps) {
        if (nextProps.isMapShown && !this.state.isMapLoaded) {
            this.loadMap();
        }
    }

    loadMap() {
        const latitude = this.props.geocode.latitude;
        const longitude = this.props.geocode.longitude;
        const mapId = 'map-' + this.props.mapId;

        GoogleMaps.create({
            name: mapId,
            element: this._map,
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
    }

    render() {
        let classes = 'map';
        
        if (this.isGoogleMapsLoaded()) {
            if (this.props.isMapShown) {
                classes += ' loaded';
            }
        }

        return (
            <div className={classes} ref={(ref) => this._map = ref}></div>
        );
    }
};

GoogleMap.propTypes = {
    geocode: React.PropTypes.object.isRequired,
    isMapShown: React.PropTypes.bool.isRequired,
    mapId: React.PropTypes.string.isRequired
};
