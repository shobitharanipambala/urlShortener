import React, { useState } from "react";

function ShortenURL() {
  const [url, setURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  console.log(shortURL);

  const handleURLChange = (event) => {
    setURL(event.target.value);
  };

  const handleShortenClick = async () => {
    try {
      const response = await fetch("http://localhost:3000/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
       
      });

      const data = await response.json();

      if (response.ok) {
        setShortURL(data.shorternurl);
        console.log(data.shorternurl,"hello");
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error(error);
    }
    setURL("");
  };
  

  return (
   
    <div className="box">
         <h1>
            POCOURL
         </h1>
      <input type="text" value={url} onChange={handleURLChange} />
      <button onClick={handleShortenClick}>Shorten URL</button>
       <p>Shortened URL: {shortURL}</p>
    </div>
  );
}

export default ShortenURL;

