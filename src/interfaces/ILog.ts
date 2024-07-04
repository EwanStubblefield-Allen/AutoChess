import { IChessPiece } from './IChessPiece'

export interface ILog {
  currentIndex: number
  replaceIndex: number
  capture: IChessPiece
}
