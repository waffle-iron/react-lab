import _ from 'lodash';
import { combineReducers } from 'redux';
import { LOAD_END } from '../appActions';
import * as Actions from './bomActions';

// 画面显示控制
function ui(state = {}, action) {
  switch (action.type) {
  case Actions.ITEM_ADD:
    return { itemAdding: true };
  case Actions.SPEC_ADD:
    return { specAdding: true, specType: action.specType };
  case Actions.ITEM_ADD_OK:
  case Actions.SPEC_ADD_OK:
  case Actions.ADD_CANCEL:
    return {};
  default:
    return state;
  }
}

// 当前工序
function proci(state = -1, action) {
  switch (action.type) {
  case Actions.PROC_SELECT:
    return action.idx;
  default:
    return state;
  }
}
// 工序列表
function procs(state = [], action) {
  switch (action.type) {
  case LOAD_END:
    return action.result.bom.procs;
  case Actions.PROC_UPDATE:
    return [
      ...state.slice(0, action.idx),
      action.proc,
      ...state.slice(action.idx + 1)
    ];
  default:
    return state;
  }
}

// 当前物料
function itemi(state = -1, action) {
  switch (action.type) {
  case Actions.PROC_SELECT:
    return action.idx;
  default:
    return state;
  }
}
// 物料清单
function items(state = [], action) {
  switch (action.type) {
  case LOAD_END:
    return action.result.bom.items;
  case Actions.PROC_SELECT:
    return action.proc.items;
  case Actions.ITEM_UPDATE:
    return [
      ...state.slice(0, action.idx),
      action.item,
      ...state.slice(action.idx + 1)
    ];
  case Actions.ITEM_ADD_OK:
    return [...state, action.item];
  case Actions.ITEM_DELETE:
    return [
      ...state.slice(0, action.idx),
      ...state.slice(action.idx + 1)
    ];
  case Actions.ITEM_QTY_UPDATE:
    {
      const item = state[action.idx];
      return [
        ...state.slice(0, action.idx),
        _.assign({}, item, {qty: action.qty}),
        ...state.slice(action.idx + 1)
      ];
    }
  default:
    return state;
  }
}

// 当前选中物料的可替换品清单
function altItems(state = [], action) {
  switch (action.type) {
  case Actions.ITEM_SELECT:
    return action.item.alts;
  case Actions.ITEM_ALT_TOGGLE:
    const altItem = state[action.idx];
    return [
      ...state.slice(0, action.idx),
      _.assign({}, altItem, {selected: !altItem.selected}),
      ...state.slice(action.idx + 1)
    ];
  default:
    return state;
  }
}

// 设备占用工时
function deviceTime(state = 0, action) {
  switch (action.type) {
  case Actions.PROC_SELECT:
    return action.proc.time.device;
  case Actions.DEVICE_TIME_UPDATE:
    return action.qty;
  default:
    return state;
  }
}
// 设备类型要求
function deviceSpecs(state = [], action) {
  switch (action.type) {
  case Actions.PROC_SELECT:
    return action.proc.spec.device;
  case Actions.DEVICE_SPEC_ADD_OK:
    return [...state, action.spec];
  case Actions.DEVICE_SPEC_DELETE:
    return [
      ...state.slice(0, action.idx),
      ...state.slice(action.idx + 1)
    ];
  default:
    return state;
  }
}

// 工人用时要求
function workerTime(state = 0, action) {
  switch (action.type) {
  case Actions.PROC_SELECT:
    return action.proc.time.device;
  case Actions.WORKER_TIME_UPDATE:
    return action.qty;
  default:
    return state;
  }
}
// 工人类型要求
function workerSpecs(state = [], action) {
  switch (action.type) {
  case Actions.PROC_SELECT:
    return action.proc.spec.worker;
  case Actions.WORKER_SPEC_ADD_OK:
    return [...state, action.spec];
  case Actions.WORKER_SPEC_DELETE:
    return [
      ...state.slice(0, action.idx),
      ...state.slice(action.idx + 1)
    ];
  default:
    return state;
  }
}

// 检索到的物料清单
function itemsFound(state = [], action) {
  switch (action.type) {
  case Actions.ITEM_SEARCH_END:
    return action.items;
  default:
    return state;
  }
}

const storeStateReducer = combineReducers({
  ui, itemsFound,
  proci, procs, itemi, items, altItems,
  deviceTime, deviceSpecs,
  workerTime, workerSpecs,
});

export default storeStateReducer;
