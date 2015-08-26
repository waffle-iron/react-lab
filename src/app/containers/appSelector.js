import { createSelector } from 'reselect';

const reqSelector = storeState => storeState.req;
const navisSelector = storeState => storeState.navis;
const bomSelector = storeState => storeState.bom;

const bomStateSelector = require('./bom/bomSelector');

const appStateSelector = createSelector(
  [reqSelector, navisSelector, bomSelector],
  (req, navis, bom) => {
    return { req, navis, bom: bomStateSelector(bom) };
  }
);

export default appStateSelector;
