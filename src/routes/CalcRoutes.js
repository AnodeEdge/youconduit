// secondary routes for calculation components

import React from 'react';
import { Route, Switch } from 'react-router-dom'
import PIVCalculator from '../components/PIVCalculator';
import VoltageDrop from '../components/VoltageDrop';


function CalcRoute(props) {
  return(
    <Switch>
      <Route path='/calculations/piv' component={() => <PIVCalculator setShowTiles={props.setShowTiles} />} />
      <Route path='/calculations/voltagedrop' component={() => <VoltageDrop setShowTiles={props.setShowTiles} />} />
    </Switch>   
  )
}

export default CalcRoute;