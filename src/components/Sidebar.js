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
      { route: '/', text: 'Main Menu' },
      { route: '/view1', text: 'Crater Lake Contours' },
      { route: '/view2', text: 'Drone Tracking' },
      { type: MenuItem.Types.SUBHEADER, text: 'Base Layer' },
      { layer: 'streets', text: 'Streets' },
      { layer: 'satellite', text: 'Satellite' }
    ];

    // Break out props to consume and leave rest to pass on
    const {ref, ...childProps} = this.props;

    const style = {
      zIndex: '100'
    };

    return (
      <div>
        <LeftNav
          ref="leftNav"
          style={style}
          menuItems={menuItems}
          {...childProps} />
      </div>
    );
  }
}

export default Sidebar;
