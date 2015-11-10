const React = require('react');
import { bindActionCreators } from 'redux';
const { connect } = require('react-redux');
const { AppBar } = require('material-ui');
const injectTapEventPlugin = require('react-tap-event-plugin');
const Sidebar = require('../components/Sidebar');

import 'styles/core.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-flexr/styles.css';

injectTapEventPlugin();

// Define action creators
const actionCreators = {
  changeBaseLayer : (layer) => ({
    type : 'CHANGE_BASELAYER',
    payload : layer
  })
};
// Create dispatchers from action creators and assign to actions prop
const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});

// Bind state to props
const mapStateToProps = (state) => ({
  mapState : state.map
});

export default class CoreLayout extends React.Component {
  static propTypes = {
    children : React.PropTypes.element,
    history : React.PropTypes.object,
    location: React.PropTypes.object,
    mapState : React.PropTypes.object,
    actions : React.PropTypes.object
  }

  constructor () {
    super();
    // Set handler scope as es6 doesn't do this for us
    this. _showLeftNavClick = this. _showLeftNavClick.bind(this);
    this. _onLeftNavChange = this. _onLeftNavChange.bind(this);
  }

  _onLeftNavChange(e, key, payload) {
    if (payload.route) {
      this.props.history.pushState(null, payload.route);
    } else if (payload.layer) {
      this.props.actions.changeBaseLayer(payload.layer);
    }
  }

  _showLeftNavClick() {
    this.refs.sidebar.toggle();
  }

  render () {
    const barStyle = {
      top: 0,
      left: 0,
      position: 'absolute',
      backgroundColor: 'transparent',
      boxShadow: 'none'
    };

    let appbar = '';
    if (this.props.location.pathname !== '/') {
      appbar = (
        <AppBar
        className='c-app-bar'
        style={barStyle}
        onLeftIconButtonTouchTap={this._showLeftNavClick} />
      );
    }

    return (
      <div className='page-container'>
        <div className='view-container'>
          <Sidebar
          ref="sidebar"
          docked={false}
          onChange={this._onLeftNavChange}
          mapState={this.props.mapState} />
          {this.props.children}
        </div>
        {appbar}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
