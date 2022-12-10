export const validationLogin = (values) => {
  let retError = "";
  console.log(values);
  if (values.username === "" || values.username === null) {
    retError = retError.concat("Enter Username  \n");
  }
  if (values.password === "" || values.password === null) {
    retError = retError.concat("Enter Password  \n");
    console.log("Hello");
  } else if (
    values.password != null &&
    (values.password.length > 15 || values.password.length < 8)
  ) {
    retError = retError.concat("Enter correct password  \n");
  }
  console.log(retError);

  return retError;
};
