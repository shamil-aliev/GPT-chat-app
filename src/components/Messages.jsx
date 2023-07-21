import React from "react";
import Message from "./Message";
import Card from "./Card";

function Messages({ data, onDelete }) {
  return (
    <div
      style={{
        height: "65vh",
        overflow: "scroll",
      }}>
      {data.map((message) => (
        <Card key={message.answerTime}>
          <Message data={message} onDelete={onDelete} />
        </Card>
      ))}
    </div>
  );
}

export default Messages;
