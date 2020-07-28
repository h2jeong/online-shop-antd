import React, { useState } from "react";
import { Checkbox, Collapse } from "antd";

const { Panel } = Collapse;

function CheckBoxGroup(props) {
  const renderCheckboxLists = () => {};

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Continents Type" key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBoxGroup;
