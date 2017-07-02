import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import Home from '../containers/home/HomeContainer';
import ApplicationLayout from '../containers/ApplicationLayoutContainer';
import NotFound from '../components/statuscode/404';

export default function getRoutes() {
    return (
        <Route path={'/'} component={ApplicationLayout}>
            <IndexRoute component={Home}/>
            <Route path={'/404'} component={NotFound} />
            <Redirect from="*" to={'/404'} />
        </Route>
    );
}


