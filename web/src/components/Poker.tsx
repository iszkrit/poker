import { useRecoilValue } from 'recoil'
import { pileAtom, gameAtom, judgeAtom } from '../states/Atoms'
import { ActionBar, DisplayHand, DisplayBoard } from '../components/index' 
import Chip from '@mui/material/Chip';

export const Poker = () => {
  const pile = useRecoilValue(pileAtom)
  const judge = useRecoilValue(judgeAtom)
  const { stack, round, pot } = useRecoilValue(gameAtom)
  const showGame = (round==="default")? "hidden":"visible"
  const showButton = (round!=="default")? "hidden":"visible"
  const start = () => {
  }

  return (
    <div className="poker">
      <div className ="startButton" style={{visibility: showButton, alignItems:'center'}}>
        <button>
          Game Start
        </button>
      </div>

      <div className="pokertable" >
        <div className="villanHand" style={{marginTop:150,fontSize:15}}> 
          {round!=="showdown"?
            DisplayHand([{suit:"b", number:2}, {suit:"b", number:2}])
            :
            DisplayHand(pile.slice(2,4))
          } Villan's Hand{round==="showdown"? `:(${judge.villanHand})` : ""}
        </div>

        <div className="board" style={{textAlign:'center'}}>
          <Chip label={round==="showdown"? `${judge.winner} Pot:${pot}` : `Pot:${pot}`}/>
          {DisplayBoard(pile.slice(4,9))}
          <Chip label={round}/>
        </div>

        <div className="playerHand" style={{fontSize:15}}> 
          Your Hand{round==="showdown"? `:(${judge.playerHand})` : ""}
          {DisplayHand(pile.slice(0,2))} 
        </div>
        <ActionBar/>
        You have {stack} chips / Villan has {1000-stack-pot} chips
      </div>
    </div>
  );
}
