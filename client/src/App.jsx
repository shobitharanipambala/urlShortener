
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import React, { useState} from 'react';

function App() {
  const [url, setUrl] = useState('');
  

 



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setUrl('');
   
  };

  return (
    <div>
      <h1>POCO URL Shortener</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter a URL"
          required
        />
        <button type="submit">Shorten</button>
      </form>

      <h2>Short URLs:</h2>
     
    </div>
  );
}

export default App;

