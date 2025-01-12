import io from 'socket.io-client'; 
import {useState, useEffect} from 'react'; 
const socket = io("/"); 

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  console.log(messages);

  const handleSubmit = (e) =>{
    e.preventDefault();
    const newMessage = {
      body: message,
      from:'Me'
    }
    setMessages([...messages, newMessage]);
    socket.emit("message", message);
  };
  
  useEffect(() => {
    socket.on("message", reciveMessage);

    return () => {
      socket.off("message", reciveMessage);
    };
  }, []);

  const reciveMessage = (message)=> setMessages((state) => [...state, message]);

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <h1>live chat</h1>
        <input 
        onChange={(e)=> setMessage(e.target.value)}
        />
        <ul>
          { 
            messages.map((message, i) => (
              <li key={i} 
              > 
              <span>{message.from}</span>:{message.body}
              </li>
            ))
          }
        </ul>
      </form>

    </div>
  )
}

export default App
