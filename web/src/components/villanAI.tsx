export const villanAI = (playerBet:number, villanBet:number, villanStack:number) => {
  return {
    pb : playerBet,
    vb : Math.min(playerBet, villanBet+villanStack),
    vs : Math.max(villanStack-playerBet+villanBet, 0),
  }
//   const raise = playerBet-villanBet
//   return {
//     pb : playerBet,
//     vb : Math.min(playerBet+raise, villanBet+villanStack),
//     vs : Math.max(villanStack-playerBet+villanBet-raise, 0),
//   }
}