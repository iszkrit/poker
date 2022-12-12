import { useState } from 'react';
import { Card, Game, Judge } from './types'
import { trump, shuffledCards, handJudge, paper } from './utils/index' 
import './App.css';

function App() {
  // const [pile, setPile] = useState<Card[]>(shuffledCards(trump, 9))
  const [judge, setJudge] = useState<Judge>()
  const [pile, setPile] = useState<Card[]>([
    {suit:"s", number:8},
    {suit:"c", number:3},
    {suit:"d", number:10},
    {suit:"c", number:5},
    {suit:"h", number:12},
    {suit:"d", number:12},
    {suit:"s", number:10},
    {suit:"h", number:8},
    {suit:"h", number:2}
  ])
  const keys = ["10","11","12","13","14","s","c","h","d"];
  const reps = ["T","J","Q","K","A","♠︎","♣︎","❤︎","♦︎"];

  const displayCard = (cards:Card[]):string => {
    let stringCards=""
    cards.forEach((card:Card)=>{
      stringCards += `[${card.suit+card.number}]`
      for (let i=0;i<keys.length;i++) {
        stringCards = stringCards.replace(keys[i], reps[i]);
      }
    })
    return stringCards
  }

  const [game, setGame] = useState<Game>({
    board: "",
    round: "preFlop"
  })

  const flop = () => {
    setGame({
      board: displayCard(pile.slice(4,7)),
      round: "flop"
    })
  }

  const turn = () => {
    setGame({
      board: game.board+displayCard(pile.slice(7, 8)),
      round: "turn"
    })
  }

  const river = () => {
    setGame({
      board: game.board+displayCard(pile.slice(8,9)),
      round: "river"
    })
  }

  const showdown = () => {
    setGame(game => ({...game, round: "showdown"}))
    setJudge(handJudge(pile.slice(0,2),pile.slice(2,4),pile.slice(4,9)))
    paper(displayCard(pile.slice(2,4)))
  }

  const preflop = () => {
    setGame({
      board: "",
      round: "preFlop"
    })
    setPile(shuffledCards(trump, 9))
  }

  const handleClick = (round:string) => {
    switch (round) {
      case "preFlop":
        flop()
        break;
      case "flop":
        turn()
        break;
      case "turn":
        river()
        break;
      case "river":
        showdown()
        break; 
      case "showdown":
        preflop()
        break; 
    }
  }

  // useEffect(() => {
  //   const cards = async() => {
  //     const cards = await shuffledCards(trump, 9)
  //     setPile(shuffledCards(trump, 9))
  //   }()
  // },[pile])

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
        <button onClick={()=>handleClick(game.round)}>
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
