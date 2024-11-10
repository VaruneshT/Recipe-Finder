import React, { useState } from 'react';
import axios from 'axios';

const RecipeChatbot = () => {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);

  const cohereApiKey = 'xTlR3FdNSiqjNylPgWRKH2D087FHJQKvoxKzAziu'; // Replace with your Cohere API key

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = async () => {
    if (!input) return;

    // Adding user's message to the chat log
    const newChatLog = [...chatLog, { user: 'user', message: input }];
    setChatLog(newChatLog);
    setLoading(true);

    try {
      const response = await axios.post(
        'https://api.cohere.ai/v1/generate', // Cohere's generation endpoint
        {
          model: 'command-xlarge-nightly', // Cohere’s conversational model
          prompt: `User: ${input}\nBot:`, // Corrected string interpolation
          max_tokens: 500, // Adjust token limit as needed
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cohereApiKey}`, // Corrected Bearer token syntax
          },
        }
      );

      // Extracting the bot's response and adding it to the chat log
      const botMessage = response.data.generations[0].text.trim();
      setChatLog([...newChatLog, { user: 'bot', message: botMessage }]);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setChatLog([...newChatLog, { user: 'bot', message: 'Server is busy, please try again later.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        {chatLog.map((entry, index) => (
          <div key={index} className={entry.user === 'bot' ? 'bot-message' : 'user-message'}>
            <strong>{entry.user === 'bot' ? 'Bot' : 'You'}: </strong>{entry.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Ask me a recipe question..."
      />
      <button onClick={handleSend} disabled={loading}>
        {loading ? 'Loading...' : 'Send'}
      </button>
    </div>
  );
};

export default RecipeChatbot;
