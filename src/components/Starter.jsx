function Starter() {
  return (
    <div
      style={{
        display: "flex",
        padding: "12px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "12px",
      }}>
      <p
        style={{
          color: "#222",
          fontSize: "16px",
          fontWeight: "400",
        }}>
        Your chat is empty. Send your first message to start a chat.
      </p>
    </div>
  );
}

export default Starter;
