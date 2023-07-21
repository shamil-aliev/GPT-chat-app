import styles from "../styles/Header.module.css";
function Header({ children }) {
  return (
    <div className={styles.main}>
      <header>
        <h1 className={styles.header}>Lowfound OpenAI API Chat</h1>
      </header>
      {children}
    </div>
  );
}

export default Header;
