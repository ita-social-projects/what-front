import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { ProtectedRoute } from '@/components/index.js';
import { NotFound, Auth, Registration, Layout } from '../../features/index.js';
import { paths } from './index.js';

export const Routes = () => (
  <>
    <Switch>
      <ProtectedRoute roles={[1, 2, 3, 4]} exact path={paths.NOT_FOUND} component={NotFound} />
      <Route exact path={paths.AUTH} component={Auth} />
      <Route exact path={paths.REGISTRATION} component={Registration} />
      <ProtectedRoute roles={[1, 2, 3, 4]} path={paths.HOME} component={Layout} />
    </Switch>
  </>
);
