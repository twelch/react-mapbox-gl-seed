import React from 'react';
const { LeftNav, MenuItem } = require('material-ui');

class Sidebar extends React.Component {
  // Props validation
  static propTypes = {
    ref : React.PropTypes.object
  }

  constructor () {
    super();
  }

  toggle() {
    this.refs.leftNav.toggle();
  }

  render() {
    const menuItems = [
      { type: MenuItem.Types.SUBHEADER, text: 'Views' },
      { route: '/', text: 'Lighting' },
      { route: '/parking', text: 'Available Parking' },
      { type: MenuItem.Types.SUBHEADER, text: 'Base Layer' },
      { layer: 'streets', text: 'Streets' },
      { layer: 'satellite', text: 'Satellite' },
      { type: MenuItem.Types.SUBHEADER, text: 'Settings' }
    ];

    // Break out props to consume and leave rest to pass on
    const {ref, ...childProps} = this.props;

    return (
      <div>
        <LeftNav
          ref="leftNav"
          menuItems={menuItems}
          {...childProps} />
      </div>
    );
  }
}

export default Sidebar;
