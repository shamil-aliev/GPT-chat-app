import styles from "../styles/Card.module.css";

function Card({ children }) {
  return <div className={styles.container}>{children}</div>;
}

export default Card;
