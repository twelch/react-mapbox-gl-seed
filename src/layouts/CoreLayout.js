const React = require('react');
const { LeftNav, MenuItem, AppBar } = require('material-ui');
const injectTapEventPlugin = require('react-tap-event-plugin');

import 'styles/core.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

injectTapEventPlugin();

export default class CoreLayout extends React.Component {
  static propTypes = {
    children : React.PropTypes.element,
    history : React.PropTypes.object
  }

  constructor () {
    super();
    // Set handler scope as es6 doesn't do this for us
    this. _showLeftNavClick = this. _showLeftNavClick.bind(this);
    this. _onLeftNavChange = this. _onLeftNavChange.bind(this);
  }

  _onLeftNavChange(e, key, payload) {
    this.props.history.pushState(null, payload.route);
  }

  _showLeftNavClick() {
    this.refs.leftNav.toggle();
  }

  render () {
    const menuItems = [
      { type: MenuItem.Types.SUBHEADER, text: 'Views' },
      { route: '/', text: 'Lighting' },
      { route: '/parking', text: 'Available Parking' },
      { type: MenuItem.Types.SUBHEADER, text: 'Base Layer' },
      { route: '/base/streets', text: 'Streets' },
      { route: '/base/satellite', text: 'Satellite' },
      { type: MenuItem.Types.SUBHEADER, text: 'Settings' }
    ];

    const barStyle = {
      position: 'absolute',
      backgroundColor: 'transparent',
      boxShadow: 'none'
    };

    return (
      <div className='page-container'>
        <LeftNav
          ref="leftNav"
          docked={false}
          menuItems={menuItems}
          onChange={this._onLeftNavChange} />
        <div className='view-container'>
          {this.props.children}
        </div>
        <AppBar className='c-app-bar' style={barStyle} onLeftIconButtonTouchTap={this._showLeftNavClick} />
      </div>
    );
  }
}
