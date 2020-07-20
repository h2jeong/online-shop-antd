import React, { useState } from "react";
import { Radio, Collapse } from "antd";

const { Panel } = Collapse;

function RadioBox(props) {
  const [Checked, setChecked] = useState(0);

  const onHandleChange = e => {
    setChecked(e.target.value);
    props.handleFilters(e.target.value);
  };

  const renderRadioBox = () => {
    return (
      <Radio.Group onChange={onHandleChange} value={Checked}>
        {props.list.map((item, idx) => (
          <Radio key={idx} value={item._id}>
            {item.name}
          </Radio>
        ))}
      </Radio.Group>
    );
  };

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
