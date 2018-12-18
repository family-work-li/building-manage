import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import RouterContent from './router-content';
import BulidingListWindow from './pages/building/building-list-window/building-list-window';
import BulidingList from './pages/building/building-list/building-list';
import VisitingRecord from './pages/lease/visiting-record/visiting-record';
import VisitingCustomerInfo from './pages/lease/visiting-customer-info/visiting-customer-info';
import ContractListMoney from './pages/contract/contract-list-money';
import AdminIndex from './pages/index';

class AdminRouter extends Component {
    render() {
        return (
            <HashRouter>
                <RouterContent>
                    <Switch>
                        <Route path="/admin/building-list-window" component={BulidingListWindow}></Route>
                        <Route path="/admin/building-list" component={BulidingList}></Route>
                        <Route path="/admin/visiting-record" component={VisitingRecord}></Route>
                        <Route path="/admin/visiting-customer-info" component={VisitingCustomerInfo}></Route>
                        <Route path="/admin/contract-list-money" component={ContractListMoney}></Route>
                        <Route path="/admin" exact component={AdminIndex}></Route>
                    </Switch>
                </RouterContent>
            </HashRouter>
        );
    }
}

export default AdminRouter;