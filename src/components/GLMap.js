import React, { Component } from 'react';

// NotWorkingShimInstead import mapboxgl from 'mapbox-gl';
require('script!mapbox-gl/dist/mapbox-gl-dev.js');

class GLMap extends Component {
  static propTypes = {
    // Default map view
    view: React.PropTypes.object,
    // Style of map container
    mapStyle: React.PropTypes.object,
    // Current base layer
    baselayer: React.PropTypes.string,
    // Mapbox map token
    token: React.PropTypes.string,
    // onStyleEvent fired after style loaded.  Map object is passed
    onStyleLoad: React.PropTypes.func
  }

  componentDidMount() {
    mapboxgl.accessToken = this.props.token;
    this.map = new mapboxgl.Map(this.props.view);

    this.map.on('style.load', () => {
      this.map.addSource('satellite', {
        type: 'raster',
        url: 'mapbox://mapbox.satellite'
      });
      this.map.addLayer({
        'id': 'satellite',
        'type': 'raster',
        'source': 'satellite',
        'layout': {
          'visibility': 'none'
        }
      });

      if (this.props.onStyleLoad) {
        this.props.onStyleLoad(this.map);
      }
    });
  }

  componentDidUpdate() {
    if (this.props.baselayer === 'satellite') {
      this.map.setLayoutProperty('satellite', 'visibility', 'visible');
    } else {
      this.map.setLayoutProperty('satellite', 'visibility', 'none');
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return (
      <div>
        <div style={this.props.mapStyle} id='map'></div>
      </div>
    );
  }
}

export default GLMap;
