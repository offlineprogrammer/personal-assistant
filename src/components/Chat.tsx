import React, { useState } from 'react';
// import { API, graphqlOperation } from 'aws-amplify';
// import { createMessage } from '../graphql/mutations';
// import { sendMessageToBedrock } from '../lib/api';
import { generateClient } from "aws-amplify/api";
import { Schema } from "../../amplify/data/resource";

const client =generateClient<Schema>({
    authMode: "userPool",
  });


const Chat: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');

    try {
  

      const { data, errors } = await client.queries.chat({
        prompt: input,
      });

        if (errors) {
            console.error("Error:", errors);
            return;
        }

        console.log("Data:", data);
      
          //   const response = await sendMessageToBedrock(newMessages);
      const assistantMessage = { role: 'assistant', content: "data?.toString()" };
      setMessages([...newMessages, assistantMessage]);


      // Save messages to the database
    //   await API.graphql(graphqlOperation(createMessage, { input: userMessage }));
    //   await API.graphql(graphqlOperation(createMessage, { input: assistantMessage }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="input"
        />
        <button onClick={handleSend} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default Chat;