import React from 'react';
import { url_lease_visiting_record_edit, url_lease_visiting_record_detail } from '../../../../../url/url';
import Base from '../../base/base';
import UILoading from '../../../../../components-ui/loading/loading';
import EditHeader from '../../../../../components-ui/edit-header/edit-header';
import LayoutTitle from '../../../../../components-form/layout-title';
import LayoutCol from '../../../../../components-form/layout-col';
import LayoutGrid from '../../../../../components-form/layout-grid';
import MSelect from '../../../../../components-form/select/m-select';
import { queryString } from '../../../../../util';
import { Form, Input } from 'antd';
const FormItem = Form.Item;
const TextArea = Input.TextArea;

class VisitingRecordEdit extends Base {
    addUrl = url_lease_visiting_record_edit;
    editUrl = url_lease_visiting_record_edit;
    detailUrl = url_lease_visiting_record_detail;
    // 编辑 页面的 头部更多操作
    editHeaderOption = [
        {
            title: '保存',
            type: 'primary',
            handle: (e) => {
                console.log('保存', this.props.form.getFieldsValue());

                if(!this.vailForm()) {
                    return false;
                }

                const field = JSON.parse(JSON.stringify(this.props.form.getFieldsValue()));
                field.visitingId = this.detailData.visitingId;
                // this.addUrlData = field;
                this.editUrlData = field;

                // this.add().then(data => {
                //     message.info('新增来访记录成功');
                //     window.history.go(-1);
                // });
                this.edit('visitingId','来访记录');
            }
        },
        {
            title: '取消',
            handle: () => {
                this.cancle();
            },
        }
    ]

    componentWillMount() {
        this.editPageTitleFn('来访记录');
    }
    componentDidMount() {
        this.props.match.params.action === 'update' && this.init();
    }
    init() {

        this.detailUrlData = {
            visitingId: queryString(this.props.location.search, 'id')
        }
        this.detail().then(data => {
            this.detailData = data.resultData;
            this.props.form.setFieldsValue({
                // customerId: data.resultData.customerId,
                // intentionalSource: data.resultData.intentionalSource
                ...data.resultData
            });
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{width:'100%',height:'100%'}}>
                {
                    this.state.loading && <UILoading></UILoading>
                }

                <EditHeader title={this.editPageTitle} option={ this.editHeaderOption }/>
                <div style={{width:'100%',height: 'calc(100% - 80px)',overflow: 'auto'}}>
                    <LayoutTitle title="基本信息"></LayoutTitle>
                    <LayoutCol>
                        <LayoutGrid required={true} label="客户名称">
                                <FormItem>
                                    {
                                        getFieldDecorator('customerId',{
                                            
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
                        <LayoutGrid label="备注">
                                <FormItem>
                                    {
                                        getFieldDecorator('remark',{
                                            rules: [
                                                {
                                                    required: true, 
                                                    message: '请输入备注信息',
                                                }
                                            ]
                                        })(<TextArea placeholder="请输入备注信息"></TextArea>)
                                    }
                                </FormItem>
                        </LayoutGrid>
                    </LayoutCol>
                    <LayoutCol>
                        <LayoutGrid required={true} label="意向房源">
                                <FormItem>
                                    {
                                        getFieldDecorator('intentionalSource',{
                                            rules: [
                                                {
                                                    required: true, 
                                                    message: '请输入个人姓名或公司名称',
                                                }
                                            ]
                                        })(<Input placeholder="请输入意向房源"></Input>)
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
                                                    message: '请输入期望租金',
                                                }
                                            ]
                                        })(<Input placeholder="请输入期望租金"></Input>)
                                    }
                                </FormItem>
                        </LayoutGrid>
                    </LayoutCol>
                    <LayoutCol>
                        <LayoutGrid required={true} label="沟通阶段">
                                <FormItem>
                                    {
                                        getFieldDecorator('leasePhase',{
                                            rules: [
                                                {
                                                    required: true, 
                                                    message: '请选择沟通阶段',
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
                                                    message: '请选择沟通方式',
                                                }
                                            ]
                                        })(<MSelect code="dic.communicationMode"/>)
                                    }
                                </FormItem>
                        </LayoutGrid>
                    </LayoutCol>
                   
                    <LayoutTitle title="系统信息"></LayoutTitle>
                    <LayoutCol>
                        <LayoutGrid required label="负责人">
                            <FormItem>
                                {
                                    getFieldDecorator('personInCharge',{
                                        rules: [
                                            {
                                                required: true, 
                                                message: '请选择负责人',
                                            }
                                        ]
                                    })(<Input placeholder="请输入负责人"></Input>)
                                }
                            </FormItem>
                        </LayoutGrid>
                    </LayoutCol>
                </div>
            </div>
        )
    }
}

export default Form.create()(VisitingRecordEdit);