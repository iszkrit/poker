export type Game = {
  board: string,
  round: string
}

export type Card = {
  suit : string, 
  number : number
}

export type Judge = {
  winner : string,
  playerHand : string,
  opponentHand : string
}

export interface HandRank {
  StraightFlush : {
      form : boolean,
      info : number[]
  },
  Quads : {
      form : boolean,
      info : number[]
  },
  FullHouse : {
      form : boolean,
      info : number[]
  },
  Flush : {
      form : boolean,
      info : number[]
  },
  Straight : {
      form : boolean,
      info : number[]
  },
  Three : {
      form : boolean,
      info : number[]
  },
  TwoPair : {
      form : boolean,
      info : number[]
  },
  OnePair : {
      form : boolean,
      info : number[]
  },
  HighCard : {
      form : boolean,
      info : number[]
  },
  [key: string]: {
    form : boolean,
    info : number[]
  }
} 