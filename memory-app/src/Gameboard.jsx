import { useState, useEffect } from "react";
import Card from "./Card";
function Gameboard() {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [howModal, setHowModal] = useState(false);
  const [winModal, setWinModal] = useState(false);

  function shuffle(cards) {
    setCards(cards.sort(() => Math.random() - 0.5));
  }
  function reset() {
    setScore(0);
    setBestScore(0);
    setClickedCards([]);
  }

  function handleClick(character) {
    const isClicked = clickedCards.includes(character);
    if (isClicked == true) {
      setScore(0);
      setClickedCards([]);
    } else {
      setClickedCards([...clickedCards, character]);
      setScore(score + 1);
      shuffle(cards);
      if (score + 1 > bestScore) {
        setBestScore(bestScore + 1);
      }
      if (clickedCards.length + 1 == cards.length) {
        setWinModal(true);
        setScore(0);
        setClickedCards([]);
      }
    }
  }

  useEffect(() => {
    fetch("https://thesimpsonsapi.com/api/characters?page=5")
      .then((response) => response.json())
      .then((data) => setCards(data.results));
  }, []);

  return (
    <div className="container">
      <nav className="nav">
        <h1>D'Oh! Memory</h1>
        <div className="buttons">
          <button onClick={() => setHowModal(true)}>How To Play</button>
          <button onClick={() => reset()}>Reset</button>
        </div>
      </nav>

      <div className="scoreboard">
        <div className="score">
          <p className="score-title">Your Score</p>
          <p className="score-digit">{score}</p>
        </div>
        <div className="score">
          <p className="score-title">Best Score</p>
          <p className="score-digit">{bestScore}</p>
        </div>
      </div>
      <div className="card-gallery">
        {cards.map((card) => (
          <Card
            key={card.name}
            name={card.name}
            image={"https://cdn.thesimpsonsapi.com/500" + card.portrait_path}
            onClick={() => handleClick(card.name)}
          />
        ))}
      </div>
      {howModal && (
        <div className="modal-overlay" onClick={() => setHowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setHowModal(false)}>
              ✕
            </button>
            <h2>How To Play</h2>
            <ul>
              <li>Click on a Simpsons character card</li>
              <li>Don't click the same character twice!</li>
              <li>Cards shuffle after every click</li>
              <li>Your score resets if you click the same card twice</li>
              <li>Try to beat your best score!</li>
            </ul>
          </div>
        </div>
      )}
      {winModal && (
        <div className="modal-overlay" onClick={() => setWinModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setWinModal(false)}>
              ✕
            </button>
            <h2>I am so smart! S-M-R-T... wait, that's you.</h2>
            <p>You win!</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default Gameboard;
