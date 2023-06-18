import { Card, HandRank, Judge } from '../types'
import { rank } from './index' 

export const handJudge = (player:Card[], villan:Card[], board:Card[]):Judge => {
    const hr1:HandRank = rank(player, board)
    const hr2:HandRank = rank(villan, board)
    
    const strength = (hr:HandRank) => {
        let order:number = 8
        let info:number[] = []
        const ranking = ["StraightFlush","Quads","FullHouse","Flush","Straight","Three","TwoPair","OnePair","HighCard"]
        for (var i=0;i<ranking.length;i++) {
            if (hr[ranking[i]].form) {
                order = i
                info = hr[ranking[i]].info
                break;
            }
        }
        return {order : order, info : info, rank : ranking[i]}
    }

    const st1 = strength(hr1)
    const st2 = strength(hr2)

    const judge:Judge = {
        winner : "",
        playerHand : st1.rank,
        villanHand : st2.rank
    }

    if (st1.order<st2.order) {
        judge.winner = "player"
    } else if (st1.order>st2.order) {
        judge.winner = "villan"
    } else {
        for (var i=0;i<st1.info.length;i++) {
            if (st1.info[i]>st2.info[i]) {
                judge.winner = "player"
                break;
            } else if (st1.info[i]<st2.info[i]) {
                judge.winner = "villan"
                break;
            } else {
                ;
            }       
        }  
        judge.winner = ((judge.winner==="")? "chop" : judge.winner)
    }
    return judge
}