import { useState } from 'react'
import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const OPENAI_API_KEY = "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";
console.log(OPENAI_API_KEY);
const chatGPTurl = "https://api.openai.com/v1/chat/completions";
const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${OPENAI_API_KEY}`
};

const model = "gpt-3.5-turbo";

function App() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am ChatGPT",
      send: "ChatGPT"
    }
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    }
  const newMessages = [...messages, newMessage];
  setMessages(newMessages);
  setTyping(true);
  await processMessageToChatGP(newMessages);
  };

  async function processMessageToChatGP(chatMessages){

    //roles:
    // "user" -> a message from the user
    // "assistent" -> response from ChatGPT
    // "system" -> generally one intital message defining HOW we want ChatGPT to talk

    const systemMessage = {
      "role": "system",
      "content": "Explain all concepts like I am a software eningeer with 1 years experience of software development"
    };

    // chatMessages { sender: "user" or "ChatGPT", message: "The messgae content here" }
    // need to map it to ChatGPT object
    // apiMessages { role: "user" or "assistant", content: "the message content here" }
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message};
    })

    const apiRequestBody = {
      "model": model,
      "messages": [systemMessage, ...apiMessages]
    }

    await fetch(chatGPTurl, {
      method: 'POST',
      headers,
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      setMessages([...chatMessages, {
        sender: "ChatGPT",
        message: data.choices[0].message.content}
      ]);
      setTyping(false);
    })
  }
  
  return (
      <div className='App'>
        <div style={{ position: "relative", height: "800px", width: "700px"}}>
          <MainContainer>
            <ChatContainer>
              <MessageList
              typingIndicator={typing ? <TypingIndicator content="ChatGPT is typing" />
                                      : null}
              >
                {messages.map((message, i) => {
                  return <Message key={i} model={message}/>
                })}
              </MessageList>
              <MessageInput placeholder='Type messgae here' onSend={handleSend} />
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
  )
}

export default App
