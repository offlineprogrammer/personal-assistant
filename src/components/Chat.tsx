import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { generateClient } from "aws-amplify/api";
import { Schema } from "../../amplify/data/resource";
import { Button, TextField, Loader, Placeholder } from "@aws-amplify/ui-react";

// Types
type Message = {
  role: string;
  content: { text: string }[];
};

type Conversation = Message[];

// Constants
const CLIENT = generateClient<Schema>({ authMode: "userPool" });

const SYSTEM_PROMPT = `
  To create a personalized travel planning experience, greet users warmly and inquire about their travel preferences 
  such as destination, dates, budget, and interests. Based on their input, suggest tailored itineraries that include 
  popular attractions, local experiences, and hidden gems, along with accommodation options across various price 
  ranges and styles. Provide transportation recommendations, including flights and car rentals, along with estimated 
  costs and travel times. Recommend dining experiences that align with dietary needs, and share insights on local 
  customs, necessary travel documents, and packing essentials. Highlight the importance of travel insurance, offer 
  real-time updates on weather and events, and allow users to save and modify their itineraries. Additionally, 
  provide a budget tracking feature and the option to book flights and accommodations directly or through trusted 
  platforms, all while maintaining a warm and approachable tone to enhance the excitement of trip planning.
`;

const Chat: React.FC = () => {
  const [conversation, setConversation] = useState<Conversation>([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesRef = useRef(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setNewUserMessage();
    }
  };

  const fetchChatResponse = async () => {
    setInputValue('');
    setIsLoading(true);

    try {
      const { data, errors } = await CLIENT.queries.chat({
        conversation: JSON.stringify(conversation),
        systemPrompt: SYSTEM_PROMPT
      });

      if (!errors && data) {
        console.log("Chat response:", JSON.parse(data));
        setConversation(prevConversation => [...prevConversation, JSON.parse(data)]);
      } else {
        throw new Error(errors?.[0].message || "An unknown error occurred.");
      }
    } catch (err) {
      setError((err as Error).message);
      console.error("Error fetching chat response:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const lastMessage = conversation[conversation.length - 1];
    if (conversation.length > 0 && lastMessage.role === "user") {
      fetchChatResponse();
    }
    (messagesRef.current as HTMLDivElement | null)?.lastElementChild?.scrollIntoView();
  }, [conversation]);

  const setNewUserMessage = () => {
    const newUserMessage: Message = { role: "user", content: [{ text: inputValue }] };
    setConversation(prevConversation => [...prevConversation, newUserMessage]);
    (messagesRef.current as HTMLDivElement | null)?.lastElementChild?.scrollIntoView();
    setInputValue('');
  };

  return (
    <div className="chat-container">
      <div className="messages" ref={messagesRef}>
        {conversation.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content[0].text}
          </div>
        ))}
      </div>
      {isLoading && (
        <div className="loader-container">
          <p>Thinking...</p>
    
          <Placeholder size="large" />

        </div>
      )}
      <div className="input-container">
        <input
          type="text"
          name="prompt"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="input"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <Button onClick={handleSendMessage} className="send-button" isDisabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </Button>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Chat;