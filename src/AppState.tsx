import { action, makeAutoObservable } from 'mobx'
import { isValidProp } from './utils/isValidProp.ts'
import { IAppState } from './interfaces/IAppState.ts'
import { IChessPiece } from './interfaces/IChessPiece.ts'
import { ILog } from './interfaces/ILog.ts'
import {
  mdiChessBishop,
  mdiChessKing,
  mdiChessKnight,
  mdiChessPawn,
  mdiChessQueen,
  mdiChessRook
} from '@mdi/js'
import Icon from '@mdi/react'

export class ObservableAppState {
  constructor() {
    makeAutoObservable(this)
  }
  defaultPieces: IChessPiece[] = [
    { id: 1, name: 'Pawn', tag: <Icon path={mdiChessPawn}></Icon> },
    { id: 2, name: 'Rook', tag: <Icon path={mdiChessRook}></Icon> },
    { id: 3, name: 'Knight', tag: <Icon path={mdiChessKnight}></Icon> },
    { id: 4, name: 'Bishop', tag: <Icon path={mdiChessBishop}></Icon> },
    { id: 5, name: 'Queen', tag: <Icon path={mdiChessQueen}></Icon> },
    { id: 6, name: 'King', tag: <Icon path={mdiChessKing}></Icon> }
  ]
  logs: ILog[] = []
  count: number = 0
}

export const AppState = new Proxy<IAppState>(new ObservableAppState(), {
  get(target: any, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target: any, prop, value) {
    isValidProp(target, prop)
    action(() => {
      target[prop] = value
    })()
    return true
  }
})
