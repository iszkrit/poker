import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil'
import { pileAtom, gameAtom, betAtom, judgeAtom } from '../states/Atoms'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import { trump, shuffledCards, handJudge } from '../utils/index' 
import { Game } from '../types';

function valuetext(value: number) {
  return `${value}bet`;
}

export const ActionBar = () => {
  const [game, setGame] = useRecoilState(gameAtom)
  const [bet, setBet] = useRecoilState(betAtom)
  const [judge, setJudge] = useRecoilState(judgeAtom)
  const setPile = useSetRecoilState(pileAtom)

  const flop = () => {
    setGame({...game, round:"flop"})
    setBet({player:0, villan:0})
  }

  const turn = () => {
    setGame({...game, round:"turn"})
    setBet({player:0, villan:0})
  }

  const river = () => {
    setGame({...game, round:"river"})
    setBet({player:0, villan:0})
  }

  const showdown = () => {
    setBet({player:0, villan:0})
    if (judge?.winner==="player") {
        setGame({...game, stack : game.stack+game.pot})
    } else if (judge?.winner==="chop") {
        setGame({...game, stack : game.stack+game.pot/2})
    } else {       
    }
    setGame(game => ({...game, round: "showdown"}))
  }

  const preflop = async() => {
    setBet({player:game.bb/2, villan:game.bb})
    setGame({...game, round: "preFlop", pot:game.bb*3/2, stack:game.stack-game.bb/2, turn:"player"})
    let newPile =  await shuffledCards(trump, 9)
    setPile(newPile)
    setJudge(handJudge(newPile.slice(0,2),newPile.slice(2,4),newPile.slice(4,9)))
  }

  const ChangeRound = () => {
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

  const playerCheck = () => {
    setGame({...game, turn:"villan"})
    setTimeout(villanCheck, 1000)
  }

  const playerFold = () => {
    setGame({...game, pot:0})
    preflop()
  }

  const playerCall = () => {
    let gap = bet.villan-bet.player
    setGame({...game, pot:game.pot+gap, stack:game.stack-gap, turn:"villan"})
    setBet({...bet, player:bet.villan})
  }

  const [betsize, setBetsize] = useState<number>(Math.max(game.bb, (bet.villan-bet.player)*2));
  const handleChange = (event: Event, newValue: number | number[]) => {
    setBetsize(newValue as number);
  }

  const playerBet = (playerBet:number) => {
    setGame({...game, pot:game.pot+playerBet, stack:game.stack-playerBet, turn:"villan"})
    setBet({...bet, player:bet.player+playerBet})
  }

  const playerAllIn = () => {
    setGame({...game, pot:game.pot+game.stack, stack:0, turn:"villan"})
    setBet({...bet, player:bet.player+game.stack})
  }

  const villanCheck = () => {
    setGame({...game, turn:"player"})
    ChangeRound()
  }

  const villanFold = () => {
    preflop()
  }

  const villanCall = () => {
    setGame({...game, pot:game.pot-bet.villan+bet.player, turn:"player"})
    ChangeRound()
  }

  const villanBet = (villanBet:number) => {
    setGame({...game, pot:game.pot+villanBet})
    setBet({...bet, villan:bet.villan+villanBet})
  }

  useEffect(()=>{
    if (game.turn==="villan") {
      if (game.round==="showdown") {
        setTimeout(preflop, 5000)
      } else if (bet.villan===bet.player) {
        setTimeout(villanCheck, 1000)
      } else if (bet.player-bet.villan<300) {
        setTimeout(villanCall, 1000)
      } else {
        setTimeout(villanFold, 1000)
      }
    }
  }, [game.turn])

  const marks = [
    {
      value: Math.round(game.pot/3),
      label: 'pot33%',
    },
    {
      value: Math.round(game.pot/2),
      label: 'pot50%',
    },
    {
      value: Math.round(game.pot*3/4),
      label: 'pot75%',
    },
    {
      value: game.pot,
      label: 'pot100%',
    },
    {
      value: game.pot*3/2,
      label: 'pot150%',
    },
    {
      value: game.pot*2,
      label: 'pot200%',
    },
  ];

  if (game.turn==="villan") {
    return <div style={{height:140}}></div>
  }

  return (
    <Container maxWidth="md"> 
      <Box sx={{ width: 800, mt: 10 }}>
        <Stack direction="row" spacing={2}>
          {(bet.villan-bet.player)>0? 
            <Button variant="contained" color="success" onClick={playerFold}>
              Fold
            </Button>
            :
            <Button variant="contained" color="success" onClick={playerCheck}>
              Check
            </Button>           
          }
          <Button variant="contained" disabled={(bet.villan-bet.player)<=0} onClick={playerCall}>
            Call
            <br/>{bet.villan-bet.player}
          </Button>
          <Slider
            aria-label="Always visible"
            defaultValue={game.bb}
            onChange={handleChange}
            getAriaValueText={valuetext}
            step={1}
            marks={marks}
            min={Math.max(game.bb, (bet.villan-bet.player)*2)}
            max={game.pot*2>game.stack? game.stack:game.pot*2}
            valueLabelDisplay="on"
          />
          <Button variant="contained" color="secondary" onClick={()=>{playerBet(betsize)}}>
            {bet.villan-bet.player>0? "Raise":"Bet"}
            <br/>{betsize}
          </Button>
          <Button variant="contained" color="secondary" onClick={()=>{villanBet(10)}}>
            villan bet 10
          </Button>
          <Button variant="contained" color="error" onClick={playerAllIn}>
            `AllIn
            <br/>{game.stack}
          </Button>
        </Stack>
      </Box>
    </Container>
  )
}