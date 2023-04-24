import { useEffect, useRef, useState } from 'react'
import Row from './row'
import { getFlipTargets, getGameInfo } from '../dicision'
import { SquareValue, ValueOrEmpty } from '../types'

const getInitialValue = () => {
  const res: ValueOrEmpty[][] = Array.from({ length: 8 }, () =>
    Array.from({ length: 8 }, () => undefined),
  )
  res[3][3] = 'black'
  res[4][4] = 'black'
  res[3][4] = 'white'
  res[4][3] = 'white'
  return res
}

const Othello = () => {
  const [turn, setTurn] = useState<SquareValue>('black')
  const [board, setBoard] = useState<ValueOrEmpty[][]>(getInitialValue)
  const [counts, setCounts] = useState([0, 0])
  const [isOver, setIsOver] = useState(false)
  const turnoverRef = useRef<number>(0)

  const handleClickSquare = (index: number) => {
    const [row, col] = [Math.floor(index / 8), index % 8]
    const flipTargets = !board[row][col] && getFlipTargets(board, turn, { row, col })
    if (!flipTargets || !flipTargets.length) {
      alert('그 곳엔 둘 수 없어요...ㅠ')
      return
    }

    setBoard(prev => {
      const newBoard = prev.map(r => [...r])
      flipTargets.forEach(([r, c]) => {
        newBoard[r][c] = turn
      })
      newBoard[row][col] = turn
      return newBoard
    })
    setTurn(prev => (prev === 'white' ? 'black' : 'white'))
  }

  useEffect(() => {
    const { white, black, empty, available } = getGameInfo(board, turn)
    setCounts([white, black])

    if (!available) {
      if (!white || !black || !empty.length) {
        alert(`GAME OVER - winner: ${white > black ? '⚪️' : '⚫️'}`)
        setIsOver(true)
      } else {
        alert('둘 곳이 없어 상대에게 턴을 넘깁니다.')
        turnoverRef.current += 1
        setTurn(prev => (prev === 'white' ? 'black' : 'white'))
      }
    } else {
      turnoverRef.current = 0
    }
  }, [board, turn])

  return (
    <div className="othello">
      <div className="current">
        <div>차례: {turn === 'white' ? '⚪️' : '⚫️'}</div>
        <div>
          ⚪️ {counts[0]} : {counts[1]} ⚫️
        </div>
      </div>
      <div className="board">
        {board.map((row, i) => (
          <Row
            cols={row}
            rowIndex={i}
            key={i}
            handleClickSquare={handleClickSquare}
            isOver={isOver}
          />
        ))}
      </div>
    </div>
  )
}

export default Othello
