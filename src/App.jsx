import { useState, useEffect } from "react";

import supabase from "./config/supabaseClient";

// Components
import Header from "./components/Header";
import Starter from "./components/Starter";
import Actions from "./components/Actions";
import Spinner from "./components/Spinner";
import Messages from "./components/Messages";
import AuthForm from "./components/AuthForm";

//test
import Logout from "./components/Logout";

const keyGPT = process.env.REACT_APP_GPT_KEY; //

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [answer, setAnswer] = useState(""); // temporary
  const [isLoading, setIsLoading] = useState(false);
  const [answerTime, setAnswerTime] = useState(0);

  // USER LOGIN HANDLE STATES
  const [isLogged, setIsLogged] = useState(false);
  const [userId, setUserId] = useState(null);

  //supabase states
  const [messages, setMessages] = useState([]); // Here is all data from db

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

  const handleSearch = async (e) => {
    try {
      const apiKey = keyGPT;
      const message = [
        { role: "system", content: userInput },
        { role: "user", content: userInput },
      ];
      e.preventDefault();
      setIsLoading(true);
      setUserInput("");
      // Makin a POST  request to GPT here
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: message,
            temperature: 0.7,
          }),
        }
      );
      // Getting data back from GPT
      const data = await response.json();
      console.log(`Response from GPT: ${data}`);

      setAnswer(data.choices[0].message.content);
      setAnswerTime(data.created);

      setIsLoading(false);

      // STORE THE DATA IN SUPABASE TABLE ✓
      // Here I get answer from GPT and insert new values into Supabase table
      if (data.choices[0].message.content) {
        const { error } = await supabase.from("messages").insert({
          answerTime: data.created,
          question: userInput,
          answer: data.choices[0].message.content,
          user_id: userId,
        });
        console.log(``);
        // UPDATING THE 'MESSAGES' STATE

        const newMessage = {
          question: userInput,
          answer: data.choices[0].message.content,
          answerTime: data.created,
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        if (error) {
          console.error("Error:", error);
        } else {
          console.log("Data inserted successfully");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // CHECKING IF USER LOGGED IN?

  useEffect(() => {
    // Check if there is a valid authentication token or session in the browser storage
    const authData = localStorage.getItem("authData");
    if (authData) {
      // If authentication data exists, set the user as logged in
      setIsLogged(true);
    } else {
      // If no authentication data exists, set the user as logged out
      setIsLogged(false);
    }
  }, [isLogged]);

  // #GPT version
  // store state in userId state
  if (isLogged) {
    const getUserId = async () => {
      const { data } = await supabase.auth.getUser();
      const loggedUserId = data.user.id;
      setUserId(loggedUserId);
    };
    getUserId();
  }

  // Fetch messages logic of logged user
  useEffect(() => {
    const fetchMessages = async () => {
      if (userId) {
        const { data, error } = await supabase
          .from("messages")
          .select("question, answer, answerTime, created_at, id") //
          .eq("user_id", userId);
        setMessages(data);
        console.log(data);
        if (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchMessages();
  }, [userId]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}>
      <Header>
        {isLogged && (
          <Logout setIsLogged={setIsLogged} setUserInput={setUserInput} />
        )}
      </Header>
      {isLogged ? (
        <>
          {isLoading && <Spinner />}
          {messages && !isLoading && (
            <Messages data={messages} onDelete={handleDelete} />
          )}
          {!messages && !isLoading && <Starter />}
          <Actions
            onHandleSearch={handleSearch}
            userInput={userInput}
            setUserInput={setUserInput}
          />
        </>
      ) : (
        <>
          <AuthForm setIsLogged={setIsLogged} />
        </>
      )}
    </div>
  );
};

export default App;
