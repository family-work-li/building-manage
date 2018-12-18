import { sessionStorage } from '../../util';

let defaultState = {
    tabPanes: [
        {
            title: '首页',
            path: '/admin',
            closable: false
        }
    ],
    activeKey: '0'
}

let _tabPanesReducer = sessionStorage.getItem('tabPanesReducer');
_tabPanesReducer && (defaultState = _tabPanesReducer);

const TabPanesReducer = (state = defaultState, action) => {
    let newState = JSON.parse(JSON.stringify(state));
    if(action.type === 'add-open-tabs') {
        // 新增或者打开 某一个tabs
        let index = -1;
        for(let i=0, len=newState.tabPanes.length; i<len; i++) {
            if(newState.tabPanes[i].title === action.tabPane.title) {
                index = i;
                break;
            }
        }
        
        if(index >= 0) {
            newState.activeKey = index;
        } else {
            newState.tabPanes.push(action.tabPane);
            newState.activeKey = Number(newState.tabPanes.length)-1;
        }
    } else if(action.type === 'delete-tabs') {
        // 删除某一个tabs
        newState.tabPanes.splice(action.index, 1);

        // if(newState.activeKey > 0 && newState.activeKey >= action.index) {
            // newState.activeKey = newState.activeKey - 1;
        // }
        newState.activeKey = action._targetKey;
    } else if(action.type === 'update-tabs-active-key'){
        // 更新某一个tabs 的 activeKey
        newState.activeKey = action.activeKey;
    }


    sessionStorage.setItem('tabPanesReducer', newState);

    return newState;
}

export default TabPanesReducer;