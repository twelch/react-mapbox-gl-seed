import React                  from 'react';
import { connect }            from 'react-redux';
import GLMap                  from '../components/GLMap';
import appconfig                 from '../../config/client';

const mapStateToProps = (state) => ({
  mapState : state.map,
  routerState : state.router
});

export class View1 extends React.Component {
  static propTypes = {
    mapState  : React.PropTypes.object
  }

  constructor() {
    super();
    this.mapView = {
      style: 'mapbox://styles/mapbox/light-v8',
      center: [138.727778, 35.360555],
      zoom: 11,
      container: 'map'
    };
    this._addContours = this._addContours.bind(this);
  }

  _addContours(map) {
    map.addSource('terrain-data', {
      type: 'vector',
      url: 'mapbox://mapbox.mapbox-terrain-v2'
    });
    map.addLayer({
      'id': 'contour',
      'type': 'line',
      'source': 'terrain-data',
      'source-layer': 'contour',
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': '#BAC7AC',
        'line-width': 1
      }
    });
  }

  render () {
    return (
      <div>
        <GLMap
        ref='glmap'
        view={this.mapView}
        baselayer={this.props.mapState.baselayer}
        token={appconfig.token.map}
        onStyleLoad={this._addContours} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(View1);
