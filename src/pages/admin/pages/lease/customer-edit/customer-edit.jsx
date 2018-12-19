import React from 'react';
import './index.less';
import { url_lease_customer_edit } from '../../../../../url/url';
import Base from '../../base/base';
import UILoading from '../../../../../components-ui/loading/loading';
import EditHeader from '../../../../../components-ui/edit-header/edit-header';
import LayoutTitle from '../../../../../components-form/layout-title';
import LayoutCol from '../../../../../components-form/layout-col';
import LayoutGrid from '../../../../../components-form/layout-grid';
import MSelect from '../../../../../components-form/select/m-select';
import { Form, Input, message, DatePicker, InputNumber } from 'antd';
const TextArea = Input.TextArea;
const FormItem = Form.Item;

class CustomerEdit extends Base {
    addUrl = url_lease_customer_edit;
    pageTitle = '';
    // 编辑 页面的 头部更多操作
    editHeaderOption = [
        {
            title: '保存并新增记录',
            type: 'primary',
            handle: (e) => {
                const fieldsValue = this.props.form.getFieldsValue();
                const data = JSON.parse(JSON.stringify(fieldsValue));
                fieldsValue.checkTime && (data.checkTime = fieldsValue.checkTime.format('YYYY-MM-DD h:mm:ss'));
                fieldsValue.expireDate && (data.expireDate = fieldsValue.expireDate.format('YYYY-MM-DD h:mm:ss'));
                this.addUrlData = data;
                this.add().then(data => {
                    message.success('新增客户成功',2,() => {
                        this.hideLoading();
                        window.history.go(-1);
                    });
                });
            }
        },
        {
            title: '取消',
            handle: () => {
                this.cancle();
            },
        }
    ]

    init() {
        const action = this.props.match.params.action;
        if('add' === action) {
           this.pageTitle = '新增来访客户'; 
        } else {
            this.pageTitle = '编辑来访客户'; 
        }
    }

    componentWillMount() {
        this.init();
    }

    componentDidMount() {
        // this.init();
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="visiting-customer-edit">
                {
                    this.state.loading && <UILoading></UILoading>
                }

                <EditHeader title={this.pageTitle} option={ this.editHeaderOption }/>
                <div className="customer-edit-con">
                    <LayoutTitle title="基本信息"></LayoutTitle>
                    <LayoutCol>
                        <LayoutGrid required={true} label="客户名称">
                                <FormItem>
                                    {
                                        getFieldDecorator('customerName',{
                                            rules: [
                                                {
                                                    required: true, 
                                                    message: '请输入个人姓名或公司名称',
                                                }
                                            ]
                                        })(<Input placeholder="请输入楼宇名称"></Input>)
                                    }
                                </FormItem>
                        </LayoutGrid>
                        <LayoutGrid label="经纪公司">
                                <FormItem>
                                    {
                                        getFieldDecorator('economicCompany',{
                                            rules: [
                                                {
                                                    required: true, 
                                                    message: '请输入个人姓名或公司名称',
                                                }
                                            ]
                                        })(<Input placeholder="请输入楼宇名称"></Input>)
                                    }
                                </FormItem>
                        </LayoutGrid>
                    </LayoutCol>
                    <LayoutCol>
                        <LayoutGrid required={true} label="联系人">
                                <FormItem>
                                    {
                                        getFieldDecorator('contacts',{
                                            rules: [
                                                {
                                                    required: true, 
                                                    message: '请输入个人姓名或公司名称',
                                                }
                                            ]
                                        })(<Input placeholder="请输入楼宇名称"></Input>)
                                    }
                                </FormItem>
                        </LayoutGrid>
                        <LayoutGrid required={true} label="联系电话">
                                <FormItem>
                                    {
                                        getFieldDecorator('contactsPhone',{
                                            rules: [
                                                {
                                                    required: true, 
                                                    message: '请输入个人姓名或公司名称',
                                                }
                                            ]
                                        })(<Input placeholder="请输入楼宇名称"></Input>)
                                    }
                                </FormItem>
                        </LayoutGrid>
                    </LayoutCol>
                    <LayoutCol>
                        <LayoutGrid label="意向房源">
                                <FormItem>
                                    {
                                        getFieldDecorator('intentionalSource',{
                                            rules: [
                                                {
                                                    required: true, 
                                                    message: '请输入个人姓名或公司名称',
                                                }
                                            ]
                                        })(<Input placeholder="请输入楼宇名称"></Input>)
                                    }
                                </FormItem>
                        </LayoutGrid>
                        <LayoutGrid label="期望租金">
                                <FormItem>
                                    {
                                        getFieldDecorator('expectedRent',{
                                            rules: [
                                                {
                                                    required: true, 
                                                    message: '请输入个人姓名或公司名称',
                                                }
                                            ]
                                        })(<Input placeholder="请输入楼宇名称"></Input>)
                                    }
                                </FormItem>
                        </LayoutGrid>
                    </LayoutCol>
                    <LayoutCol>
                        <LayoutGrid label="沟通阶段">
                                <FormItem>
                                    {
                                        getFieldDecorator('leasePhase',{
                                            rules: [
                                                {
                                                    required: true, 
                                                    message: '请输入个人姓名或公司名称',
                                                }
                                            ]
                                        })(<MSelect code="dic.communicationPhase"/>)
                                    }
                                </FormItem>
                        </LayoutGrid>
                        <LayoutGrid label="沟通方式">
                                <FormItem>
                                    {
                                        getFieldDecorator('visitType',{
                                            rules: [
                                                {
                                                    required: true, 
                                                    message: '请输入个人姓名或公司名称',
                                                }
                                            ]
                                        })(<MSelect code="dic.communicationMode"/>)
                                    }
                                </FormItem>
                        </LayoutGrid>
                    </LayoutCol>
                    <LayoutCol>
                        <LayoutGrid label="备注">
                                <FormItem>
                                    {
                                        getFieldDecorator('remark',{
                                            rules: [
                                                {
                                                    required: true, 
                                                    message: '请输入个人姓名或公司名称',
                                                }
                                            ]
                                        })(<TextArea></TextArea>)
                                    }
                                </FormItem>
                        </LayoutGrid>
                    </LayoutCol>
                                    
                    <LayoutTitle title="附属信息"></LayoutTitle>
                    <LayoutCol>
                        <LayoutGrid label="客户来源">
                                <FormItem>
                                    {
                                        getFieldDecorator('customerSource',{
                                            rules: [
                                                {
                                                    required: true, 
                                                    message: '请输入个人姓名或公司名称',
                                                }
                                            ]
                                        })(<MSelect code="dic.customerSource"/>)
                                    }
                                </FormItem>
                        </LayoutGrid>
                        <LayoutGrid label="客户级别">
                                <FormItem>
                                    {
                                        getFieldDecorator('customerLevel',{
                                            rules: [
                                                {
                                                    required: true, 
                                                    message: '请输入个人姓名或公司名称',
                                                }
                                            ]
                                        })(<MSelect code="dic.customer"/>)
                                    }
                                </FormItem>
                        </LayoutGrid>
                    </LayoutCol>
                    <LayoutCol>
                        <LayoutGrid label="客户行业">
                                <FormItem>
                                    {
                                        getFieldDecorator('customerIndustry')(<MSelect code="dic.business"></MSelect>)
                                    }
                                </FormItem>
                        </LayoutGrid>
                        <LayoutGrid label="业务">
                                <FormItem>
                                    {
                                        getFieldDecorator('business',{
                                            rules: [
                                                {
                                                    required: true, 
                                                    message: '请输入个人姓名或公司名称',
                                                }
                                            ]
                                        })(<Input placeholder="请输入楼宇名称"></Input>)
                                    }
                                </FormItem>
                        </LayoutGrid>
                    </LayoutCol>
                    <LayoutCol>
                        <LayoutGrid label="当前地址">
                                <FormItem>
                                    {
                                        getFieldDecorator('currentAddress',{
                                            rules: [
                                                {
                                                    required: true, 
                                                    message: '请输入个人姓名或公司名称',
                                                }
                                            ]
                                        })(<Input placeholder="请输入楼宇名称"></Input>)
                                    }
                                </FormItem>
                        </LayoutGrid>
                        <LayoutGrid label="当前面积(m²)">
                                <FormItem>
                                    {
                                        getFieldDecorator('currentArea',{
                                            rules: [
                                                {
                                                    required: true, 
                                                    message: '请输入个人姓名或公司名称',
                                                }
                                            ]
                                        })(<InputNumber style={{width: '100%'}}/>)
                                    }
                                </FormItem>
                        </LayoutGrid>
                    </LayoutCol>
                    <LayoutCol>
                        <LayoutGrid label="当前租金">
                                <FormItem>
                                    {
                                        getFieldDecorator('currentRent',{
                                            rules: [
                                                {
                                                    required: true, 
                                                    message: '请输入个人姓名或公司名称',
                                                }
                                            ]
                                        })(<Input placeholder="请输入楼宇名称"></Input>)
                                    }
                                </FormItem>
                        </LayoutGrid>
                        <LayoutGrid label="当前到期">
                                <FormItem>
                                    {
                                        getFieldDecorator('expireDate')(<DatePicker style={{width: '100%'}}/>)
                                    }
                                </FormItem>
                        </LayoutGrid>
                    </LayoutCol>
                    <LayoutCol>
                        <LayoutGrid label="找房原因">
                                <FormItem>
                                    {
                                        getFieldDecorator('seekReason',{
                                            rules: [
                                                {
                                                    required: true, 
                                                    message: '请输入个人姓名或公司名称',
                                                }
                                            ]
                                        })(<MSelect code="dic.reasons"/>)
                                    }
                                </FormItem>
                        </LayoutGrid>
                        <LayoutGrid label="计划入住">
                                <FormItem>
                                    {
                                        getFieldDecorator('checkTime',{
                                            rules: [
                                                {
                                                    required: true, 
                                                    message: '请输入个人姓名或公司名称',
                                                }
                                            ]
                                        })(<DatePicker style={{width: '100%'}}/>)
                                    }
                                </FormItem>
                        </LayoutGrid>
                    </LayoutCol>
                    <LayoutTitle title="系统信息"></LayoutTitle>
                    <LayoutCol>
                        <LayoutGrid required={true} label="负责人">
                            <FormItem>
                                {
                                    getFieldDecorator('personInCharge',{
                                        rules: [
                                            {
                                                required: true, 
                                                message: '请输入负责人',
                                            }
                                        ]
                                    })(<Input placeholder="请输入楼宇名称"></Input>)
                                }
                            </FormItem>
                        </LayoutGrid>
                    </LayoutCol>
                </div>
            </div>
        )
    }
}

export default Form.create()(CustomerEdit);