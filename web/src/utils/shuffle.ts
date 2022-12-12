import { Card } from '../types'

const randomArray = ():number[] => {
    var arr = [...Array(52)].map((_, i) => i + 1)
    var total = arr.length
 
    while (total) {
        var j = Math.floor( Math.random() * total )
        var t = arr[--total]
        arr[total] = arr[j]
        arr[j] = t
    }

    return arr
}

const shuffledCards = (trump:Card[], number:number):Card[] =>  {
    const arr = randomArray()
    const cut = arr.slice(0, number)
    
    var pile = []
    for (var i=0; i<number; i++) {
        pile.push(trump[cut[i]])
    }

    return pile
} 

export default shuffledCards