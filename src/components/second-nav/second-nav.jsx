import React, { Component, Fragment } from 'react';
import './index.less';

import { Menu } from 'antd';
import { Link } from 'react-router-dom';
// import store from '../../store';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class SecondNav extends Component {
    state = {
        secondNavShow: true,
        openKeys:['1']
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    // 展开或收起
    toggleSecondNav = () => {
        this.setState({
            secondNavShow: !this.state.secondNavShow
        });
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                openKeys: ['0']
            });
        },2000);
    }
    render() {
        let { secondNavShow } = this.state;
        return (
            // <Fragment>
                <div className="second-nav">
                    <CSSTransition
                        in={ secondNavShow }
                        classNames="fade"
                        // unmountOnExit
                        timeout={ 300 }
                        >
                        <div className="content">
                            <Menu 
                                mode="inline"

                                openKeys={ this.props.openKeys }
                                onClick={ this.props.menuItemClickHandle }
                                
                                selectedKeys={ this.props.selectedKeys }
                                >
                                {
                                    this.props.navList.map((item, key) => {
                                        return (
                                            <Menu.SubMenu 
                                                key={ key } 
                                                title={ item.title }
                                                onTitleClick={ this.props.onTitleClick }
                                                >
                                                {
                                                    item.children.map((child,index) => {
                                                        return (
                                                            <Menu.Item 
                                                                key={ child.key }
                                                                >
                                                                <Link to={ child.path }>
                                                                { child.title }
                                                                </Link>
                                                            </Menu.Item>
                                                        )
                                                    })
                                                }
                                            </Menu.SubMenu>
                                        )
                                    })
                                }
                            </Menu>
                        </div>
                    </CSSTransition>
                    <div onClick={ () => { this.toggleSecondNav() } } className={ `${secondNavShow ? 'toggle' : 'toggle outer'}` }>{ secondNavShow ? '收起' : '展开'}</div>
                </div>
            // </Fragment>
        );
    }
}

// export default SecondNav;
const mapStateToProps = (state) => {
    return {
        // 当前导航列表
        navList: state.secondNavReducer[state.secondNavReducer.currentFirstNav],
        selectedKeys: state.secondNavReducer.selectedKeys,
        openKeys: state.secondNavReducer.openKeys
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // 二级导航点击的时候 回调方法
        menuItemClickHandle(menuItem) {
            let title = menuItem.item.props.children.props.children;
            let path = menuItem.item.props.children.props.to;
            
            let action = {
                type: 'add-open-tabs',
                tabPane: {
                    title: title,
                    path: path,
                    closable: true
                }
            }
            dispatch(action);

            let action2 = {
                type: 'edit-three-nav-key',
                key: menuItem.key
            }
            dispatch(action2);
        },
        onTitleClick(key) {
            let action = {
                type: 'edit-second-nav-key',
                key: key.key
            }
            dispatch(action);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SecondNav);