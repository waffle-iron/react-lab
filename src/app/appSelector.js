import { createSelector } from 'reselect';
import bomStateSelector from '../bom/bomSelector';

const appStateSelector = storeState => {
  return {
    req: storeState.req,
    nav: storeState.nav,
    mst: storeState.mst,
    bom: bomStateSelector(storeState.bom)
  };
};

export default appStateSelector;
