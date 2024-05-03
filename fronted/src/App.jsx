import { useEffect, useState } from 'react';
import io from 'socket.io-client';

function App() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:8000');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('receive', (data) => {
      setMessages([...messages, data]);
      
    });

    return () => {
      socket.off('receive');
    };
  }, [socket, messages]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    socket.emit('send', messageInput);
    setMessageInput('');
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white">
      <div className="bg-black h-3/4 w-1/2 flex flex-col justify-start items-center">
        <nav className="flex justify-center items-center h-20">
          <img src="./logo.jpg" alt="Logo" className="h-16 w-16 mt-4" />
        </nav>
        <div className="mt-5 flex flex-col w-full overflow-y-scroll">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex justify-${msg.isSentByUser ? 'end' : 'start'} w-full`}
            >
              <div
                className={`${
                  msg.isSentByUser ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                } font-bold mb-5 mt-3 rounded-lg p-4 max-w-md border-solid border-gray-300 border-2`}
              >
                {msg.name}: {msg.message}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-300 w-1/2 mt-3 p-4 rounded-lg">
        <form className="flex justify-between items-center" onSubmit={handleMessageSubmit}>
          <input
            type="text"
            name="message"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="flex-grow p-2 border-solid border-gray-500 border-2 rounded-lg mr-3"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
