import assign from 'object-assign';
import React, { PropTypes } from 'react';
import Component from 'PureComponent';

import { Grid, Cell } from 'theme/pure/Pure';
import CraftBar from './comps/CraftBar';
import SpecList from './comps/SpecList';
import BomItemList from './comps/BomItemList';
import BomAltItemList from './comps/BomAltItemList';

import * as Actions from './bomActions';

const NO_SPEC = { time: 0, specs: [] };

const specsSelect = (mst, bomSpecs, specType) => {
  if (!mst) return NO_SPEC;
  return {
    time: bomSpecs[specType].time,
    specs: mst.specs[specType]
  }
};

class Bom extends Component {
  render() {
    const {
      dispatch, mst, ui, proci, procs,
      itemi, items, altItems, specs
    } = this.props;
    const mstDeviceSpec = specsSelect(mst, specs, 'device');
    const mstWorkerSpec = specsSelect(mst, specs, 'worker');
    const _dispatch = (actionName, ...args) => {
      dispatch ? dispatch(Actions[actionName](...args))
        : console.log(actionName, ...args);
    };
    return (
      <div className="bom">
        <CraftBar craft="电子组装" proci={proci} procs={procs} onProcSelect={idx => {
          if (idx !== proci) {
            (itemi !== -1) && assign(items[itemi], { altItems });
            (proci !== -1) && assign(procs[proci], { items, specs });
            _dispatch('procSelect', idx, procs[idx]);
          }
        }} />
        <Grid>
          <Cell size="2/3">
            <BomItemList itemi={itemi} items={items}
              onAddNew={() => _dispatch('itemAdd')}
              onSelect={idx => {
                (itemi !== -1) && assign(items[itemi], { altItems });
                _dispatch('itemSelect', idx, items[idx]);
              }}
              onDelete={idx => _dispatch('itemDelete', idx)}
              onQtyUpdate={(idx, qty) => _dispatch('itemQtyUpdate', idx, qty)} />
            <BomAltItemList items={altItems}
              onToggle={idx => _dispatch('itemAltToggle', idx)} />
          </Cell>
          <Cell size="1/3">
            <div>
              <Cell size="1/2">
                <SpecList spec={mstDeviceSpec} timeLabel="设备占用" timeUnit="H"
                  onSpecAddNew={() => _dispatch('deviceSpecAdd')}
                  onSpecDelete={idx => _dispatch('deviceSpecDelete', idx)}
                  onTimeUpdate={qty => _dispatch('deviceTimeUpdate', qty)} />
              </Cell>
              <Cell size="1/2">
                <SpecList spec={mstWorkerSpec} timeLabel="需要人工" timeUnit="H"
                  onSpecAddNew={() => _dispatch('workerSpecAdd')}
                  onSpecDelete={idx => _dispatch('workerSpecDelete', idx)}
                  onTimeUpdate={qty => _dispatch('workerTimeUpdate', qty)} />
              </Cell>
            </div>
            <div className="more" />
          </Cell>
        </Grid>
      </div>
    );
  }
}
Bom.propTypes = {
  ui: PropTypes.shape({
    itemAdding: PropTypes.bool
  }),
  proci: CraftBar.propTypes.proci,
  procs: CraftBar.propTypes.procs,
  itemi: BomItemList.propTypes.itemi,
  items: BomItemList.propTypes.items,
  altItems: BomAltItemList.propTypes.items,
  specs: PropTypes.shape({
    device: SpecList.propTypes.spec,
    worker: SpecList.propTypes.spec
  })
};

export default Bom;
