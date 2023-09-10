export default function Credits() {
  return (
    <div
      style={{
        maxWidth: "1280px",
        height: "calc(100vh - 64px - 56px)",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "whitesmoke",
      }}
    >
      <div>
        <b>Proudly developed by</b>
      </div>
      <br />
      <div>
        <div style={{ display: "inline-block", textAlign: "center" }}>
          <img
            src="https://avatars.githubusercontent.com/u/79033070?v=4"
            alt="Chloe Li"
            style={{ borderRadius: "50%", width: "100px", height: "100px" }}
          />
          <br />
          <a
            href="https://github.com/Khloeli"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chloe Li
          </a>
        </div>{" "}
        and{" "}
        <div style={{ display: "inline-block", textAlign: "center" }}>
          <img
            src="https://avatars.githubusercontent.com/u/12793629?v=4"
            alt="Caleb Castro"
            style={{ borderRadius: "50%", width: "100px", height: "100px" }}
          />
          <br />
          <a
            href="https://github.com/calebcianc"
            target="_blank"
            rel="noopener noreferrer"
          >
            Caleb Castro
          </a>
        </div>
      </div>
    </div>
  );
}
