import React, { useState, useEffect } from "react";
import WordCard from "./WordCard";
import WordMeanings from "./WordMeanings";
import AudioPlayer from "./AudioPlayer";
export default function WordBinder(props) {
  const [audioFile, setAudioFile] = useState(undefined);
  const [subFolder, setSubFolder] = useState(undefined);
  const audioSrc = "https://media.merriam-webster.com/audio/prons/en/us/mp3/";
  const [pronouce, setPronounce] = useState("");
  const [apiLoop, setLoop] = useState([]);
  const [isWord, setIsWord] = useState(true);
  const apiLink =
    "https://www.dictionaryapi.com/api/v3/references/collegiate/json/";
  const apiKey = "?key=6bbec88f-fa3e-4de3-a3d5-67287a4a51be";

  async function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }
  async function createAudioLink(audioTag) {
    if (isLetter(audioTag.charAt(0))) {
      if (audioTag.substring(0, 1) === "gg") setSubFolder("gg");
      else if (audioTag.substring(0, 2) === "bix") setSubFolder("bix");
      else setSubFolder(audioTag.charAt(0));
    } else {
      setSubFolder("number");
    }
  }

  async function fetchData() {
    const res = await fetch(apiLink + props.searchedWord + apiKey);
    res
      .json()
      .then((res) => {
        setLoop(res);
        //console.log(res[0].hwi.hw);
        //console.log(isWord);
        setAudioFile(undefined);

        if (res[0].hwi === undefined) {
          setIsWord(false);
        } else {
          setPronounce(res[0].hwi.hw);
          setIsWord(true);
          if (res[0].hwi.prs !== undefined) {
            createAudioLink(res[0].hwi.prs[0].sound.audio);
            setPronounce(res[0].hwi.prs[0].mw);
            setAudioFile(res[0].hwi.prs[0].sound.audio);
          }
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, [props.searchedWord]);

  //console.log(audioSrc + subFolder + "/" + audioFile + ".mp3");
  if (isWord === false) {
    return (
      <div className="word-suggestion">
        <h1 key="message">
          This Word doesnt exist , you maybe looking for these words
        </h1>
        {apiLoop.map((wordsOptions, index) => {
          if (index < 6)
            return <h4 key={"altWord-" + index}>{wordsOptions.toString()}</h4>;
          return <></>;
        })}
      </div>
    );
  } else if (apiLoop[0] !== undefined) {
    if (apiLoop[0].hwi !== undefined) {
      return (
        <div className="sub-container">
          <AudioPlayer
            audioLink={audioSrc + subFolder + "/" + audioFile + ".mp3"}
            audioFile={audioFile}
          />
          <WordCard
            className="sub-item"
            word={apiLoop[0].hwi.hw}
            pronounce={pronouce}
          />
          <WordMeanings
            className="sub-item"
            limit={props.limit}
            meanings={apiLoop}
          />
        </div>
      );
    }
  }
  return <></>;
}
