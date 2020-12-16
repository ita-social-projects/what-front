import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { NotFound, Auth, Layout } from '../index.js';

export const Routes = () => (
  <>
    <Switch>
      <Route exact path="/auth" component={Auth} />
      <Route exact path="/404" component={NotFound} />
      <Route path="/" component={Layout} />
    </Switch>
  </>
);
