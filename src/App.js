// App.js
import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

function App() {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [advice, setAdvice] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  function fetchData() {
    const options = {
      method: "POST",
      url: "https://text-analysis12.p.rapidapi.com/sentiment-analysis/api/v1.1",
      headers: {
        "content-type": "application/json",
        "x-rapidapi-host": "text-analysis12.p.rapidapi.com",
        "x-rapidapi-key": "55085e4fb9mshd8f68b60f5edfd1p1813aejsnaecfcb92e35e"
      },
      data: {
        language: "english",
        text: text
      }
    };

    axios
      .request(options)
      .then(function (response) {
        setSentiment(response.data.sentiment);

        // Set advice based on sentiment
        if (response.data.sentiment === 'positive') {
          setAdvice("Great to hear you're positive! Enjoy the positive vibes!");
        } else if (response.data.sentiment === 'negative') {
          setAdvice("I'm sorry to hear that you're feeling negative. Remember, it's okay not to be okay. Reach out to friends or family for support.");
        } else {
          setAdvice('No specific advice for your sentiment. Keep expressing yourself!');
        }

        setIsLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <h1>Intelligence Based Counselling </h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setText("");
          fetchData();
        }}
      >
        <input
          onChange={(event) => setText(event.target.value)}
          type="text"
          name="text"
          id="text"
          value={text}
          className="input"
          placeholder="Enter your string here..."
        />
        <button className="btn" type="submit">
          Analyze
        </button>
      </form>

      {isLoading ? (
        <div className="loading">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="result">
          <p>
            Sentiment: <span>{sentiment}</span>
          </p>
          <p>
            Advice: <span>{advice}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
