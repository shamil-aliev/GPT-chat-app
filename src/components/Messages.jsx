import React from "react";
import Message from "./Message";
import Card from "./Card";

import supabase from "../config/supabaseClient";
import styles from "../styles/Messages.module.css";

function Messages({ data, setMessages }) {
  const handleDelete = async (messageId) => {
    try {
      const { error } = await supabase
        .from("messages")
        .delete()
        .eq("id", messageId);
      if (error) {
        throw new Error("Error deleting message:", error);
      } else {
        // If deletion is successful, update the messages state by filtering out the deleted message
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message.id !== messageId)
        );
        console.log("Message deleted successfully");
      }
    } catch (catchError) {
      console.error(catchError);
    }
  };
  return (
    <div className={styles.messages}>
      {data.map((message) => (
        <Card key={message.id}>
          <Message data={message} onDelete={handleDelete} />
        </Card>
      ))}
    </div>
  );
}

export default Messages;
