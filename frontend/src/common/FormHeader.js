import React from "react";

const FormHeader = (props) => {
  return (
    <div>
      <center>
        {props.title}
        {props.message}
      </center>
      <hr />
    </div>
  );
};
export default FormHeader;
