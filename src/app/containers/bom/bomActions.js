import _ from 'lodash';
import Promise from 'bluebird';

/*
 * action types (async)
 */

export const ITEM_SEARCH_REQ = 'ITEM_SEARCH_REQ';
export const ITEM_SEARCH_END = 'ITEM_SEARCH_END';

/*
 * action types
 */

export const PROC_SELECT = 'PROC_SELECT';
export const PROC_UPDATE = 'PROC_UPDATE';
export const ITEM_SELECT = 'ITEM_SELECT';
export const ITEM_UPDATE = 'ITEM_UPDATE';
export const ITEM_ADD = 'ITEM_ADD'
export const ITEM_ADD_OK = 'ITEM_ADD_OK';
export const ITEM_ADD_CANCEL = 'ITEM_ADD_CANCEL';
export const ITEM_DELETE = 'ITEM_DELETE';
export const ITEM_QTY_UPDATE = 'ITEM_QTY_UPDATE';
export const ITEM_ALT_TOGGLE = 'ITEM_ALT_TOGGLE';
export const DEVICE_TIME_UPDATE = 'DEVICE_TIME_UPDATE';
export const DEVICE_SPEC_TOGGLE = 'DEVICE_SPEC_TOGGLE';
export const WORKER_TIME_UPDATE = 'WORKER_TIME_UPDATE';
export const WORKER_SPEC_TOGGLE = 'WORKER_SPEC_TOGGLE';


/*
 * action creators
 */

export function procUpdate(idx, proc) {
  return { type: PROC_UPDATE, idx, proc };
}
export function procSelect(idx, proc) {
  return { type: PROC_SELECT, idx, proc };
}

export function itemUpdate(item) {
  return { type: ITEM_UPDATE, item };
}
export function itemSelect(idx) {
  return { type: ITEM_SELECT, idx };
}
export function itemAdd() {
  return { type: ITEM_ADD };
}
export function itemAddOk(item) {
  return { type: ITEM_ADD_OK, item };
}
export function itemAddCancel() {
  return { type: ITEM_ADD_CANCEL };
}
export function itemDelete(idx) {
  return { type: ITEM_DELETE, idx };
}
export function itemQtyUpdate(idx, qty) {
  return { type: ITEM_QTY_UPDATE, idx, qty };
}

export function itemAltToggle(idx) {
  return { type: ITEM_ALT_TOGGLE, idx };
}

export function deviceTimeUpdate(qty) {
  return { type: DEVICE_TIME_UPDATE, qty };
}
export function deviceSpecToggle(idx) {
  return { type: DEVICE_SPEC_TOGGLE, idx };
}

export function workerTimeUpdate(qty) {
  return { type: WORKER_TIME_UPDATE, qty };
}
export function workerSpecToggle(idx) {
  return { type: WORKER_SPEC_TOGGLE, idx };
}
