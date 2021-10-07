import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { ProtectedRoute } from '@/components/index.js';
import { NotFound, Auth, Registration, Layout, Counter, ForgotPassword, ResetPassword } from '../../features/index.js';
import { paths } from './index.js';

export const Routes = () => (
  <>
    <Switch>
      <ProtectedRoute roles={[1, 2, 4, 8]} exact path={paths.NOT_FOUND} component={NotFound} />
      <Route exact path={paths.AUTH} component={Auth} />
      <Route exact path={paths.REGISTRATION} component={Registration} />
      <Route exact path={paths.FORGOT_PASSWORD} component={ForgotPassword} />
      <Route exact path={paths.RESET_PASSWORD} component={ResetPassword} />
      <Route exact path={paths.COUNTER} component={Counter} />
      <ProtectedRoute roles={[1, 2, 4, 8]} path={paths.HOME} component={Layout} />
    </Switch>
  </>
);
