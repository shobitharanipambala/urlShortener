import React, {useState} from "react";
import './App.css';

function ShortenURL() {
    const [url, setURL] = useState("");
    const [shortURL, setShortURL] = useState("");
    const [error, setError] = useState("");

    const handleURLChange = (event) => {
        setURL(event.target.value);
        setError(""); // Reset the error message when input changes
    };

    const handleShortenClick = async () => {
        try { // Validate URL input
            if (!url) {
                setError("Please enter a URL");
                return;
            }
            const urlPattern = /^(http|https):\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
            if (! urlPattern.test(url)) {
                setError("Please enter a valid URL");
                return;
            }
            const response = await fetch("http://localhost:3000/shorten", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({url})
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

    return (<div>

        <h1>POCO-URL</h1>

        <input type="text"
            value={url}
            onChange={handleURLChange}/> {
        error && <p className="error"> {error}</p>
    }
        {/* Display error message if present */}
        <button onClick={handleShortenClick}>Shorten URL</button>
        {
        shortURL && (<h2>
            Shortened URL:{" "}
            <a href={shortURL}
                onClick={handleRedirectClick}> {shortURL} </a>
        </h2>)
    } </div>);
}

export default ShortenURL;
