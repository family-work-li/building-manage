import { Component } from 'react';
import { mAxios } from '../../../../util';
import PropTypes from 'prop-types';
import { message, Modal } from 'antd';

class Base extends Component {
    queryUrl = ''
    addUrl = ''
    updateUrl = ''
    deleteUrl = ''
    detailUrl = ''
    un_lockUrl = ''

    queryUrlData = {
        pageSize: 1,
        pageIndex: 20
    };
    addUrlData = ''
    updateUrlData = ''
    deleteUrlData = ''
    detailUrlData = ''
    un_lockUrlData = ''

    state = {
        // 很多页面用到的 id 值 比如 floorId , 等
        id: '',
        // 正在加载
        loading: false,
        // 详情弹窗出现
        mSlideVisible: false,
        /**
         * 选中表格行后的更多操作
         */
        listHeaderPop: {
            total: 0,
            flag: false,
        },
        detailHeaderCon: {
            title: '',
            list: []
        },
        /**
         * 表格
         */
        tableOption: {
            // 所有表头字段
            columns: [],
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
        /** footer 分页 */
        pagination: {
            total: 0,
            defaultPageSize: 20,
            onChangeHandle: (page, pageSize) => {
                console.log(page, pageSize);
                this.queryUrlData = {
                    pageSize: (page-1) * pageSize + 1,
                    pageIndex: pageSize
                }
                
                this.init();
            },
            onShowSizeChangeHandle:(current,size) => {
                console.log(current, size)
                this.queryUrlData = {
                    pageSize: (current-1) * size + 1,
                    pageIndex: size
                }
                this.init();
            }
        },
        // 确认框
        modal: {
            show: false,
            close: () => {
                let { modal } = this.state;
                modal.show = false;
                this.setState({
                    modal
                });
            }
        }
    }

    // 路由 能通过 this.context.router.history获取到路由  使用 push go 等方法
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    /** 选择的数据集合 */
    selectedData = []
    /** 编辑（新增/修改）页面的 定义 */
    editPageTitle = '';
    /**
     * 编辑（新增/修改）页面的 方法设置
     * @param info 标题的信息补全
     */
    editPageTitleFn = (info) => {
        const action = this.props.match.params.action;
        switch(action) {
            case 'add': 
                this.editPageTitle = `新增${info}`; 
            break;
            case 'update': 
                this.editPageTitle = `编辑${info}`; 
            break;
            case 'copy': 
                this.editPageTitle = `复制${info}`; 
            break;
        }
    }

    /**
     * 列表头部操作
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
                title: '新增楼宇',
                handle: () => {
                    console.log('btn-add', this);
                }
            },
            {
                type: 'more',
            }
        ],
        checkHandle: {
            handle: () => {
                let { checkedHandle } = this.state;
                checkedHandle.flag = false;
                this.setState({
                    checkedHandle
                });
            }
        }
    }

    /**
     * 基类的 url 地址
     * 
     */
    url = {
        query: '',
        add: '',
        update: '',
        delete: '',
        detail: ''
    }

    /**
     * 基类的url 数据
     */
    urlData = {
        query: '',
        add: '',
        update: '',
        delete: '',
        detail: ''
    }

    /**
     * 基类的查询
     */
    query = () => {
        let { tableOption, listHeaderPop } = this.state;
        tableOption.selectedRowKeys = [];
        tableOption.loading = true;
        // 收起list -header 弹出层
        listHeaderPop.flag = false;
        listHeaderPop.total = 0;
        
        this.setState({
            tableOption,
            listHeaderPop
        });
        return new Promise((reslove, rejects) => {
            mAxios.ajax({
                // url: this.url.query,
                // data: this.urlData.query,
                url: this.queryUrl,
                data: this.queryUrlData
            }).then(data => {
                // this.initData(data);
                // 分页设置
                let total = data.resultData.totalRecord;
                let { pagination } = this.state;
                pagination.total = total;
                this.setState({
                    pagination
                });
                reslove(data);
            });
        });
    }

    /**
     * 基类的新增
     */
    add = () => {
        this.showLoading();
        return new Promise((reslove, rejects) => {
            mAxios.ajax({
                url: this.addUrl,
                data: this.addUrlData,
            }).then(data => {
                reslove(data);
            });
        });
    }

    /**
     * 删除
     * @param id 要删除的主键 id （如： floorId）
     * @param info 删除的提示中的关键信息
     */
    delete = (id, info = '') => {
        return new Promise((reslove, rejects) => {
            const modal = Modal.confirm();
            modal.update({
                title: '作废',
                content: `作废后将放入回收站，确认要作废选中的${info}吗?`,
                onCancel: () => {
                    modal.destroy();
                },
                onOk: () => {
                    this.deleteUrlData = {
                        [id]: this.selectedData.reduce((a, b) => {
                            return a ? `${a},${b[id]}` : `${b[id]}`;
                        }, '')
                    }

                    mAxios.ajax({
                        url: this.deleteUrl,
                        data: this.deleteUrlData
                    }).then(data => {
                        message.success(`${info}作废成功`);
                        modal.destroy();

                        reslove(data);
                        // 初始化列表数据
                        this.init();
                    })
                }
            });
        });
    }

    /**
     * 详情
     */
    detail = () => {
        return new Promise((reslove, rejects) => {
            mAxios.ajax({
                url: this.detailUrl,
                data: this.detailUrlData
            }).then(reslove);
        })
    }

    /**
     * 锁定或 解锁
     * @param id
     * @param info
     * @param status  = (lock=锁定，unlock=解锁)
     */
    un_lock = (id, info, status = 'lock') => {
        return new Promise((reslove, rejects) => {
            const modal = Modal.confirm();
            let content = status === 'lock' ? `锁定后将无法进行编辑作废等操作，确定要锁定选中${info}吗?` : `作废后将放入回收站，确认要解锁所选${info}吗？`;
            modal.update({
                title: status === 'lock' ? '锁定' : '解锁',
                content: content,
                onCancel: () => {
                    modal.destroy();
                },
                onOk: () => {
                    this.un_lockUrlData = {
                        [id]: this.selectedData.reduce((a, b) => {
                            return a ? `${a},${b[id]}` : `${b[id]}`;
                        }, ''),
                        status: status === 'lock' ? '0' : '1'
                    }

                    mAxios.ajax({
                        url: this.un_lockUrl,
                        data: this.un_lockUrlData
                    }).then(data => {
                        message.success(`${info}${status === 'lock' ? '锁定' : '解锁'}成功`);
                        modal.destroy();

                        reslove(data);
                        // 初始化数据
                        this.init();
                    });
                }
            });
           
        });
    }

    /**
     * 返回-取消
     */
    cancle = () => {
        // this.props.history.go(-1);
        window.history.go(-1);
    }

    /**
     * 显示loading加载
     */
    showLoading = () => {
        const _this = this;
        this.setState({
            loading: true
        });
        setTimeout(() => {
            if(_this.state && _this.state.loading ) {
                _this.hideLoading()
            }
        }, 3000);
    }
    /**
     * 隐藏loading 加载
     */
    hideLoading = () => {
        this.setState({
            loading: false
        });
    }

    /**
     *  关闭详情侧滑
     */
    closeMSlideVisible = () => {
       this.setState({
            mSlideVisible: false
       }); 
    }
}

export default Base;