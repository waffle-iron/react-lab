import "./bom.less";

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
      dispatch, ui,
      proci, procs, itemi, items,
      altItems, specs
    } = this.props;
    return (
      <div className="bom">
        <CraftBar craft="电子组装" proci={proci} procs={procs}
          onProcSelect={idx => console.log('CraftBar.onProcSelect', idx)} />
        <Grid>
          <Cell size="2/3">
            <BomItemList itemi={itemi} items={items}
              onAddNew={() => console.log('BomItemList.onAddNew')}
              onSelect={idx => console.log('BomItemList.onSelect', idx)}
              onDelete={idx => console.log('BomItemList.onDelete', idx)}
              onQtyUpdate={(idx, qty) => console.log('BomItemList.onQtyUpdate', idx, qty)} />
            <BomAltItemList items={altItems}
              onToggle={idx => console.log('BomAltItemList.onToggle', idx)} />
          </Cell>
          <Cell size="1/3">
            <div>
              <SpecList size="1/2" spec={specs.device} timeLabel="设备占用" timeUnit="H"
                onTimeUpdate={qty => console.log('SpecList.onTimeUpdate', 'device', qty)}
                onSpecToggle={idx => console.log('SpecList.onSpecToggle', 'device', idx)} />
              <SpecList size="1/2" spec={specs.worker} timeLabel="需要人工" timeUnit="H"
                onTimeUpdate={qty => console.log('SpecList.onTimeUpdate', 'worker', qty)}
                onSpecToggle={idx => console.log('SpecList.onSpecToggle', 'worker', idx)} />
            </div>
            <div className="more" />
          </Cell>
        </Grid>
      </div>
    );
  }
}
Bom.propTypes = {
  ui: PropTypes.object.isRequired,
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
