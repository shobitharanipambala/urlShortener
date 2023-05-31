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

      const responseData = await response.json();

      if (response.ok) {
        setShortURL(responseData.shortURL);
        console.log(responseData.shortURL);
      } else {
        console.error(responseData);
      }
    } catch (error) {
      console.error(error);
    }

    setURL("");
  };

  const handleRedirectClick = () => {
    if (shortURL) {
      window.location.href = shortURL;
    }
  };

  return (
    <div className="box">
      <h1>POCOURL</h1>
      <input type="text" value={url} onChange={handleURLChange} />
      <button onClick={handleShortenClick}>Shorten URL</button>
      {shortURL && (
        <p>
          Shortened URL:{" "}
          <a href={shortURL} onClick={handleRedirectClick}>
            {shortURL}
          </a>
        </p>
      )}
    </div>
  );
}

export default ShortenURL;
