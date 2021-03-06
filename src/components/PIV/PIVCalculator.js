import React, { useEffect, useState } from "react";
import InputValueField from "../InputValueField";
import PIV from "../../helpers/PIV";
import SelectButton from "../SelectButton";
import { Form, Button, Jumbotron, Container } from "react-bootstrap";

const defaultErrors = {
  current: null,
  voltage: null,
  power: null,
  powerfactor: null,
};

function PIVCalculator(props) {
  const [state, setState] = useState({
    calctype: "power",
    current: undefined,
    voltage: undefined,
    power: undefined,
    powerfactor: "",
    phase: "three",
  });

  const [errors, setError] = useState(defaultErrors);

  useEffect(() => {
    return () => {
      props.setShowTiles(true);
    };
  }, []);

  const clearCalcParams = (evt) => {
    evt.preventDefault();
    setState((currVal) => ({ ...currVal, ["powerfactor"]: "" }));
    setState((currVal) => ({ ...currVal, ["current"]: "" }));
    setState((currVal) => ({ ...currVal, ["voltage"]: "" }));
    setState((currVal) => ({ ...currVal, ["power"]: "" }));
  };

  const setStateValues = (data) => {
    setState({
      ...state,
      [data.stateID]: data.value,
    });
  };

  const performCalculation = () => {
    if (PIV.dataValidation(setError, state, errors)) {
      PIV.selectCalculation(setStateValues, state);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    performCalculation();
  };

  const resultOutput = () => {
    let unit = "W";
    if (state.calctype === "power") {
      unit = "W";
    } else if (state.calctype === "voltage") {
      unit = "V";
    } else if (state.calctype === "current") {
      unit = "A";
    }
    return state[state.calctype] + " " + unit;
  };

  return (
    <div>
      <Jumbotron className="mx-auto" style={{ padding: "1rem 1rem" }} fluid>
        <Container style={{ textAlign: "center" }}>
          <h3 className="font-weight-bold">Power, Current, and Voltage Conversion</h3>
        </Container>
      </Jumbotron>
      <Container
        className="mx-auto"
        style={{width: "800px"}}
      >
        <Form
          className="border"
          style={{ padding: "5%", margin: "0 2%" }}
          onSubmit={handleSubmit}
        >
          <Form.Group>
            <Form.Label className="font-weight-bold">Convert to</Form.Label>
            <Form.Row
              style={{ display: "grid", gridTemplateColumns: "33% 33% 33%" }}
            >
              <SelectButton
                stateID="calctype"
                inputDescription="Power"
                value="power"
                callback={setStateValues}
                style={{ margin: "0 0.25rem 0 0" }}
                selected={state.calctype}
              />
              <SelectButton
                stateID="calctype"
                inputDescription="Current"
                value="current"
                callback={setStateValues}
                style={{ margin: "0 0.25rem 0 0" }}
                selected={state.calctype}
              />
              <SelectButton
                stateID="calctype"
                inputDescription="Voltage"
                value="voltage"
                callback={setStateValues}
                selected={state.calctype}
              />
            </Form.Row>
          </Form.Group>
          <Form.Group>
            <Form.Label className="font-weight-bold">Phase </Form.Label>
            <Form.Row
              style={{ display: "grid", gridTemplateColumns: "50% 50%" }}
            >
              <SelectButton
                stateID={"phase"}
                inputDescription={"Single"}
                value={"single"}
                callback={setStateValues}
                style={{ margin: "0 0.25rem 0 0" }}
                selected={state.phase}
              />
              <SelectButton
                stateID={"phase"}
                inputDescription={"Three"}
                value={"three"}
                callback={setStateValues}
                selected={state.phase}
              />
            </Form.Row>
          </Form.Group>
          <Form.Group>
            <InputValueField
              stateID="powerfactor"
              inputDescription="Power Factor "
              unit=""
              setStateValues={setStateValues}
              value={state.powerfactor}
              type={null}
              errorMessage={errors.powerfactor}
              placeholder="Enter Power Factor"
            />
          </Form.Group>
          {state.calctype !== "voltage" && (
            <Form.Group>
              <InputValueField
                type="number"
                stateID="voltage"
                inputDescription="Voltage (Volts)"
                unit=" V"
                value={state.voltage}
                setStateValues={setStateValues}
                errorMessage={errors["voltage"]}
                placeholder="Enter Voltage"
              ></InputValueField>
            </Form.Group>
          )}
          {state.calctype !== "current" && (
            <Form.Group>
              <InputValueField
                type="number"
                stateID="current"
                inputDescription="Current (Amperes)"
                unit=" A"
                value={state.current}
                setStateValues={setStateValues}
                errorMessage={errors["current"]}
                placeholder="Enter Current"
              ></InputValueField>
            </Form.Group>
          )}
          {state.calctype !== "power" && (
            <Form.Group>
              <InputValueField
                type="number"
                stateID="power"
                inputDescription="Power (Watts)"
                unit=" W"
                value={state.power}
                setStateValues={setStateValues}
                errorMessage={errors["power"]}
                placeholder="Enter Power"
              ></InputValueField>
            </Form.Group>
          )}
          <Form.Group>
            <Button
              className="btn-dark"
              type="submit"
              style={{ margin: "0 0.25rem 0 0" }}
            >
              Submit
            </Button>
            <Button
              className="btn-dark"
              type="clear"
              onClick={clearCalcParams}
              style={{ margin: "0 1rem 0 0" }}
            >
              Reset
            </Button>
            <Form.Label className="font-weight-bold h5">
              {"Result: "}
              {state[state.calctype] != undefined &&
                state[state.calctype] != "" &&
                resultOutput()}
            </Form.Label>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
}

export default PIVCalculator;
