import React, { PropTypes, Component } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';

//NotWorkingShimInstead import mapboxgl from 'mapbox-gl';
require("script!mapbox-gl/dist/mapbox-gl.js");

class GLMap extends Component {

  componentDidMount() {
    var el = ReactDOM.findDOMNode();
    var self = this;
    mapboxgl.accessToken = 'pk.eyJ1IjoidHdlbGNoIiwiYSI6Il9pX3dtb3cifQ.YcYnsO0X2p3x0HpHPFfleg';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/twelch/cifr49xm4000086m15ev17on0',
      center: [-122.396, 37.781],
      zoom: 15
    });
    this.map.on('click', function (e) {
      self.map.featuresAt(e.point, {layer: 'lighting', radius: 8}, function (err, features) {
        if (err) throw err;      
        if (features.length > 0) {
          var tooltip = new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML('<h3>Lightpost!</h3>')
          .addTo(self.map);
        }
      });
    });
    this.map.on('mousemove', function (e) {
      self.map.featuresAt(e.point, {layer: 'lighting', radius: 8}, function (err, features) {
        if (err) throw err;
        self.map.getCanvas().style.cursor = features.length ? 'pointer' : '';
      });
    });    
  }

  render() {
    var mapStyle = {
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
