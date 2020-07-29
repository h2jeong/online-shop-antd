import React, { useState } from "react";
import { Checkbox, Collapse, Row, Col } from "antd";

const { Panel } = Collapse;

function CheckBoxGroup(props) {
  const [Checked, setChecked] = useState([]);

  const onToggleCheck = itemId => {
    let index = Checked.indexOf(itemId);
    let checkedList = Checked.slice();

    if (index < 0) {
      setChecked([...checkedList, itemId]);
    } else {
      checkedList.splice(index, 1);
      setChecked(checkedList);
    }
  };

  const renderCheckboxLists = () => {
    return props.list.map((item, idx) => (
      <Checkbox key={idx} onClick={() => onToggleCheck(item._id)}>
        {item.name}
      </Checkbox>
    ));
  };

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
