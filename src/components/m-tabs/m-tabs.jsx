import React, { Component } from 'react';
import './index.less';

import {withRouter, Link} from "react-router-dom";
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Tabs  } from 'antd';
const TabPane = Tabs.TabPane;

class MTabs extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    closeTabPane = (targetKey, fnName) => {
        if('remove' === fnName) {
            let _targetKey = -1;
            
            if(this.props.activeKey == targetKey) {
                let current = '';
                if(targetKey == this.props.tabPanes.length - 1) {
                    _targetKey = targetKey - 1;
                    current = this.props.tabPanes[_targetKey];
                } else {
                    _targetKey = parseInt(targetKey);
                    current = this.props.tabPanes[_targetKey + 1];
                }
                
                this.context.router.history.push(current.path);
            } else {
                if(targetKey > this.props.activeKey) {
                    _targetKey = this.props.activeKey;
                } else {
                    _targetKey = this.props.activeKey - 1;
                }
                
            }
            
            this.props.closeTabPane(targetKey,_targetKey, fnName);
        }
    }

    onChange = (activeKey) => {
        let current = this.props.tabPanes[activeKey];
        this.context.router.history.push(current.path);
        this.props.onChange(activeKey);
    }

    componentWillReceiveProps(props) {
        console.log(props);
        if(props.tabPanes.length<=1) {

        }
        return true;
    }

    render() {
        return (
            <div className="component-tabs">
                <Tabs
                onChange={this.onChange}
                // 当前激活 tab 面板的 key
                activeKey={this.props.activeKey}
                type="editable-card"
                // 是否隐藏加号图标，在 type="editable-card" 时有效
                hideAdd={true}
                tabBarGutter={ 0 }
                onEdit={this.closeTabPane}
            >
                {
                    this.props.tabPanes.map((item, key) => <TabPane tab={ item.title } key={key} closable={ !!item.closable }></TabPane>)
                }
            </Tabs>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tabPanes: state.tabPanesReducer.tabPanes,
        activeKey: String(state.tabPanesReducer.activeKey)
    }
} 
const mapDispatchToProps = (dispatch) => {
    return {
        onChange(activeKey) {
            const action = {
                type: 'update-tabs-active-key',
                activeKey
            }
            dispatch(action);
        },
        closeTabPane: (targetKey,_targetKey, fnName) => {
            if('remove' === fnName) {
                const action = {
                    type: 'delete-tabs',
                    index: targetKey,
                    _targetKey
                }
                dispatch(action);
            }
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(MTabs);