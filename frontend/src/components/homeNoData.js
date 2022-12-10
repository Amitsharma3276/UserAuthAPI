import { FaRegFrown } from "react-icons/fa";

const HomeNoData = (props) => {
  const homeInfo = props.homeData;
  const handleSignOut = props.handleSignOut;

  return (
    <div className="container displayContainer" style={{ height: "92vh" }}>
      <center>
        <h1>Welcome {homeInfo.userName}</h1>
      </center>
      <p align="right">{homeInfo.token}</p>
      <a href="/login">
        {" "}
        <button onClick={handleSignOut} className="nav-link" to={"/login"}>
          Logout
        </button>
      </a>
      <br />
      <center>
        <h2>Sorry, No Vaccination Centers Available Right Now</h2>{" "}
      </center>
      <br />
      <center>
        <FaRegFrown size={120} style={{ fill: "rgba(240, 52, 52, 0.6)" }} />
      </center>
    </div>
  );
};

export default HomeNoData;
