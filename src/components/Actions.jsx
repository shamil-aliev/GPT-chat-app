function Actions({ onHandleSearch, userInput, setUserInput }) {
  return (
    <form
      onSubmit={onHandleSearch}
      style={{
        position: "absolute",
        width: "100%",
        bottom: "0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "24px 12px",
        // backgroundColor: "tomato",
      }}>
      <input
        type="text"
        placeholder="Type your message here..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        style={{
          height: "100px",
          padding: "12px",
          fontSize: "16px",
        }}
      />
      <button
        disabled={!userInput && true}
        style={{
          backgroundColor: userInput ? "#0085FF" : "#aaa",
          color: "#fff",
          padding: "12px",
          fontSize: "16px",
          cursor: "pointer",
          transition: "all 0.4s",
        }}>
        Send
      </button>
    </form>
  );
}

export default Actions;
