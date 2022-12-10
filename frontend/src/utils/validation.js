export const validate = (values) => {
  const digits_only = (string) =>
    [...string].every((ch) => "0123456789".includes(ch));

  const alphabet = (string) =>
    [...string].every((ch) =>
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(ch)
    );

  let retError = "";

  //NAME VALIDATIONS
  if (values.name === null || values.name.length === 0) {
    retError = retError.concat("Name is required \n");
  }

  if (!alphabet(values.name)) {
    retError = retError.concat("Invalid Name \n");
  }

  //PASSWORD VALIDATIONS
  if (values.password === "" || values.password === null) {
  } else if (
    values.password != null &&
    (values.password.length > 15 || values.password.length < 8)
  ) {
    retError = retError.concat("Weak password  \n");
  }

  //PERMANENT ADDRESS VALIDATION
  if (values.p_line_one === null || values.p_line_one.length === 0) {
    retError = retError.concat("Permanent Address Line 1 is required \n");
  }

  if (values.p_city === null || values.p_city.length === 0) {
    retError = retError.concat("Permanent Address City is required \n");
  }

  if (values.p_state === null || values.p_state.length === 0) {
    retError = retError.concat("Permanent Address State is required \n");
  }

  if (
    values.p_pincode === null ||
    values.p_pincode.length !== 6 ||
    (values.p_pincode.length != null && !digits_only(values.p_pincode))
  ) {
    retError = retError.concat(
      "Enter Valid 6 digit pincode for permanent address \n"
    );
  }

  //CURRENT ADDRESS VALIDATION(IF ENTERED)
  if (values.c_line_one !== null && values.c_line_one.length !== 0) {
    if (values.c_city === null || values.c_city.length === 0) {
      retError = retError.concat("Current Address City is required \n");
    }
    if (values.c_state === null || values.c_state.length === 0) {
      retError = retError.concat("Current Address State is required \n");
    }
    if (
      values.c_pincode === null ||
      values.c_pincode.length !== 6 ||
      (values.c_pincode.length !== 0 && !digits_only(values.c_pincode))
    ) {
      retError = retError.concat(
        "Enter Valid 6 digit pincode for current address \n"
      );
    }
  }

  //EMERGENCY NUMBER VALIDATION
  if (
    values.emergency_number === null ||
    values.emergency_number.length !== 10 ||
    (values.emergency_number != null && !digits_only(values.emergency_number))
  ) {
    retError = retError.concat("Enter valid 10 digit contact number \n");
  }

  return retError;
};

// const alphaNumeric = (string) =>
// [...string].every((ch) =>
//   "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".includes(
//     ch
//   )
// );
