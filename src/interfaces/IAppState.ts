import { IChessPiece } from './IChessPiece'
import { ILog } from './ILog'

export interface IAppState {
  defaultPieces: IChessPiece[]
  boardPieces: IChessPiece[]
  pieces: IChessPiece[]
  logs: ILog[]
  count: number
}
