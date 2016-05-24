import React from 'react';
import Main from './components/main/Main';
import Home from './components/home/Home';
import Topic from './components/topic/';
import Error from './components/error/';
import { Route, IndexRoute } from 'react-router';

export default (
  <Route path="/" component={Main}>
    <IndexRoute component={Topic} />
    <Route path="404" component={Error} />
    <Route path="*" component={Error} />
  </Route>
);
