import React, {Component} from 'react';
import './index.less';
import { url_house_detail } from '../../../../../url/url';
import Base from '../../base/base';
import UILoading from '../../../../../components-ui/loading/loading';
import DetailHeader from '../../../../../components-ui/detail-header/detail-header';
import PropTypes from 'prop-types'

import { Modal, message, Tabs, Row, Col, Collapse, Icon, Table, List, Form, Select } from 'antd';
const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
const FormItem = Form.Item;
const Option = Select.Option;

class HouseDetail extends Base {
    detailUrl = url_house_detail;

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    /**
     * 详情页面头部的按钮事件
     */
    detailHeaderCon = {
        btns:[
            {
                title: '编辑',
                icon: 'edit',
                handle: () => {
                    console.log('编辑', this);
                    this.context.router.history.push('/admin/house-edit/update');
                }
            }, 
            {
                title: '锁定',
                icon: 'lock',
                handle: () => {
                    
                }
            },
            {
                title: '更多',
            }
        ],
        moreBtn: [
            {
                title: '作废',
                handle: () => {
                    const modal = Modal.confirm();
                    modal.update({
                        title: '作废',
                        content: '作废后将放入回收站，确认要作废选中楼宇吗?',
                        onCancel: () => {
                            modal.destroy();
                        },
                        onOk: ()=> {
                            this.deleteUrlData = {
                                floorId: this.props.id
                            }
                            this.delete().then(data => {
                                message.success('作废成功');
                                this.init();
                            });
                        }
                    });
                }
            },
            {
                title: '添加楼座',
                handle: () => {
                }
            },
            {
                title: '添加楼层',
                handle: () => {
                    console.log('添加楼层', this);
                }
            },
            {
                title: '提醒',
                handle: () => {
                    console.log('提醒', this);
                }
            },
            {
                title: '日程',
                handle: () => {
                    console.log('日程', this);
                }
            },
            {
                title: '任务',
                handle: () => {
                    console.log('任务', this);
                }
            },
        ],
        // 刷新详情页面
        refresh: () => {
            this.init();
        },
        // 关闭详情页面
        close: () => {
            console.log('close', this);
            this.props.close();
        },
        title: ''
    }
    componentDidMount() {
        this.initState();
        this.init();
    }
    initState() {
        this.setState({
            detailData: ''
        });
    }
    init() {
        this.detailUrlData = {
            resourceId: this.props.id
        }
        this.detail().then(data => {
            this.hideLoading();

            let detailHeaderCon = {...this.detailHeaderCon};
            detailHeaderCon.title = data.resultData.resourceId;
            this.setState({
                detailHeaderCon,
                detailData: data.resultData
            });
        });
    }
    render() {
        const { detailData } = this.state;
        return (
            <div className="house-detail common-detail">
                {
                    this.state.loading && <UILoading/>
                }
                <DetailHeader option={this.state.detailHeaderCon}>
                    {/* {this.state.detailHeaderCon.title} */}
                </DetailHeader>
                <div className="detail-content">
                    {
                        this.state.detailData && <Row gutter={ 10 }>
                                                    <Col span={18} style={{height:'100%'}}>
                                                        <div className="detail-resize">
                                                            <Tabs type="card">
                                                                <TabPane tab="详情" key="1">
                                                                    <Collapse bordered={false} defaultActiveKey={['1']}>
                                                                        <Panel header="基本信息" key="1">
                                                                            <Row gutter={20}>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">楼宇名称</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">{ this.state.detailData.floorName }</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">楼座</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value"></div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row gutter={20}>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">房号</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">A座</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">建筑面积</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">1-18层</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                            </Row>
                                                                        </Panel>
                                                                        <Panel header="附属信息" key="2">
                                                                            <Row gutter={40}>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">预租价格</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">{detailData.floorInvestor}</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">付款方式</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">{detailData.propertyCompany}</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row gutter={40}>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">起租年限</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value"></div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">装修标准</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">{ this.state.detailData.adress }</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row gutter={40}>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">得房率（%）</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">{detailData.propertyFee}</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">室内层高（米）</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">{detailData.publicFee}</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row gutter={40}>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">室内照片</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">{detailData.WaterElectricFee}</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">房屋概况</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">{detailData.airConditionerType}</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row gutter={40}>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">房源状态</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">{detailData.isAirConditioner}</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">锁定状态</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">{detailData.airConditioningFee}</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                            </Row>
                                                                        </Panel>
                                                                        <Panel header="系统信息" key="3">
                                                                            <Row gutter={40}>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">负责人</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value"></div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">新增日期</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">1-18层</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                            </Row>
                                                                            
                                                                        </Panel>
                                                                    </Collapse>
                                                                </TabPane>
                                                                <TabPane tab="相关" key="2">
                                                                    <Collapse bordered={false} defaultActiveKey={['1']} className="border-bottom-1">
                                                                        <Panel key="4" showArrow={false} header={
                                                                            <Row>
                                                                                <Col span={12}>
                                                                                    <div><Icon type="file-word" theme="twoTone" style={{marginRight: 10}}/>合同列表(1)</div>
                                                                                </Col>
                                                                                <Col span={12} style={{textAlign: 'right'}}><Icon type="plus" style={{marginRight: 20}}/><Icon type="down"/></Col>
                                                                            </Row>
                                                                        }>
                                                                            <Table columns={ this.columns} dataSource={ this.data} pagination={false}/>
                                                                        </Panel>
                                                                    </Collapse>
                                                                    <Collapse bordered={false} defaultActiveKey={['1']} className="border-bottom-1">
                                                                        <Panel key="4" showArrow={false} header={
                                                                            <Row>
                                                                                <Col span={12}>
                                                                                    <div><Icon type="file-word" theme="twoTone" style={{marginRight: 10}}/>合同租期(1)</div>
                                                                                </Col>
                                                                                <Col span={12} style={{textAlign: 'right'}}><Icon type="plus" style={{marginRight: 20}}/><Icon type="down"/></Col>
                                                                            </Row>
                                                                        }>
                                                                            <Table columns={ this.columns} dataSource={ this.data} pagination={false}/>
                                                                        </Panel>
                                                                    </Collapse>
                                                                    <Collapse bordered={false} defaultActiveKey={['1']} className="border-bottom-1">
                                                                        <Panel key="4" showArrow={false} header={
                                                                            <Row>
                                                                                <Col span={12}>
                                                                                    <div><Icon type="file-word" theme="twoTone" style={{marginRight: 10}}/>收付款计划(6)</div>
                                                                                </Col>
                                                                                <Col span={12} style={{textAlign: 'right'}}><Icon type="plus" style={{marginRight: 20}}/><Icon type="down"/></Col>
                                                                            </Row>
                                                                        }>
                                                                            <Table columns={ this.columns} dataSource={ this.data} pagination={false}/>
                                                                        </Panel>
                                                                    </Collapse>
                                                                    <Collapse bordered={false} defaultActiveKey={['1']} className="border-bottom-1">
                                                                        <Panel key="4" showArrow={false} header={
                                                                            <Row>
                                                                                <Col span={12}>
                                                                                    <div><Icon type="file-word" theme="twoTone" style={{marginRight: 10}}/>收付款记录(6)</div>
                                                                                </Col>
                                                                                <Col span={12} style={{textAlign: 'right'}}><Icon type="plus" style={{marginRight: 20}}/><Icon type="down"/></Col>
                                                                            </Row>
                                                                        }>
                                                                            <Table columns={ this.columns} dataSource={ this.data} pagination={false}/>
                                                                        </Panel>
                                                                    </Collapse>
                                                                    <Collapse bordered={false} defaultActiveKey={['1']} className="border-bottom-1">
                                                                        <Panel key="4" showArrow={false} header={
                                                                            <Row>
                                                                                <Col span={12}>
                                                                                    <div><Icon type="file-word" theme="twoTone" style={{marginRight: 10}}/>文档(6)</div>
                                                                                </Col>
                                                                                <Col span={12} style={{textAlign: 'right'}}><Icon type="plus" style={{marginRight: 20}}/><Icon type="down"/></Col>
                                                                            </Row>
                                                                        }>
                                                                            <Table columns={ this.columns} dataSource={ this.data} pagination={false}/>
                                                                        </Panel>
                                                                    </Collapse>
                                                                </TabPane>
                                                            </Tabs>
                                                        </div>
                                                    </Col>
                                                    <Col span={6}  style={{height:'100%'}}>
                                                        <div className="detail-resize">
                                                            <Tabs>
                                                                <TabPane tab="动态" key="3">
                                                                    <List
                                                                        itemLayout="horizontal"
                                                                        dataSource={this.data}
                                                                        renderItem={item => (
                                                                            <List.Item>
                                                                                <Icon type="message" style={{marginRight:10,position:'relative',top:4}}/>{item.name}
                                                                            </List.Item>
                                                                        )}
                                                                    />
                                                                </TabPane>
                                                                <TabPane tab="团队" key="4">
                                                                    <p>Content of Tab Pane 2</p>
                                                                    <p>Content of Tab Pane 2</p>
                                                                    <p>Content of Tab Pane 2</p>
                                                                </TabPane>
                                                            </Tabs>
                                                        </div>
                                                    </Col>
                                                </Row>
                    }
                </div>
            </div>
        )
    }
}

export default HouseDetail;