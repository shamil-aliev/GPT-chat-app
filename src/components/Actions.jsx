import { useRef, useEffect } from "react";

import styles from "../styles/Actions.module.css";
function Actions({ onHandleSearch, userInput, setUserInput }) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form onSubmit={onHandleSearch} className={styles.form}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Type your message here..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className={styles.input}
      />
      <button
        disabled={!userInput && true}
        style={{
          backgroundColor: userInput ? "#0085FF" : "#aaa",
        }}
        className={styles.btn}>
        Send
      </button>
    </form>
  );
}

export default Actions;
