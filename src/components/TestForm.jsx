import React, { useState } from "react";
import supabase from "../config/supabaseClient";

function TestForm() {
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input) {
      const { data, error } = await supabase
        .from("messages")
        .insert([{ user_id: input }])
        .select(); // select the last input
      setInput("");

      if (error) console.log(error);
      //   if (data) console.log(data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="enter  a message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button>Send</button>
    </form>
  );
}

export default TestForm;
