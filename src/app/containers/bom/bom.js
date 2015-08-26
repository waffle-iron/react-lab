import "./bom.less";

import _ from "lodash";
import React, { PropTypes } from 'react';
import Component from 'PureComponent';

import { Grid, Cell } from 'pure/Pure';
import CraftBar from '../components/bom/CraftBar';
import SpecList from '../components/bom/SpecList';
import BomItemList from '../components/bom/BomItemList';
import BomAltItemList from '../components/bom/BomAltItemList';

import Actions from './bomActions';

class Bom extends PureComponent {
  render() {
    const {
      dispatch, frontEnd, backEnd,
      proci, procs, itemi, items,
      altItems, specs
    } = this.props;
    return (
      <div className="bom">
        <CraftBar procs={procs} onProcSelect={idx => {
          if (idx !== proci) {
            (itemi !== -1) && _.assign(items[itemi], { altItems });
            (proci !== -1) && _.assign(procs[proci], { items, specs });
            dispatch(Actions.procSelect(idx, procs[idx]));
          }
        }} />
        <Grid>
          <Cell size="2/3">
            <BomItemList items={items}
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
              <SpecList size="1/2" spec={specs.device} timeLabel="设备占用" timeUnit="H"
                onTimeUpdate={(idx, qty) => dispatch(Actions.deviceTimeUpdate(idx, qty))}
                onSpecToggle={idx => dispatch(Actions.deviceSpecToggle(idx))} />
              <SpecList size="1/2" spec={specs.worker} timeLabel="需要人工" timeUnit="H"
                onTimeUpdate={(idx, qty) => dispatch(Actions.workerTimeUpdate(idx, qty))}
                onSpecToggle={idx => dispatch(Actions.workerSpecToggle(idx))} />
            </div>
            <div className="more" />
          </Cell>
        </Grid>
      </div>
    );
  }
}

export default Bom;
