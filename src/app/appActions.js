import Promise from 'bluebird';
import { asyncActionCreator } from 'async';
import API from '../api';

/*
 * action types (async)
 */

export const LOAD_END = 'LOAD_END';
export const SAVE_END = 'SAVE_END';

/*
 * action creators
 */

export function load() {
  return asyncActionCreator(
    result => {
      return { type: LOAD_END, result };
    },
    state => Promise.join(
      API.loadNav(), API.loadBom(),
      (nav, bom) => {
        return { nav, bom };
      })
  );
}

function saveState(appState) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      // TODO persist appState
      resolve();
    }, 1000));
}
export function save() {
  return asyncActionCreator(
    () => {
      return { type: SAVE_END };
    },
    saveState
  );
}
