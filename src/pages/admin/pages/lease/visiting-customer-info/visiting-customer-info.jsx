import React from 'react';
import './index.less';
import { Icon, Button, Input, message } from 'antd';
import Base from '../../base/base';
import { url_lease_customer_info, url_lease_customer_delete, url_lease_customer_un_lock } from '../../../../../url/url'
import SMyBuilding from '../../../../../components/s-my-building/s-my-building';
import SMoreHandle from '../../../../../components/s-more-handle';
import TableCheckHandle from '../../../../../components/table-checked-handle';
import ListHeader from '../../../../../components-ui/list-header';
import MTable from '../../../../../components/m-table/m-table';
import ListFooter from '../../../../../components/list-footer/list-footer';
import MSlide from '../../../../../components/m-slide/m-slide';
import CustomerDetail from '../customer-detail/customer-detail';
import { connect } from 'react-redux';
const Search = Input.Search;

/**
 * 来访客户信息
 */
class VisitingCustomerInfo extends Base {
    queryUrl = url_lease_customer_info;
    deleteUrl = url_lease_customer_delete;
    un_lockUrl = url_lease_customer_un_lock;
    
    click = () => {
        this.setState({
            checkedHandle: {
                total: Math.floor(Math.random() * 100),
                flag: true
            }
        })
    }
    /**
     * 列表头部右侧的按钮事件信息
     */
    listHeaderOption = {
        btns: [
            {
                title: '筛选',
                handle: () => {
                    console.log('筛选', this)
                }
            },
            {
                type: 'btn-add',
                btnType: 'primary',
                title: '新增客户',
                handle: () => {
                    this.props.history.push('/admin/customer-edit/add');
                }
            },
            {
                type: 'more',
            }
        ],
        // 弹窗层的更多操作 按钮
        moreOperBtns: [
            {
                title: '作废',
                icon: 'delete',
                handle: () => {
                    // const customerIds = this.state.tableOption.selectedRowKeys.reduce((a, b) => {
                    //     return 
                    // });
                    // this.deleteUrlData = {
                    //     customerId: this.state.tableOption.selectedRowKeys.toString()
                    // }
                    
                    // this.delete().then(data => {
                    //     message.success('作废成功');
                    //     this.init();
                    // });
                    this.delete('customerId','来访客户记录');
                }
            },
            {
                title: '锁定',
                icon: 'lock',
                handle: () => {
                    this.un_lock('customerId','来访客户记录','lock');
                }
            },
            {
                title: '解锁',
                icon: 'unlock',
                handle: () => {
                    this.un_lock('customerId','来访客户记录','unlock');
                }
            },
            {
                title: '转移',
                icon: 'swap',
                handle: () => {
                    console.log('转移', this);
                }
            },
            {
                title: '导出选中',
                icon: 'download',
                handle: () => {
                    console.log('导出选中', this);
                }
            },
        ],
        // 关闭list-header-pop
        close:() => {
            let { listHeaderPop } = this.state;
            listHeaderPop.flag = false;
            listHeaderPop.total = 0;
            this.setState({
                listHeaderPop
            });
        }
    }

    componentDidMount() {
        this.setState({
            /**
             * 表格
             */
            tableOption: {
                // 所有表头字段
                columns: [
                    {
                        title: '客户名称',
                        dataIndex: 'customerName',
                        key: 'customerName',
                        width: 150
                    },
                    {
                        title: '经济公司',
                        dataIndex: 'economicCompany',
                        key: 'economicCompany',
                        width: 150
                    },
                    {
                        title: '联系人',
                        dataIndex: 'contacts',
                        key: 'contacts',
                        width: 150
                    },
                    {
                        title: '联系电话',
                        dataIndex: 'contactsPhone',
                        key: 'contactsPhone',
                        width: 150
                    },
                    {
                        title: '客户来源',
                        dataIndex: 'customerSource',
                        key: 'customerSource',
                        width: 150
                    },
                    {
                        title: '客户级别',
                        dataIndex: 'customerLevel',
                        key: 'customerLevel',
                        width: 150
                    },
                    {
                        title: '客户行业',
                        dataIndex: 'customerIndustry',
                        key: 'customerIndustry',
                        width: 150
                    },
                    {
                        title: '当前地址',
                        dataIndex: 'currentAddress',
                        key: 'currentAddress',
                        width: 150
                    },
                    {
                        title: '当前面积',
                        dataIndex: 'currentArea',
                        key: 'currentArea',
                        width: 150
                    },
                    {
                        title: '当前到期',
                        dataIndex: 'expireDate',
                        key: 'expireDate',
                        width: 150
                    },
                    {
                        title: '当前租金',
                        dataIndex: 'currentRent',
                        key: 'currentRent',
                        width: 150
                    },
                    {
                        title: '找房原因',
                        dataIndex: 'seekReason',
                        key: 'seekReason',
                        width: 150
                    },
                    {
                        title: '入驻时间',
                        dataIndex: 'checkTime',
                        key: 'checkTime',
                        width: 150
                    },
                    {
                        title: '客户状态',
                        dataIndex: 'customerStatus',
                        key: 'customerStatus',
                        width: 150
                    },
                    {
                        title: '新增时间',
                        dataIndex: 'creationTime',
                        key: 'creationTime',
                        width: 150
                    },
                    {
                        title: '负责人',
                        dataIndex: 'personInCharge',
                        key: 'personInCharge',
                        // fixed: 'left',
                        width: 150
                    }
                ],
                // 表数据字段你
                data: [],
                // 正在加载loading,
                loading: true,
                // 选择行的key值
                selectedRowKeys:[],
                // checked 选中的回调
                checkedHandle: (selectedRowKeys, selectedRows) => {
                    let { listHeaderPop } = this.state;
                    listHeaderPop.flag = true;
                    listHeaderPop.total = selectedRows.length;
                    this.selectedData = selectedRows;
                    this.setState({
                        listHeaderPop
                    });
                    let { tableOption } = this.state;
                    tableOption.selectedRowKeys = selectedRowKeys;
                    this.setState({
                        tableOption
                    });
                }
            },
            
        }, () => {
            this.init();
        });
        
    }

    init = () => {
        this.query().then(data => {
            let { tableOption } = this.state;
            data.resultData.customerList.forEach((item, key) => {
                item.key = key;
            });
            tableOption.data = data.resultData.customerList;
            tableOption.loading = false;

            this.setState({
                tableOption
            });
        });
    }

    /**
     * table的单行点击
     */
    tableRowClickHandle = (item) => {
        console.log(item);
        this.setState({
            // mSlideVisible: true,
            id: item.customerId
        });

        this.props.openBuildingDetail();

    }

    render() {
        return (
            <div className="visiting-customer-info">

                <ListHeader defaultOption={ this.listHeaderOption } stateOption={ this.state.listHeaderPop }>
                    <SMyBuilding style={{ marginLeft:20,marginTop: 15 }}/>
                    <div className="quick-search" style={{position:'absolute',height:60,width:280,left:'50%',top:0,marginLeft:-180}}>
                        <Search
                            placeholder="搜索楼座房号如:G-1213或联系人"
                            onSearch={value => console.log(value)}
                            enterButton
                            />
                    </div>
                </ListHeader>

                <div className="customer-info-list">
                    {
                        this.state.tableOption && <MTable table={ this.state.tableOption } rowClickHandle={ this.tableRowClickHandle }/>
                    }
                </div>

                <ListFooter pagination={ this.state.pagination }></ListFooter>

                <MSlide> <CustomerDetail id={ this.state.id }/></MSlide>
            </div>
        );
    }
}

// export default VisitingCustomerInfo;

const mapStateToProps = (state) => {
    return {
        mSlideVisible: state.buildingReducer.mSlideVisible
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        openBuildingDetail() {
            const action = {
                // type: 'update-detail-show',
                type: 'update-animation-drawer',
                visible: true
            }

            dispatch(action);
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(VisitingCustomerInfo);