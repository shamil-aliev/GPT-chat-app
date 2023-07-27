import styles from "../styles/Starter.module.css";

function Starter() {
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        Your chat is empty. Send your first message to start a chat.
      </p>
    </div>
  );
}

export default Starter;
