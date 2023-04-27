import React, { useState } from 'react';
import dialogflow from '@google-cloud/dialogflow-cx';
import { SessionsClient } from '@google-cloud/dialogflow-cx';

const projectId = process.env.REACT_APP_DIALOGFLOW_PROJECT_ID;
const location = process.env.REACT_APP_DIALOGFLOW_LOCATION;
const agentId = process.env.REACT_APP_DIALOGFLOW_AGENT_ID;
const credentials = JSON.parse(process.env.REACT_APP_GOOGLE_APPLICATION_CREDENTIALS);

const sessionClient = new dialogflow.SessionsClient({
  credentials: {
    client_email: credentials.client_email,
    private_key: credentials.private_key,
  },
});

function Dialogflow() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  async function handleSendMessage(event) {
    event.preventDefault();

    const sessionId = Math.random().toString(36).substring(7);
    const sessionPath = sessionClient.projectLocationAgentSessionPath(
      projectId,
      location,
      agentId,
      sessionId
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: inputValue,
        },
        languageCode: 'en',
      },
    };

    try {
      const [response] = await sessionClient.detectIntent(request);
      const message = {
        text: response.queryResult.fulfillmentText,
        isBot: true,
      };
      setMessages([...messages, message]);
    } catch (error) {
      console.error(error);
    }

    setInputValue('');
  }

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index} style={{ textAlign: message.isBot ? 'left' : 'right' }}>
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Dialogflow;
