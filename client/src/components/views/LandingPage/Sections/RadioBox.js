import React, { useState } from "react";
import { Radio, Collapse } from "antd";

const { Panel } = Collapse;

function RadioBox(props) {
  const [Checked, setChecked] = useState(-1);

  const onChange = e => {
    setChecked(e.target.value);
    let range = props.list.find(item => item._id === e.target.value);
    // console.log(range.array);
    props.handleFilters(range.array);
  };

  const renderRadioBox = () => {
    return (
      <Radio.Group onChange={onChange} value={Checked}>
        {props.list.map(item => (
          <Radio key={item._id} value={item._id}>
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
