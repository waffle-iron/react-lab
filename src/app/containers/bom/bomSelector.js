import { createSelector } from 'reselect';

const appStateSelector = storeState => {
  return {
    ui: storeState.ui,
    navis: storeState.navis,
    proci: storeState.proci, procs: storeState.procs,
    itemi: storeState.itemi, items: storeState.items,
    altItems: storeState.altItems,
    specs: {
      worker: { time: storeState.workerTime, specs: storeState.workerSpecs },
      device: { time: storeState.deviceTime, specs: storeState.deviceSpecs },
    },
  };
}

export default appStateSelector;
