import Promise from 'bluebird';
import { asyncActionCreator } from 'async';
import { load as loadBom } from '../bom/bomActions';

/*
 * action types (async)
 */

export const LOAD_END = 'LOAD_END';
export const SAVE_END = 'SAVE_END';

/*
 * action creators
 */

const _nav = [
  {url: '/#/', txt: 'Home'},
  {url: '/#/prod', txt: 'Products'},
  {url: '/#/prod/mt4230t', txt: 'MT4230T'},
  {url: '/#/prod/mt4230t/craft', txt: '电子组装'}
];
function loadNav() {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve(_nav);
    }, 1000));
}
export function load() {
  return asyncActionCreator(
    result => {
      return { type: LOAD_END, result };
    },
    state => Promise.join(
      loadNav(), loadBom(),
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
