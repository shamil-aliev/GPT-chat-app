// A cardcomp that will include other components
function Card({ children }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: "24px",
        alignItems: "flex-start",
        backgroundColor: "#f5f5f5",
        margin: "12px",
      }}>
      {children}
    </div>
  );
}

export default Card;
