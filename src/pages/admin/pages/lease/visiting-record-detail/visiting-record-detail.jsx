import React, { Component } from 'react';
// import './index.less';
import Base from '../../base/base';
import { Row, Col, Button, Icon, Tabs, Collapse, Table, List, Avatar, Modal, message, Form, Input, Select } from 'antd';
import { url_lease_visiting_record_detail } from '../../../../../url/url';
import DetailHeader from '../../../../../components-ui/detail-header/detail-header';
import { connect } from 'react-redux';

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
const FormItem = Form.Item;
const Option = Select.Option;

class VisitingRecordDetail extends Base {
    detailUrl = url_lease_visiting_record_detail;
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

                    this.context.router.history.push({
                        pathname: '/admin/visiting-record-edit/update',
                        search: `id=${this.props.id}`
                    });
                    this.props.closeDetail();
                }
            }, 
            {
                title: '复制',
                icon: 'copy',
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
                title: '作废',
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
        this.setState({
            detailHeaderCon: {...this.detailHeaderCon}
        })
        this.init();
    }

    init() {
        this.showLoading();
        this.detailUrlData = {
            visitingId: this.props.id
        }
        this.detail().then(data => {
            this.hideLoading();

            let detailHeaderCon = {...this.detailHeaderCon};
            detailHeaderCon.title = data.resultData.customerId;
            this.setState({
                detailHeaderCon,
                detailData: data.resultData
            });
        })
    }
    render() {
        let { detailData } = this.state;
        return (
            <div className="customer-detail common-detail">
                <DetailHeader option={this.state.detailHeaderCon}>
                    {/* {this.state.detailHeaderCon.title} */}
                </DetailHeader>

                <div className="detail-content">
                    {
                        detailData && <Row gutter={ 10 }>
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
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">楼宇图片</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value"></div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row gutter={20}>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">楼座</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">A座</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">楼层</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">1-18层</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row gutter={40}>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">楼座</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">A座</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">楼层</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">1-18层</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                            </Row>
                                                                        </Panel>
                                                                        <Panel header="附属信息" key="2">
                                                                            <Row gutter={40}>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">开发公司</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">{detailData.floorInvestor}</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">物业服务</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">{detailData.propertyCompany}</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row gutter={40}>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">楼宇区位</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value"></div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">详细地址</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">{ this.state.detailData.adress }</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row gutter={40}>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">物业管理费</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">{detailData.propertyFee}</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">公摊水电费</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">{detailData.publicFee}</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row gutter={40}>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">室内水电费</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">{detailData.WaterElectricFee}</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">空调类型</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">{detailData.airConditionerType}</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row gutter={40}>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">空调开放时间</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">{detailData.isAirConditioner}</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">空调费用</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">{detailData.airConditioningFee}</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row gutter={40}>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">车位数量</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">{detailData.parkingNumber}</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">车位租金</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">{detailData.parkingFee}</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row gutter={40}>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">电梯品牌</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">{detailData.elevatorBrand}</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">电梯数量</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">{detailData.elevatorsNumber}</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row gutter={40}>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">项目介绍</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">{detailData.projectIntroduction}</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">交通配套</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">{detailData.trafficSurvey}</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row gutter={40}>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">锁定状态</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value"></div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">备注</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">{detailData.remark}</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                            </Row>
                                                                        </Panel>
                                                                        <Panel header="统计信息" key="3">
                                                                            <Row gutter={40}>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">租赁面积</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value"></div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">空置面积</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">1-18层</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row gutter={40}>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">锁定面积</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value"></div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">已租面积</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">1-18层</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row gutter={40}>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">出租率</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value"></div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">成交均价</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">1-18层</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row gutter={40}>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">入驻企业</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value"></div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">企均面积</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">1-18层</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                            </Row>
                                                                        </Panel>
                                                                        <Panel header="系统信息" key="4">
                                                                            <Row gutter={40}>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">新增日期</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">2020年10月22日</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">负责人</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">张健</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row gutter={40}>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">新增日期</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">2020年10月22日</div></Col>
                                                                                    </Row>
                                                                                </Col>
                                                                                <Col span={12}>
                                                                                    <Row>
                                                                                        <Col className="border-bottom-1" span={10}><div className="name">负责人</div></Col>
                                                                                        <Col className="border-bottom-1" span={14}><div className="value">张健</div></Col>
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

// export default VisitingRecordDetail;

const mapStateToProps = () => {
    return {

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        closeDetail() {
            const action = {
                type: 'update-animation-drawer',
                visible: false
            }

            dispatch(action);
        }
    }
}
export default connect(null, mapDispatchToProps)(VisitingRecordDetail);