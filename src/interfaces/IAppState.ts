import { IChessPiece } from './IChessPiece'
import { ILog } from './ILog'

export interface IAppState {
  defaultPieces: IChessPiece[]
  logs: ILog[]
  count: number
}
