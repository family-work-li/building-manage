import React, { Component, Fragment } from 'react';
import './index.less';
import { getCookie } from '@/util';
import LeftNav from '../../components/left-nav';
import MHeader from '../../components/m-header';
import AdminRouter from './admin-router';
import SecondNav from '../../components/second-nav/second-nav';

import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

class Admin extends Component {
    state = {
        isLogin: false
    }
    isLogin = false
    componentWillMount() {
        const isLogin = getCookie('token');
        this.isLogin = isLogin;
        // this.setState({
        //     isLogin
        // });
    }
    componentDidMount() {
        
    }
    render() {
        return (
            <Fragment>
                {
                    !this.isLogin ? <Redirect to="/login" /> : <div className="admin">
                        <LeftNav></LeftNav>
                        <div className="layout-main">
                            <MHeader></MHeader>
                            <div className="layout-content">
                                <SecondNav></SecondNav>
        
                                <HashRouter>
                                    <Switch>
                                        {/*  */}
                                        <AdminRouter></AdminRouter>
                                    </Switch>
                                </HashRouter>
                            </div>
                        </div>
                    </div>
                }
            </Fragment>
        );
    }
}

export default Admin;