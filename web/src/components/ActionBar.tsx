import { useRecoilState } from 'recoil'
import { gameAtom, betAtom } from '../states/Atoms'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import { CheckButton } from '../components/index' 

function valuetext(value: number) {
  return `${value}bet`;
}

export const ActionBar = () => {
  const [game, setGame] = useRecoilState(gameAtom)
  const [bet, setBet] = useRecoilState(betAtom)
  const playerBet = (playerBet:number) => {
    setGame({...game, pot:game.pot+=playerBet, stack:game.stack-playerBet})
    setBet({...bet, player:bet.player+playerBet})
  }
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
  return (
    <Container maxWidth="sm">
      <Box sx={{ width: 800, mt: 10 }}>
        <Stack direction="row" spacing={2}>
          <CheckButton/>
          <Button variant="contained">
            Call{("gap")}
          </Button>
          <Slider
            aria-label="Always visible"
            defaultValue={game.bb}
            getAriaValueText={valuetext}
            step={1}
            marks={marks}
            min={game.bb}
            max={game.pot*2>game.stack? game.stack:game.pot*2}
            valueLabelDisplay="on"
          />
          <Button variant="contained" color="secondary" onClick={()=>{playerBet(10)}}>
            Raise/Bet
          </Button>
          <Button variant="contained" color="error">
            AllIn({game.stack})
          </Button>
        </Stack>
      </Box>
    </Container>
  )
}