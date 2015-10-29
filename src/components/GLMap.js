import React, { Component } from 'react';

// NotWorkingShimInstead import mapboxgl from 'mapbox-gl';
require('script!mapbox-gl/dist/mapbox-gl.js');

class GLMap extends Component {

  componentDidMount() {
    mapboxgl.accessToken = this.props.token;
    this.map = new mapboxgl.Map(this.props.view);
    this.map.on('click', (e) => {
      this.map.featuresAt(e.point, {layer: 'lighting', radius: 8}, (err, features) => {
        if (err) throw err;
        if (features.length > 0) {
          new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML('<h3>Lightpost!</h3>')
          .addTo(this.map);
        }
      });
    });
    this.map.on('mousemove', (e) => {
      this.map.featuresAt(e.point, {layer: 'lighting', radius: 8}, (err, features) => {
        if (err) throw err;
        this.map.getCanvas().style.cursor = features.length ? 'pointer' : '';
      });
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const mapStyle = {
      position: 'absolute',
      top:0,
      bottom:0,
      width:'100%'
    };

    return (
      <div>
        <div id='map' style={mapStyle}></div>
      </div>
    );
  }
}

GLMap.propTypes = {
  view: React.PropTypes.object,
  token: React.PropTypes.string
};

export default GLMap;
