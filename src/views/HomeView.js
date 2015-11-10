import React                  from 'react';
import { connect }            from 'react-redux';
import { Grid, Cell, findBreakpoints, optimizedResize } from 'react-flexr';
// import settings               from '../../config/client';

const Menu = require('material-ui/lib/menus/menu');
const MenuItem = require('material-ui/lib/menus/menu-item');

import 'styles/core.scss';

const mapStateToProps = (state) => ({
  mapState : state.map,
  routerState : state.router
});

export class HomeView extends React.Component {
  static propTypes = {
    mapState  : React.PropTypes.object,
    history : React.PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      updatedAt: 0
    };
    this. _onMenuTouchTap = this. _onMenuTouchTap.bind(this);
  }

  componentDidMount() {
    optimizedResize.init( () => {
      if ( findBreakpoints() ) {
        this.forceUpdate();
      }
    });
  }

  _onMenuTouchTap(e, item) {
    this.props.history.pushState(null, item.props.value);
  }

  render () {
    const styles = {
      home: {
        marginTop: 60
      },
      logo: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '200px',
        margin: '0px auto 80px auto'
      },
      menu: {
        position: 'relative',
        margin: 'auto',
        backgroundColor: 'transparent'
      },
      list: {
        backgroundColor: 'transparent'
      }
    };

    return (
      <div className='home-screen' style={styles.home}>
        <Grid gutter="0px" align="center" hAlign='center'>
          <Cell palm='hidden' />
          <Cell>
            <img style={styles.logo} src="/assets/img/map-logo.png" />
          </Cell>
          <Cell palm='hidden' />
        </Grid>
        <Grid gutter="0px" align="center" hAlign='center'>
          <Cell palm='hidden' />
          <Cell align="center">
            <Menu className='main-menu' listStyle={styles.list} style={styles.menu} autoWidth onItemTouchTap={this._onMenuTouchTap}>
              <MenuItem value="/view1" primaryText="Mount Fuji Contours" />
              <MenuItem value="/view2" primaryText="Venice Flight" />
            </Menu>
          </Cell>
          <Cell palm='hidden' />
        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps)(HomeView);
