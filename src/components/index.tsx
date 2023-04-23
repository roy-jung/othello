import { useState } from 'react'
import Row from './row'
import getFlipTargets from '../dicision'
import { SquareValue, ValueOrEmpty } from '../types'

const getInitialValue = () => {
  const res: ValueOrEmpty[][] = Array.from({ length: 8 }, () =>
    Array.from({ length: 8 }, () => undefined),
  )
  res[3][3] = '⚫️'
  res[4][4] = '⚫️'
  res[3][4] = '⚪️'
  res[4][3] = '⚪️'
  return res
}

const Othello = () => {
  const [turn, setTurn] = useState<SquareValue>('⚫️')
  const [board, setBoard] = useState<ValueOrEmpty[][]>(getInitialValue)

  const handleClickSquare = (index: number) => {
    const [row, col] = [Math.floor(index / 8), index % 8]
    const flipTargets = !board[row][col] && getFlipTargets(board, { row, col }, turn)
    if (!flipTargets || !flipTargets.length) {
      alert('그 곳엔 둘 수 없어요...ㅠ')
      return
    }

    setBoard(prev => {
      const res = prev.map(r => [...r])
      flipTargets.forEach(([r, c]) => {
        res[r][c] = turn
      })
      res[row][col] = turn
      return res
    })
    setTurn(prev => (prev === '⚪️' ? '⚫️' : '⚪️'))
  }

  return (
    <div className="othello">
      <div className="current">TURN: {turn}</div>
      <div className="board">
        {board.map((row, i) => (
          <Row cols={row} rowIndex={i} key={i} handleClickSquare={handleClickSquare} />
        ))}
      </div>
    </div>
  )
}

export default Othello
