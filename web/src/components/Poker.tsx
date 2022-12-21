import { useRecoilValue } from 'recoil'
import { pileAtom, gameAtom, judgeAtom } from '../states/Atoms'
import { ActionBar, DisplayHand, DisplayBoard } from '../components/index' 

export const Poker = () => {
  const pile = useRecoilValue(pileAtom)
  const judge = useRecoilValue(judgeAtom)
  const game = useRecoilValue(gameAtom)

  const ShowDown = () => {
    return game.round==="showdown"? <h4>Winner : {judge?.winner} </h4> : <h2>Winner : ??</h2>
  }

  return (
    <div className="poker">
      <header className="pokertable">

        <div className="villanHand" style={{marginTop:180}}> 
          <p style={{fontSize:15}}>
            {game.round!=="showdown"?
              DisplayHand([{suit:"b", number:2}, {suit:"b", number:2}])
              :
              DisplayHand(pile.slice(2,4))
            } Villan's Hand{game.round==="showdown"? `:(${judge.villanHand})` : ""}
          </p>
        </div>

        <div className="board">
          {DisplayBoard(pile.slice(4,9))}
          {/* <p>Pot : {game.pot}</p> */}
        </div>
        <div className="playerHand"> 
          <p style={{fontSize:15}}>
          Your Hand{game.round==="showdown"? `:(${judge.playerHand})` : ""}
          {DisplayHand(pile.slice(0,2))} 
          </p> 
        </div>
        {/* {ShowDown()} */}
        {/* <h2>You {game.stack} / villan {1000-game.stack}</h2> */}
        <ActionBar/>
      </header>
    </div>
  );
}
