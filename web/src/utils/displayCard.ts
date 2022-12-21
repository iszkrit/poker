import { Card } from '../types'

const keys = ["10","11","12","13","14","s","c","h","d"];
const reps = ["T","J","Q","K","A","♠︎","♣︎","❤︎","♦︎"];

export const displayCard = (cards:Card[]):string => {
  let stringCards=""
  cards.forEach((card:Card)=>{
    stringCards += `[${card.suit+card.number}]`
    for (let i=0;i<keys.length;i++) {
      stringCards = stringCards.replace(keys[i], reps[i]);
    }
  })
  return stringCards
}