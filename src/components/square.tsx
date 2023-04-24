import classNames from 'classnames'
import { ValueOrEmpty } from '../types'

const Square = ({
  value,
  handleClickSquare,
}: {
  value: ValueOrEmpty
  handleClickSquare: (() => void) | undefined
}) => <div className={classNames('square', value)} onClick={handleClickSquare} />

export default Square
