import React                  from 'react';
import { connect }            from 'react-redux';
import GLMap                  from '../components/GLMap';
import appconfig                 from '../../config/client';

const mapStateToProps = (state) => ({
  mapState : state.map,
  routerState : state.router
});

export class View2 extends React.Component {
  static propTypes = {
    mapState  : React.PropTypes.object
  }

  constructor () {
    super();
    this.mapView = {
      style: 'mapbox://styles/mapbox/streets-v8',
      center: [12.343633, 45.433189],
      pitch: 45,
      bearing: 270,
      zoom: 16,
      container: 'map'
    };
  }

  componentDidMount() {
    window.setTimeout(() => {
      this.refs.glmap.map.flyTo({
        center: [12.327347, 45.442500],
        bearing: 0,
        zoom: 18,
        speed: 0.2
      });
    }, 12000);
  }

  render () {
    const mapStyle = {
      position: 'absolute',
      top:0,
      bottom:0,
      width:'100%'
    };
    return (
      <div>
        <GLMap 
          ref='glmap'
          mapStyle={mapStyle}          
          view={this.mapView} 
          baselayer={this.props.mapState.baselayer} 
          token={appconfig.token.map} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(View2);
