import React, {useState} from "react";
import {css} from "@emotion/react";
import {BounceLoader} from "react-spinners";
import "./App.css";

const override = css `
display: block;
margin-left: 100px;
justify-content: center;
align-items:center;

`;

function ShortenURL() {
    const [url, setURL] = useState("");
    const [shortURL, setShortURL] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleURLChange = (event) => {
        setURL(event.target.value);
        setError("");
    };

    const handleShortenClick = async () => {
        try {
            if (!url) {
                setError("Please enter a URL");
                return;
            }
            const urlPattern = /^(http|https):\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
            if (! urlPattern.test(url)) {
                setError("Please enter a valid URL");
                return;
            }

            setIsLoading(true);

            const response = await fetch("https://poco-url.onrender.com/shorten", {
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
        } finally {
            setIsLoading(false);
        }

        setURL("");
    };

    const handleRedirectClick = () => {
        if (shortURL) {
            window.location.href = shortURL;
        }
    };


    return (
        <div>
            <h1>POCO-URL</h1>

            {
            isLoading ? (
                <BounceLoader color="#1B9C85"
                    css={override}
                    size={100}/>
            ) : (
                <>
                    <input type="text"
                        value={url}
                        onChange={handleURLChange}/> {
                    error && <p className="error">
                        {error}</p>
                }
                    <button onClick={handleShortenClick}>Shorten URL</button>
                    {
                    shortURL && (
                        <h2>
                            Shortened URL:{" "}
                            <a href={shortURL}
                                onClick={handleRedirectClick}>
                                {shortURL} </a>
                        </h2>
                    )
                } </>
            )
        } </div>
    );
}

export default ShortenURL;

