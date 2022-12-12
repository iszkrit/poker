import { Card } from '../types'

var trump : Card[] = []
const suits = ["s", "c", "h", "d"]

for (var i=0; i<suits.length; i++) {
    for (var j=2; j<15; j++) {
        trump.push({suit: suits[i], number:j})
    } 
}

export default trump