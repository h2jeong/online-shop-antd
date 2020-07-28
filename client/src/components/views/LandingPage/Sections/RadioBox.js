import React, { useState } from "react";
import { Radio, Collapse } from "antd";

const { Panel } = Collapse;

function RadioBox(props) {
  const renderRadioBox = () => {};

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Price Ranage" key="1">
          {renderRadioBox()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default RadioBox;
