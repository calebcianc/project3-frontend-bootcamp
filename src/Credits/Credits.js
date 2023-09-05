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
      <div>Proudly developed by</div>
      <br />
      <div>
        <a
          href="https://github.com/Khloeli"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chloe Li
        </a>{" "}
        and{" "}
        <a
          href="https://github.com/calebcianc"
          target="_blank"
          rel="noopener noreferrer"
        >
          Caleb Castro
        </a>
      </div>
    </div>
  );
}
