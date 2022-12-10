import { FaUserSecret } from "react-icons/fa";

const HomeError = (props) => {
  const homeInfo = props.homeData;
  const handleSignOut = props.handleSignOut;

  return (
    <div className="container displayContainer" style={{ height: "92vh" }}>
      <center>
        <h1>Hi There {homeInfo.userName}</h1>
      </center>

      <br />
      <center>
        <h2>You must Log in to view this page</h2>{" "}
      </center>
      <br />
      <a href="/login">
        <button onClick={handleSignOut} className="nav-link" to={"/login"}>
          Login
        </button>
      </a>
      <center>
        <FaUserSecret size={120} style={{ fill: "rgba(52, 52, 52, 0.6)" }} />
      </center>
    </div>
  );
};

export default HomeError;
