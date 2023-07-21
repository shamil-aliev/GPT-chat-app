import React from "react";
import styles from "../styles/Message.module.css";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Message({ data, onDelete }) {
  const date = new Date(data.answerTime * 1000);
  // const date = new Date(messages.answerTime * 1000);

  const formattedTime = date.toLocaleTimeString();
  const time = formattedTime.slice(0, 5);

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  const handleDelete = () => {
    // onDelete(data.answerTime);  OLD
    onDelete(data.id); // NEw based on Id
  };
  return (
    <div>
      <p className={styles.date}>{`${day} ${month} ${year} ${time}`}</p>
      <p className={styles.info}>You asked:</p>
      <p className={styles.answer}>{data.question}</p>
      <p className={styles.info}>GPT responded:</p>
      <p className={styles.answer}>{data.answer}</p>
      <button onClick={handleDelete} className={styles["delete-btn"]}>
        Delete
      </button>
    </div>
  );
}

export default Message;
