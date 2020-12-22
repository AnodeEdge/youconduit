import React, { useEffect } from "react";
import InputValueField from "./InputValueField";
import PIV from "../helpers/PIV";
import SelectButton from "./SelectButton";

function PIVCalculator(props) {
  useEffect(() => {
    return () => {
      props.setShowTiles(true);
    };
  }, []);

  const [state, setState] = React.useState({
    calctype: "power",
    current: 100,
    voltage: 480,
    power: 0,
    powerfactor: 1,
    phase: "three",
  });

  const fieldInputDefaults = [
    {
      stateID: "voltage",
      inputDescription: "Voltage: ",
      unit: " V",
      defaultValue: state.voltage,
    },
    {
      stateID: "current",
      inputDescription: "Current: ",
      unit: " A",
      defaultValue: state.current,
    },
    {
      stateID: "power",
      inputDescription: "Power: ",
      unit: " W",
      defaultValue: state.power,
    },
  ];

  const setStateValues = (data) => {
    setState({
      ...state,
      [data.stateID]: data.value,
    });
  };

  const checkInputs = () => {
    if (state.powerfactor <= 0 || state.powerfactor > 1) {
      alert("Power Factor must be between 0 and 1");
      return;
    }
  };

  const selectCalculation = () => {
    if (state.phase === "three") {
      if (state.calctype === "voltage") {
        setStateValues(PIV.voltage3Phase(state));
      } else if (state.calctype === "current") {
        setStateValues(PIV.current3Phase(state));
      } else {
        setStateValues(PIV.power3Phase(state));
      }
    } else {
      if (state.calctype === "voltage") {
        setStateValues(PIV.voltage1Phase(state));
      } else if (state.calctype === "current") {
        setStateValues(PIV.current1Phase(state));
      } else {
        setStateValues(PIV.power1Phase(state));
      }
    }
  };

  const performCalculation = () => {
    checkInputs();
    selectCalculation();
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    performCalculation();
  };

  const resultOutput = () => {
    let unit = "W";
    if (state.calctype === "power") {
      unit = "W";
    }
    if (state.calctype === "voltage") {
      unit = "V";
    }
    if (state.calctype === "current") {
      unit = "A";
    }
    return state[state.calctype] + " " + unit;
  };

  const componentStyle = {
    margin: "25px 0",
  };

  const formStyle = {
    margin: "0 30% auto",
    padding: "25px",
    backgroundColor: "#c3e2e6",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
  };

  const resultStyle = {
    margin: "1% 30% auto",
    padding: "25px",
    backgroundColor: "#c3e2e6",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "row",
  };

  const buttonStyle = {};

  const headerStyle = {
    fontSize: "large",
  };
  return (
    <div style={componentStyle}>
      <div style={{ textAlign: "center", margin: "0 0 1% 0" }}>
        <label style={{ fontSize: "x-large" }}>
          Power / Current / Voltage Calculator
        </label>
      </div>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            margin: "0 0 1% 0",
          }}
        >
          <SelectButton
            stateID="calctype"
            inputDescription="Power"
            value="power"
            // default={data.default}
            callback={setStateValues}
            style={buttonStyle}
          />
          <SelectButton
            stateID="calctype"
            inputDescription="Current"
            value="current"
            // default={data.default}
            callback={setStateValues}
            style={buttonStyle}
          />
          <SelectButton
            stateID="calctype"
            inputDescription="Voltage"
            value="voltage"
            // default={data.default}
            callback={setStateValues}
            style={buttonStyle}
          />
        </div>
        <label style={headerStyle}>Phase: </label>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            margin: "0 0 1% 0",
          }}
        >
          <SelectButton
            stateID={"phase"}
            inputDescription={"Single"}
            value={"single"}
            callback={setStateValues}
            style={buttonStyle}
          />
          <SelectButton
            stateID={"phase"}
            inputDescription={"Three"}
            value={"three"}
            callback={setStateValues}
            style={buttonStyle}
          />
        </div>
        <div style={{ margin: "0 0 2% 0" }}>
          <InputValueField
            stateID="powerfactor"
            inputDescription="Power Factor: "
            unit=""
            defaultValue={state.powerfactor}
            callback={setStateValues}
            headerStyle={headerStyle}
            componentStyle={{ width: "50%" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            margin: "0 0 2% 0",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {fieldInputDefaults.map((data) => {
            if (state.calctype !== data.stateID) {
              return (
                <>
                  <InputValueField
                    stateID={data.stateID}
                    inputDescription={data.inputDescription}
                    unit={data.unit}
                    defaultValue={data.defaultValue}
                    callback={setStateValues}
                    headerStyle={headerStyle}
                    componentStyle={{ width: "50%" }}
                  ></InputValueField>
                </>
              );
            } else {
              return null;
            }
          })}
        </div>
        <button>Submit</button>
      </form>
      <div style={resultStyle}>
        <label style={headerStyle}>Result: {resultOutput()}</label>
      </div>
    </div>
  );
}

export default PIVCalculator;
