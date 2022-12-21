import { atom } from "recoil"
import { Card, Game, Judge, Bet } from '../types'

export const pileAtom = atom<Card[]>({
  key: "pileAtom",
  default: [
    {
      suit: "b",
      number: 2
    },
    {
      suit: "b",
      number: 2
    },
    {
      suit: "b",
      number: 2
    },
    {
      suit: "b",
      number: 2
    },
    {
      suit: "b",
      number: 2
    },
    {
      suit: "b",
      number: 2
    },
    {
      suit: "b",
      number: 2
    },
    {
      suit: "b",
      number: 2
    },
    {
      suit: "b",
      number: 2
    }
  ],
})

export const gameAtom = atom<Game>({
  key: "gameAtom",
  default: {
    round:"default", 
    turn:"player", 
    pot:0, 
    stack:500, 
    bb:10
  },
})

export const judgeAtom = atom<Judge>({
  key: "judgeAtom",
  default: {
    winner : "",
    playerHand : "",
    villanHand : ""
  },
})

export const stackAtom = atom<number>({
  key: "stacksAtom",
  default: 500,
})

export const betAtom = atom<Bet>({
  key: "betAtom",
  default: {
    player : 0,
    villan : 0
  },
})