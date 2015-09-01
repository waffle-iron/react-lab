import { createSelector } from 'reselect';
import bomStateSelector from '../bom/bomSelector';

const reqSelector = storeState => storeState.req;
const navSelector = storeState => storeState.nav;
const bomSelector = storeState => storeState.bom;

const appStateSelector = createSelector(
  [reqSelector, navSelector, bomSelector],
  (req, nav, bom) => {
    const state = { req, nav, bom: bomStateSelector(bom) };
    return state;
  }
);

export default appStateSelector;
