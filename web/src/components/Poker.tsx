import React from 'react';
import { useState } from 'react';
import { DisplayHand, DisplayBoard } from '../components/index' 
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import { villanAI } from './index' 
import { shuffledCards, handJudge } from '../utils/index' 
import { Card, Judge, ChipInfo } from '../types'
import Chip from '@mui/material/Chip';

export const Poker = () => {
  const [round, setRound] = useState<number>(-1)
  const [chip, setChip] = useState<ChipInfo>({
    playerStack : 500,
    playerBet : 0,
    villanBet : 0
  })
  const {playerBet:pb, villanBet:vb, playerStack:ps} = chip
  const pileDefault :Card[] = Array(9).fill({suit: "b", number: 2})
  const [pile, setPile] = useState<Card[]>(pileDefault)
  const [judge, setJudge] = useState<Judge>({
    winner : "",
    playerHand : "",
    villanHand : ""
  })
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true)

  const rounds = ["preflop", "flop", "turn", "river", "showdown", "showdown", "gamestart"]

  const onClickStartGame = () => {
    setRound(0)
    setChip({playerBet:10, villanBet:20, playerStack:490})
    setPile(shuffledCards(9))
  }

  const ActionEvent = (round:number, playerBet:number, villanBet:number, playerStack:number) => {
    const {pb, vb, vs} = villanAI(playerBet, villanBet, 1000-playerStack-playerBet-villanBet)
    let nextRound = 0
    if (vs===0||playerStack===0) {
        nextRound = 4
    } else if (pb===vb) {
        nextRound = round+1
    } else if (pb<vb) {
        nextRound = round
    }
    return {
        nextRound,
        newVillanBet: vb
    }
  }


  const onClickActionButton = async (extraBet:number) => {
    setIsPlayerTurn(false)
    const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))
    await sleep(500)
    // player folds
    const newPlayerBet = pb+extraBet
    if (newPlayerBet<vb) {
      setRound(0)
      setChip({playerBet:10,villanBet:20,playerStack:ps-10})
      setPile(shuffledCards(9))
    //  player does not fold
    } else {
      const { nextRound, newVillanBet } = ActionEvent(round, newPlayerBet, vb, ps-extraBet)
      if (1000-ps-pb===newVillanBet) {
        setRound(nextRound)
        setChip({playerBet:newPlayerBet,villanBet:newVillanBet,playerStack:ps-extraBet})
        setBetsize(Math.max(20, (newVillanBet-newPlayerBet)*2))
      } else if (newVillanBet<newPlayerBet) {
        // villan folds
        setRound(nextRound)
        setChip({playerBet:10,villanBet:20,playerStack:ps+pb+vb-10})
        setPile(shuffledCards(9))
        setBetsize(Math.max(20, (newVillanBet-newPlayerBet)*2))
      } else {
        //  villan does not fold
        setRound(nextRound)
        setChip({playerBet:newPlayerBet, villanBet:newVillanBet, playerStack:ps-extraBet})
        setBetsize(Math.max(20, (newVillanBet-newPlayerBet)*2))
      }
    } 
    setIsPlayerTurn(true)
  }

  const onClickShowDown = () => {
    const judge = handJudge(pile.slice(0,2), pile.slice(2,4), pile.slice(4,9))
    setJudge(judge)
    setRound(5)
  }

  const onClickNextGame = () => {
    const chipChange = (winner:string, playerBet:number, villanBet:number, playerStack:number) => {
      switch (winner)  {
        case "player":
          return {playerBet:10, villanBet:20, playerStack:playerStack+playerBet+villanBet-10}
        case "villan":
          return {playerBet:10, villanBet:20, playerStack:playerStack-10}
        default:
          return {playerBet:10, villanBet:20, playerStack:playerStack+(playerBet+villanBet)/2-10}
      } 
    }
    setRound(0)
    setChip(chipChange(judge.winner, pb, vb, ps))
    setPile(shuffledCards(9))
  }

  function valuetext(value: number) {
    return `${value}bet`;
  }
  const [betsize, setBetsize] = useState<number>(Math.max(20, (vb-pb)*2));
  const handleChange = async (event: Event, newValue: number | number[]) => {
    setBetsize(newValue as number);
  }
  const handleChangeCommited = (event: React.SyntheticEvent | Event, newValue: number | Array<number>) => {
    setBetsize(newValue as number);
  };

  const marks = (pot:number) => {
    return [
      {
        value: Math.round(pot/3),
        label: 'pot33%',
      },
      {
        value: Math.round(pot/2),
        label: 'pot50%',
      },
      {
        value: Math.round(pot*3/4),
        label: 'pot75%',
      },
      {
        value: pot,
        label: 'pot100%',
      },
      {
        value: pot*3/2,
        label: 'pot150%',
      },
      {
        value: pot*2,
        label: 'pot200%',
      },
    ];
  } 
  const memoMarks = React.useMemo(() => marks(pb+vb), [pb, vb])

  const ActionBar = () => {
    if (!isPlayerTurn) {
      return <div style={{height:140}}></div>
    }

    if (round===-1) {
      return  (
        <Stack alignItems="center" sx={{mt:13}}>
          <Button variant="contained" color="success" sx={{px:20}} onClick={onClickStartGame}>GameStart</Button>
        </Stack>
      )
    }
    if (round===4) {
      return  (
        <Stack alignItems="center" sx={{mt:13}}>
          <Button variant="contained" color="success" sx={{px:20}} onClick={onClickShowDown}>Show Down</Button>
        </Stack>
      )
    }
    if (round===5) {
      return  (
        <Stack alignItems="center" sx={{mt:13}}>
          <Button variant="contained" color="success" sx={{px:20}} onClick={onClickNextGame}>NextGame</Button>
        </Stack>
      )
    }
  
    return (
      <Container maxWidth="md"> 
        <Box sx={{ width: 800, mt: 10 }}>
          <Stack direction="row" spacing={2}>
            {(vb-pb)>0? 
              <Button variant="contained" color="success" onClick={()=>onClickActionButton(0)}>
                Fold
              </Button>
              :
              <Button variant="contained" color="success" onClick={()=>onClickActionButton(0)}>
                Check
              </Button>           
            }
            <Button variant="contained" disabled={(vb-pb)<=0} onClick={()=>onClickActionButton(vb-pb)}>
              Call
              <br/>{vb-pb}
            </Button>
            <Slider
              aria-label="Always visible"
              defaultValue={20}
              onChange={handleChange}
              // onChangeCommitted={handleChangeCommited}
              getAriaValueText={valuetext}
              step={5}
              marks={memoMarks}
              min={Math.max(20, (vb-pb)*2)}
              max={Math.min(ps, (pb+vb)*2, 1000-ps-pb-vb)}
              valueLabelDisplay="auto"
            />
            <Button variant="contained" color="secondary" onClick={()=>onClickActionButton(betsize)}>
              {vb-pb>0? "Raise":"Bet"}
              <br/>{betsize}
            </Button>
            <Button variant="contained" color="error" onClick={()=>onClickActionButton(Math.min(ps,1000-ps-2*pb))}>
              AllIn
              <br/>{Math.min(ps,1000-ps-2*pb)}
            </Button>
          </Stack>
        </Box>
      </Container>
    )
  }

  const chipText = (winner:string) => {
    if (round!==5) {
      return <div>You have {ps} chips (bet{pb}) / Villan has {1000-ps-pb-vb} chips (bet{vb}) </div>
    }
    let text = ""
    switch (winner) {
      case "player":
        text=`You have ${ps}+${pb+vb} chips / Villan has ${1000-ps-pb-vb} chips`
        break;
      case "villan":
        text=`You have ${ps} chips / Villan has ${1000-ps-pb-vb}+${pb+vb} chips`
        break;
      default:
        text=`You have ${ps}+${(pb+vb)/2} chips / Villan has ${1000-ps-pb-vb}+${(pb+vb)/2} chips`
    }
    return (
      <div>{text}</div>
    )
  }

  if (chip.playerStack>=990) {
    return (
      <div className="poker">
        <div className="pokertable" >
          <div style={{fontSize:50}}> 
            You Win!
          </div>
        </div>
      </div>
    )
  } else if (chip.playerStack<0) {
    return (
      <div className="poker">
        <div className="pokertable" >
          <div style={{fontSize:50}}> 
            You Lose...
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="poker">
      <div className="pokertable" >
        <div className="villanHand" style={{marginTop:150,fontSize:15}}> 
          {round!==5?
            DisplayHand([{suit:"b", number:2}, {suit:"b", number:2}])
            :
            DisplayHand(pile.slice(2,4))
          } Villan's Hand{round===5? `:(${judge.villanHand})` : ""}
        </div>

        <div className="board" style={{textAlign:'center'}}>
          <Chip label={round===5? `Pot:${pb+vb}` : `Pot:${pb+vb}`}/>
          {DisplayBoard(pile.slice(4,9), round)}
          <Chip label={rounds[round]}/>
        </div>

        <div className="playerHand" style={{fontSize:15}}> 
          Your Hand{round===5? `:(${judge.playerHand})` : ""}
          {DisplayHand(pile.slice(0,2))} 
        </div>
        <ActionBar/>
        {chipText(judge.winner)}
      </div>
    </div>
  );
}