import { combineReducers } from 'redux';

// 异步请求状态
function req(state = { loading: 0 }, action) {
  switch (action.type) {
  case Actions.REQ_BEGIN:
    return { loading: 3 };
  case Actions.REQ_GOING:
    return { loading: 1 + state.loading % 3 };
  case Actions.REQ_ERROR:
    return { loading: 0, message: action.error.toString() };
  case Actions.REQ_OK:
    return { loading: 0 };
  default:
    return state;
  }
}

// 导航栏
function navis(state = [], action) {
  switch (action.type) {
  case Actions.LOAD_END:
    return action.navis;
  default:
    return state;
  }
}

const storeStateReducer = combineReducers({
  req, navis,
  bom: require('./bom/bomReducers')
});

export default storeStateReducer;
