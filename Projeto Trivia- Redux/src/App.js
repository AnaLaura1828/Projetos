import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Game from './pages/Game';
import Login from './pages/Login';
import Feedback from './pages/Feedback';
import Settings from './pages/Settings';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route
        path="/settings"
        component={ Settings }
      />
      <Route
        exact
        path="/"
        component={ Login }
      />
      <Route
        exact
        path="/feedback"
        component={ Feedback }
      />
      <Route
        path="/game"
        component={ Game }
      />
      <Route
        path="/ranking"
        component={ Ranking }
      />
    </Switch>
  );
}
