import { useState } from "react";
import Input from "./Input";

const Address = (props) => {
  const [values, setValues] = useState({
    line_one: props.line_one,
    line_two: props.line_two,
    city: props.city,
    pincode: props.pincode,
    state: props.state,
  });

  return (
    <div>
      <Input
        label="Address Line1"
        onChange={props.handleChange(props.kind + "_line_one")}
        type="text"
        className="form-control"
        placeholder="Enter House No., Road No."
        values={values.line_one}
        isRequired={props.isRequired}
      />

      <Input
        label="Address Line2"
        onChange={props.handleChange(props.kind + "_line_two")}
        type="text"
        className="form-control"
        placeholder="Enter Area, Landmark"
        values={values.line_two}
        isRequired={props.isRequired}
      />
      <Input
        label="City"
        onChange={props.handleChange(props.kind + "_city")}
        type="text"
        className="form-control"
        placeholder="Enter City"
        values={values.city}
        isRequired={props.isRequired}
      />
      <Input
        label="State"
        onChange={props.handleChange(props.kind + "_state")}
        type="text"
        className="form-control"
        placeholder="Enter State"
        values={values.state}
        isRequired={props.isRequired}
      />
      <Input
        label="Pincode"
        onChange={props.handleChange(props.kind + "_pincode")}
        type="text"
        className="form-control"
        placeholder="Enter your Pincode"
        values={values.pincode}
        isRequired={props.isRequired}
      />
    </div>
  );
};

export default Address;
