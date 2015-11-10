import { Route, IndexRoute }   from 'react-router';
import React       from 'react';
import CoreLayout  from 'layouts/CoreLayout';
import HomeView    from 'views/HomeView';
import View1    from 'views/View1';
import View2    from 'views/View2';

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path="view1" component={View1} />
    <Route path="view2" component={View2} />
  </Route>
);
