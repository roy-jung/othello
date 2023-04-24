import { ValueOrEmpty } from '../types'
import Square from './square'

const Row = ({
  cols,
  rowIndex,
  handleClickSquare,
  isOver,
}: {
  cols: ValueOrEmpty[]
  rowIndex: number
  handleClickSquare: (index: number) => void
  isOver: boolean
}) => {
  return (
    <div className="row">
      {cols.map((col, i) => (
        <Square
          value={col}
          key={`${rowIndex}_${i}`}
          handleClickSquare={isOver ? undefined : () => handleClickSquare(rowIndex * 8 + i)}
        />
      ))}
    </div>
  )
}

export default Row
