import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    const es = new EventSource("http://localhost:5000/stream-data");

    es.onmessage = (e) => {
      if (e.data === "[DONE]") {
        es.close();
        return;
      }
      
      // Append the new chunk to the previous state
      setData((prev) => prev + e.data);
    };

    es.onerror = () => {
      es.close();
    };

    return () => es.close();
  }, []);

  return (
    <div className="chat-container">
      <div className="message-box">
        <p className="streaming-text">
          {data}
          <span className="cursor">|</span>
        </p>
      </div>
    </div>
  );
}

export default App;