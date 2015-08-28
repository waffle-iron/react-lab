import _ from "lodash";
import React, { PropTypes } from 'react';
import Component from 'PureComponent';

import { Grid, Cell } from 'theme/pure/Pure';
import CraftBar from '../../components/bom/CraftBar';
import SpecList from '../../components/bom/SpecList';
import BomItemList from '../../components/bom/BomItemList';
import BomAltItemList from '../../components/bom/BomAltItemList';

import Actions from './bomActions';

class Bom extends Component {
  render() {
    const {
      dispatch, ui, proci, procs,
      itemi, items, altItems, specs
    } = this.props;
    return (
      <div className="bom">
        <CraftBar craft="电子组装" proci={proci} procs={procs} onProcSelect={idx => {
          if (idx !== proci) {
            (itemi !== -1) && _.assign(items[itemi], { altItems });
            (proci !== -1) && _.assign(procs[proci], { items, specs });
            dispatch(Actions.procSelect(idx, procs[idx]));
          }
        }} />
        <Grid>
          <Cell size="2/3">
            <BomItemList itemi={itemi} items={items}
              onAddNew={idx => dispatch(Actions.itemAdd())}
              onSelect={idx => {
                (itemi !== -1) && _.assign(items[itemi], { altItems });
                dispatch(Actions.itemSelect(idx, items[idx]));
              }}
              onDelete={idx => dispatch(Actions.itemDelete(idx))}
              onQtyUpdate={(idx, qty) => dispatch(Actions.itemQtyUpdate(idx, qty))} />
            <BomAltItemList items={altItems}
              onToggle={idx => dispatch(Actions.itemAltToggle(idx))} />
          </Cell>
          <Cell size="1/3">
            <div>
              <Cell size="1/2">
                <SpecList spec={specs.device} timeLabel="设备占用" timeUnit="H"
                  onTimeUpdate={qty => dispatch(Actions.deviceTimeUpdate(qty))}
                  onSpecToggle={idx => dispatch(Actions.deviceSpecToggle(idx))} />
              </Cell>
              <Cell size="1/2">
                <SpecList spec={specs.worker} timeLabel="需要人工" timeUnit="H"
                  onTimeUpdate={qty => dispatch(Actions.workerTimeUpdate(qty))}
                  onSpecToggle={idx => dispatch(Actions.workerSpecToggle(idx))} />
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
