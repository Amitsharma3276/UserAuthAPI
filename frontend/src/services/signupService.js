const signupuser = (values) => {
  //console.log(values);

  try {
    const url = "http://localhost:9090/user/registration";

    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
        userInfo: {
          name: values.name,
          vaccinated: values.vaccinated,
          emergency_number: values.emergency_number,
          skills: values.skills,
          current_address: {
            line_one: values.p_line_one,
            line_two: values.p_line_two,
            city: values.p_city,
            pincode: values.p_pincode,
            state: values.p_state,
          },
          permanent_address: {
            line_one: values.p_line_one,
            line_two: values.p_line_two,
            city: values.p_city,
            pincode: values.p_pincode,
            state: values.p_state,
          },
        },
      }),
    });

    //response.status gives the response code
    //response.statusText gives the message for response status
    // return response;
  } catch (err) {
    throw err;
  }
};

export const signupService = async (userInfo) => {
  const response = await signupuser(userInfo);

  return await response;
};

// signupuser(userInfo)
// .then((response) => {
//   console.log(response.status);
//   status = response.status;

//   return response.text();
// })
// .then((data) => {
//   console.log(data);

//   if (status === 201) {
//     onUserChange({
//       ...userInfo,
//       success: true,
//       username: "",
//       password: "",
//       name: "",
//       vaccinated: "",
//       emergency_number: "",
//       skills: "",
//       c_line_one: "",
//       c_line_two: "",
//       c_city: "",
//       c_pincode: "",
//       c_state: "",
//       p_line_one: "",
//       p_line_two: "",
//       p_city: "",
//       p_pincode: "",
//       p_state: "",
//       error: data,
//     });
//   } else {
//     onUserChange({ ...userInfo, error: data, success: false });
//   }
//   });
