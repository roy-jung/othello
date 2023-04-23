import { Position, SquareValue, ValueOrEmpty } from './types'

const filterList = (list: ([number, number] | undefined)[], sourceIndex: number) =>
  [list.slice(0, sourceIndex).filter(v => !!v), list.slice(sourceIndex + 1).filter(v => !!v)] as [
    [number, number][],
    [number, number][],
  ]

const getLineValues = (board: ValueOrEmpty[][], { row: currentRow, col: currentCol }: Position) => [
  filterList(
    board[currentRow].map((_, i) => [currentRow, i]),
    currentCol,
  ), // horizontal
  filterList(
    board.map((_, i) => [i, currentCol]),
    currentRow,
  ), // vertical
  filterList(
    board.map((_, i) => {
      const col = currentCol - currentRow + i
      return col > -1 && col < 8 ? [i, col] : undefined
    }),
    currentRow,
  ), // Diagonal: leftTop - rightbottom
  filterList(
    board.map((_, i) => {
      const col = currentCol + currentRow - i
      return col > -1 && col < 8 ? [i, col] : undefined
    }),
    currentRow,
  ), // Diagonal: rightTop - leftBottom
]

const getFlipLineGetter =
  (board: ValueOrEmpty[][], value: SquareValue) =>
  ([prevLine, nextLine]: [[number, number][], [number, number][]]) => {
    const flipTargets: [number, number][] = []

    const beforeSameLastIndex = prevLine.findLastIndex(([r, c]) => board[r][c] === value)
    const beforeTargets = prevLine.slice(beforeSameLastIndex + 1)
    if (
      beforeSameLastIndex >= 0 &&
      beforeTargets.every(([r, c]) => !!board[r][c] && board[r][c] !== value)
    ) {
      flipTargets.push(...beforeTargets)
    }

    const afterSameFirstIndex = nextLine.findIndex(([r, c]) => board[r][c] === value)
    const afterTargets = nextLine.slice(0, afterSameFirstIndex)
    if (
      afterSameFirstIndex >= 0 &&
      afterTargets.every(([r, c]) => !!board[r][c] && board[r][c] !== value)
    ) {
      flipTargets.push(...afterTargets)
    }

    return flipTargets
  }

const getFlipTargets = (board: ValueOrEmpty[][], position: Position, value: SquareValue) =>
  getLineValues(board, position).map(getFlipLineGetter(board, value)).flat()

export default getFlipTargets
