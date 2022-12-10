export const Error = (userInfo) => (
    <div
      className="alert alert-warning display-linebreak"
      style={{ display: userInfo.error ? "" : "none" }}
    >
      <div className="display-linebreak" style={{ whiteSpace: "pre-line" }}>
        {userInfo.error}
      </div>
    </div>
  );
