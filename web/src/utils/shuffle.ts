import { Card } from '../types'
import { trump } from './index' 

const randomArray = ():number[] => {
    var arr = [...Array(52)].map((_, i) => i)
    var total = arr.length
 
    while (total) {
        var j = Math.floor( Math.random() * total )
        var t = arr[--total]
        arr[total] = arr[j]
        arr[j] = t
    }
    return arr
}

export const shuffledCards = (number:number):Card[] =>  {
    const arr = randomArray()
    const cut = arr.slice(0, number)
    const pile = cut.map((c) => {
        return trump[c]
    })
    return pile
} 