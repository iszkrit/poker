import { Card, Game } from '../types'
import { trump, shuffledCards, displayCard } from './index' 

type gameProps = {
    game: Game,
    setGame: React.Dispatch<React.SetStateAction<Game>>,
    pile: Card[],
    setPile: React.Dispatch<React.SetStateAction<Card[]>>
}

export const handleGame = ({game, setGame, pile, setPile}:gameProps) => {
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
    }
    
    const preflop = async() => {
        const shuffle = await shuffledCards(trump, 9)
        setPile(shuffle)
        setGame({
            board: "",
            round: "preFlop"
        })
    }

    const handleGame = (round:string) => {
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

    return handleGame(game.round)
}
 