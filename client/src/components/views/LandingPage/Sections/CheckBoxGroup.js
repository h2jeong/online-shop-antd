import React, { useState } from "react";
import { Checkbox, Collapse } from "antd";

const { Panel } = Collapse;

function CheckBoxGroup(props) {
  const [CheckedList, setCheckedList] = useState([]);
  const onToggleCheck = value => {
    const list = [...CheckedList];
    const idx = list.indexOf(value);
    if (idx === -1) {
      list.push(value);
    } else {
      list.splice(idx, 1);
    }
    setCheckedList(list);
    props.handleFilters(list);
  };

  const renderCheckboxLists = () =>
    props.list.map((value, idx) => (
      <Checkbox
        key={idx}
        onChange={() => onToggleCheck(value._id)}
        type="checkbox"
        checked={CheckedList.indexOf(value._id) === -1 ? false : true}
      >
        {value.name}
      </Checkbox>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Continents" key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBoxGroup;
