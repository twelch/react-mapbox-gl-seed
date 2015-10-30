import React                  from 'react';
import { connect }            from 'react-redux';
import GLMap                  from '../components/GLMap';
import settings               from '../../config/client';

const mapStateToProps = (state) => ({
  mapState : state.map,
  routerState : state.router
});

export class HomeView extends React.Component {
  static propTypes = {
    mapState  : React.PropTypes.object
  }

  constructor () {
    super();
  }

  render () {
    const view = {
      container: 'map',
      style: 'mapbox://styles/twelch/cifr49xm4000086m15ev17on0',
      center: [-122.396, 37.781],
      zoom: 15
    };

    return (
      <div>
        <GLMap view={view} baselayer={this.props.mapState.baselayer} token={settings.map.token} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(HomeView);
