import { Card, HandRank } from '../types'

export const rank = (hand:Card[], board:Card[]):HandRank => {
      
    const nums = (cards:Card[]) => {
        const nums:number[] = []
        cards.forEach((card)=>{
            nums.push(card.number)
        })
        const sortedNums = nums.sort((a, b) => a - b)
        return sortedNums
    }

    const allCards = hand.concat(board)  
    const n = nums(allCards)
    
    const handRank : HandRank = {
        StraightFlush : {
            form : false,
            info : [5] //[high]
        },
        Quads : {
            form : false,
            info : [0,0] //[four, kicker]
        },
        FullHouse : {
            form : false,
            info : [0,0] //[three, two]
        },
        Flush : {
            form : false,
            info : [0,0,0,0,0] 
        },
        Straight : {
            form : false,
            info : [5] //[high]
        },
        Three : {
            form : false,
            info : [0,0,0] //[three, higher_kicker, lower_kicker]
        },
        TwoPair : {
            form : false,
            info : [0,0,0] //[higher_pair, lower_pair, kicker]
        },
        OnePair : {
            form : false,
            info : [0,0,0,0] //[pair, top_kicker, middle_kicker, bottom_kicker]
        },
        HighCard : {
            form : true,
            info : [0,0,0,0,0] 
        },
    } 
    
    const isFlash = (cards:Card[]) => {
        const suits:string[] = []
        cards.forEach((card)=>{
            suits.push(card.suit)
        })

        let suitCount: {
            [key: string]: number
        } = {}
    
        suits.forEach((suit:string)=>{
            suitCount[suit] = (suitCount[suit] || 0) + 1
        })
    
        for (let suit in suitCount) {
            if (suitCount[suit]>4) {
                handRank.Flush.form = true
                const nums:number[] = []
                const flushCards = cards.filter(card => card.suit === suit)
                flushCards.forEach((card)=>{
                    nums.push(card.number)
                })
                const sort = nums.sort((a,b) => a-b)
                handRank.Flush.info=sort.slice(-5).reverse()

                //  ストフラチェック
                if (sort[0]===2&&sort[1]===3&&sort[2]===4&&sort[3]===5&&sort[sort.length-1]===14) {
                    handRank.StraightFlush.form = true
                }
              
                let seriesCount = 0
                for (var i=0;i<sort.length-1;i++) {
                    seriesCount = (sort[i+1]-sort[i]===1)? (seriesCount+1) : 0
                    if (seriesCount>3) {
                        handRank.StraightFlush.form = true
                        handRank.StraightFlush.info = [sort[i+1]]
                    }
                }
                break;
            }
        }
    }
    
    const isStraight = (nums:number[]) => {
        const uniqueNums = Array.from(new Set(nums))
    
        if (uniqueNums[0]===2&&uniqueNums[1]===3&&uniqueNums[2]===4&&uniqueNums[3]===5&&uniqueNums[uniqueNums.length-1]===14) {
          handRank.Straight.form = true
        }
    
        let seriesCount = 0
        for (var i=0;i<uniqueNums.length-1;i++) {
            seriesCount = (uniqueNums[i+1]-uniqueNums[i]===1)? (seriesCount+1) : 0
            if (seriesCount>3) {
                handRank.Straight.form = true
                handRank.Straight.info = [uniqueNums[i+1]]
            }
        }
    }
    
    const hasPair = (nums:number[]) => {
        const uniqueNums = Array.from(new Set(nums))
    
        // composition[0]:ペアなし, composition[1]:ペア, composition[2]:スリー, composition[3]:フォー
        const composition : number[][] = [[],[],[],[]]
        let count=0
        for (var i=0;i<6;i++) {
            if (nums[i]===nums[i+1]) {
                count++
            } else {
                composition[count].push(nums[i])
                count=0 
            }
        }
        composition[count].push(nums[6])

        // クワッズ
        if (composition[3].length) {
            handRank.Quads.form = true 
            const quads = composition[3][0]
            const newUniqueNums = uniqueNums.filter(n => n !== composition[3][0])
            const kicker = Math.max(...newUniqueNums)
            handRank.Quads.info = [quads,kicker]
        }
    
        // 3:3:1のフルハウス
        if (composition[2].length===2) {
            handRank.FullHouse.form = true
            const three = Math.max(composition[2][0], composition[2][1])
            const two = Math.min(composition[2][0], composition[2][1])
            handRank.FullHouse.info = [three,two]
        }
    
        if (composition[2].length===1) {
            // 3:2:2のフルハウス
            if (composition[1].length===2) {
                handRank.FullHouse.form = true
                const three = composition[2][0]
                const two = Math.max(composition[1][0], composition[1][1])
                handRank.FullHouse.info = [three,two]
            }
            // 3:2:1:1のフルハウス
            if (composition[1].length===1) {
                handRank.FullHouse.form = true
                const three = composition[2][0]
                const two = composition[1][0]
                handRank.FullHouse.info = [three,two]
            }
            // スリーオブアカインド
            handRank.Three.form = true
            const three = composition[2][0]
            const kicker = [composition[0][3], composition[0][2]]
            handRank.Three.info = [three, ...kicker]
        }
    
        // 2:2:2:1 or 2:2:1:1:1のツーペア
        if (composition[1].length>1) {
            handRank.TwoPair.form = true
            const sort = composition[1].sort((a,b) => b-a)        
            let newUniqueNums = uniqueNums
            for (let i of [sort[0], sort[1]]) {
                newUniqueNums = newUniqueNums.filter(n => n !== i)
            }
            const kicker = newUniqueNums[newUniqueNums.length-1]
            handRank.TwoPair.info = [sort[0],sort[1],kicker]
        }
    
        // ワンペア
        if (composition[1].length === 1) {
            handRank.OnePair.form = true
            const pair = composition[1][0]
            const kicker = [composition[0][4], composition[0][3],composition[0][2]]
            handRank.OnePair.info = [pair,...kicker]
        }
    
        // ハイカード
        handRank.HighCard.info = [nums[6], nums[5], nums[4], nums[3], nums[2]]
    }

    isFlash(allCards)
    isStraight(n)
    hasPair(n)
    
    return handRank
}