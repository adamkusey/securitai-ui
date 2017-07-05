import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import Dashboard from '../containers/dashboard/DashboardContainer';
import ApplicationLayout from '../containers/ApplicationLayoutContainer';
import NotFound from '../components/statuscode/404';

export default function getRoutes() {
    return (
        <Route path={'/'} component={ApplicationLayout}>
            <IndexRoute component={Dashboard}/>
            <Route path={'/404'} component={NotFound} />
            <Redirect from="*" to={'/404'} />
        </Route>
    );
}
