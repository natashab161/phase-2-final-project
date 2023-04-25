import React, { useState } from "react";

const ChatGPT = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://us-central1-pullupnyc.cloudfunctions.net/chatGPT",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        }
      );

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Enter text"
        />
        <button type="submit">Submit</button>
      </form>
      {result && <p>{result}</p>}
    </div>
  );
};

export default ChatGPT;
