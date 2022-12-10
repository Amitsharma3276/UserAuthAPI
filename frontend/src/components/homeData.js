import VaccinationCenter from "../common/VaccinationCenter";

const HomeData = (props) => {
  const homeInfo = props.homeData;
  const handleSignOut = props.handleSignOut;

  return (
    <div className="container displayContainer" style={{ height: "92vh" }}>
      <center>
        <h1>Welcome {homeInfo.userName}</h1>
      </center>
      <p align="right">{homeInfo.token}</p>
      <a href="/login">
        <button onClick={handleSignOut} className="nav-link" to={"/login"}>
          Logout
        </button>
      </a>
      <br></br>
      <center>
        <h2>These are the vaccination centers we found near you</h2>
      </center>
      <h3>Vaccinations Centers : </h3>

      <div>
        {homeInfo.data.map((line, i) => (
          <VaccinationCenter key={i} center={line} />
        ))}
      </div>
    </div>
  );
};

export default HomeData;
