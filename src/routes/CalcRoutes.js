// secondary routes for calculation components

import React from "react";
import { Route, Switch } from "react-router-dom";
import ConduitFill from "../components/ConduitFill/ConduitFill";
import PIVCalculator from "../components/PIV/PIVCalculator";
import VoltageDrop from "../components/VoltageDrop/VoltageDrop";

function CalcRoutes(props) {
  return (
    <Switch>
      <Route
        path="/calculations/piv"
        component={() => <PIVCalculator setShowTiles={props.setShowTiles} />}
      />
      <Route
        path="/calculations/voltagedrop"
        component={() => <VoltageDrop setShowTiles={props.setShowTiles} />}
      />
      <Route
        path="/calculations/conduitfill"
        component={() => <ConduitFill setShowTiles={props.setShowTiles} />}
      />
    </Switch>
  );
}

export default CalcRoutes;
