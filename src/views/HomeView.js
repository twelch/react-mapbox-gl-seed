import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import GLMap                  from '../components/GLMap';
import settings               from '../settings';

// Normally you'd import your action creators, but I don't want to create
// a file that you're just going to delete anyways!
const actionCreators = {
  increment : () => ({ type : 'COUNTER_INCREMENT' })
};

// We define mapStateToProps and mapDispatchToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  counter : state.counter,
  routerState : state.router
});
const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});
export class HomeView extends React.Component {
  static propTypes = {
    actions  : React.PropTypes.object,
    counter  : React.PropTypes.number
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
        <GLMap view={view} token={settings.map.token} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
