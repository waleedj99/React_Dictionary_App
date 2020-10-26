import React, { useState } from "react";
import WordBinder from "./Components/WordBinder";
import SearchIcon from "@material-ui/icons/Search";
import "./styles.css";

export default function App() {
  const [inputWord, setWord] = useState("");
  const [searchWord, setSearchWord] = useState("Nice");

  return (
    <div className="App">
      <div className="word-day">
        <h2>Word of The Day : </h2>
        <WordBinder searchedWord="run" limit="5" />
      </div>
      <label className="sub-container input-style">
        <input
          placeholder="Enter any word to search"
          onChange={(e) => setWord(e.target.value)}
          type="text"
        />
        <button onClick={(e) => setSearchWord(inputWord)}>
          <SearchIcon />
        </button>
      </label>
      <WordBinder searchedWord={searchWord} limit="10" />
    </div>
  );
}
