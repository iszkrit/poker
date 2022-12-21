import { Card } from '../types'
import { useRecoilValue } from 'recoil';
import { gameAtom } from '../states/Atoms' 
import b2 from '../assets/trumpImage/b2.png'
import s2 from '../assets/trumpImage/s2.png'
import s3 from '../assets/trumpImage/s3.png'
import s4 from '../assets/trumpImage/s4.png'
import s5 from '../assets/trumpImage/s5.png'
import s6 from '../assets/trumpImage/s6.png'
import s7 from '../assets/trumpImage/s7.png'
import s8 from '../assets/trumpImage/s8.png'
import s9 from '../assets/trumpImage/s9.png'
import s10 from '../assets/trumpImage/s10.png'
import s11 from '../assets/trumpImage/s11.png'
import s12 from '../assets/trumpImage/s12.png'
import s13 from '../assets/trumpImage/s13.png'
import s14 from '../assets/trumpImage/s14.png'
import c2 from '../assets/trumpImage/c2.png'
import c3 from '../assets/trumpImage/c3.png'
import c4 from '../assets/trumpImage/c4.png'
import c5 from '../assets/trumpImage/c5.png'
import c6 from '../assets/trumpImage/c6.png'
import c7 from '../assets/trumpImage/c7.png'
import c8 from '../assets/trumpImage/c8.png'
import c9 from '../assets/trumpImage/c9.png'
import c10 from '../assets/trumpImage/c10.png'
import c11 from '../assets/trumpImage/c11.png'
import c12 from '../assets/trumpImage/c12.png'
import c13 from '../assets/trumpImage/c13.png'
import c14 from '../assets/trumpImage/c14.png'
import h2 from '../assets/trumpImage/h2.png'
import h3 from '../assets/trumpImage/h3.png'
import h4 from '../assets/trumpImage/h4.png'
import h5 from '../assets/trumpImage/h5.png'
import h6 from '../assets/trumpImage/h6.png'
import h7 from '../assets/trumpImage/h7.png'
import h8 from '../assets/trumpImage/h8.png'
import h9 from '../assets/trumpImage/h9.png'
import h10 from '../assets/trumpImage/h10.png'
import h11 from '../assets/trumpImage/h11.png'
import h12 from '../assets/trumpImage/h12.png'
import h13 from '../assets/trumpImage/h13.png'
import h14 from '../assets/trumpImage/h14.png'
import d2 from '../assets/trumpImage/d2.png'
import d3 from '../assets/trumpImage/d3.png'
import d4 from '../assets/trumpImage/d4.png'
import d5 from '../assets/trumpImage/d5.png'
import d6 from '../assets/trumpImage/d6.png'
import d7 from '../assets/trumpImage/d7.png'
import d8 from '../assets/trumpImage/d8.png'
import d9 from '../assets/trumpImage/d9.png'
import d10 from '../assets/trumpImage/d10.png'
import d11 from '../assets/trumpImage/d11.png'
import d12 from '../assets/trumpImage/d12.png'
import d13 from '../assets/trumpImage/d13.png'
import d14 from '../assets/trumpImage/d14.png'

const image = {
  b : [b2],
  s : [s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14],
  c : [c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14],
  h : [h2,h3,h4,h5,h6,h7,h8,h9,h10,h11,h12,h13,h14],
  d : [d2,d3,d4,d5,d6,d7,d8,d9,d10,d11,d12,d13,d14]
}
export const DisplayBoard = (board:Card[]) => {
  const game = useRecoilValue(gameAtom)
  type key = keyof typeof image

  if (game.round==="flop") {
    return (
      <p> 
        <img src = {image[board[0].suit as key][board[0].number-2]} alt="flop1"/>
        <img src = {image[board[1].suit as key][board[1].number-2]} alt="flop2"/>
        <img src = {image[board[2].suit as key][board[2].number-2]} alt="flop3"/>
      </p> 
    )
  } else if (game.round==="turn") {
    return (
      <p> 
        <img src = {image[board[0].suit as key][board[0].number-2]} alt="flop1"/>
        <img src = {image[board[1].suit as key][board[1].number-2]} alt="flop2"/>
        <img src = {image[board[2].suit as key][board[2].number-2]} alt="flop3"/>
        <img src = {image[board[3].suit as key][board[3].number-2]} alt="turn"/> 
      </p> 
    )
  } else if (["river","showdown"].includes(game.round)) {
    return (
      <p>       
        <img src = {image[board[0].suit as key][board[0].number-2]} alt="flop1"/>
        <img src = {image[board[1].suit as key][board[1].number-2]} alt="flop2"/>
        <img src = {image[board[2].suit as key][board[2].number-2]} alt="flop3"/>
        <img src = {image[board[3].suit as key][board[3].number-2]} alt="turn"/> 
        <img src = {image[board[4].suit as key][board[4].number-2]} alt="river"/>
      </p>
    )
  } else {
    return <div style={{height:145}}></div>
  }
}
