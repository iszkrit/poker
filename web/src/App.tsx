import { useState, useEffect } from 'react';
import { Card, Game, Judge } from './types'
import { trump, shuffledCards, handleGame, displayCard, handJudge, paper } from './utils/index' 
import './App.css';

function App() {
  const [pile, setPile] = useState<Card[]>(shuffledCards(trump, 9))
  const [judge, setJudge] = useState<Judge>()
  const [game, setGame] = useState<Game>({
    board: "",
    round: "preFlop"
  })

  useEffect(() => {
    setJudge(handJudge(pile.slice(0,2),pile.slice(2,4),pile.slice(4,9)))
  }, [pile])


  return (
    <div className="App">
      <header className="App-header">
        {game.round!=="showdown"?
          <p>Your hand {displayCard(pile.slice(0,2))}</p>
          :
          <p>Your hand {displayCard(pile.slice(0,2))} : {judge?.playerHand}</p>
        }
        {game.round!=="showdown"?
          <p>Opponent ??</p>
          :
          <p>Opponent {displayCard(pile.slice(2,4))} : {judge?.opponentHand}</p>
        }
        <p>
          Board {game.board}
        </p>
        <button onClick={()=>handleGame({game, setGame, pile, setPile})}>
          open
        </button>
        {game.round==="showdown"?
          <h2>Winner : {judge?.winner}</h2>
          :
          <></>
        }
      </header>
    </div>
  );
}

export default App;
