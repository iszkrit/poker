import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { pileAtom, gameAtom, judgeAtom, betAtom } from '../states/Atoms'
import { trump, shuffledCards, handJudge } from '../utils/index' 
import Button from '@mui/material/Button';

export const CheckButton = () => {
    const setPile = useSetRecoilState(pileAtom)
    const bet = useRecoilValue(betAtom)
    const [game, setGame] = useRecoilState(gameAtom)
    const [judge, setJudge] = useRecoilState(judgeAtom)

    const flop = () => {
        setGame({...game, round:"flop"})
    }

    const turn = () => {
        setGame({...game, round:"turn"})
    }

    const river = () => {
        setGame({...game, round:"river"})
    }

    const showdown = () => {
        if (judge?.winner==="player") {
            setGame({...game, stack : game.stack+game.pot})
        } else if (judge?.winner==="chop") {
            setGame({...game, stack : game.stack+game.pot/2})
        } else {       
        }
        setGame(game => ({...game, round: "showdown"}))
    }

    const preflop = async() => {
        setGame({...game, round: "preFlop"})
        let newPile =  await shuffledCards(trump, 9)
        setPile(newPile)
        setJudge(handJudge(newPile.slice(0,2),newPile.slice(2,4),newPile.slice(4,9)))
    }

    const handleClick = () => {
        switch (game.round) {
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
            default:
                preflop()
        }
    }
    
    return (
      <Button variant="contained" color="success" onClick={handleClick}>
        {(bet.villan-bet.player)>0? "Fold":"Check"}
      </Button>
    )
}
