export const homeService = async () => {
  const url = "http://localhost:9090/user/dashboard/data";

  const response = await fetch(url, { method: "GET" });

  //console.log(response.status);
  //console.log(response.text);
  return await response;
};
