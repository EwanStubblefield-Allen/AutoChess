import { action, makeAutoObservable } from 'mobx'
import { isValidProp } from './utils/isValidProp.ts'
import { IAppState } from './interfaces/IAppState.ts'
import {
  mdiChessBishop,
  mdiChessKing,
  mdiChessKnight,
  mdiChessPawn,
  mdiChessQueen,
  mdiChessRook
} from '@mdi/js'
import Icon from '@mdi/react'

export class ObservableAppState implements IAppState {
  constructor() {
    makeAutoObservable(this)
  }

  defaultPieces = [
    { id: 1, name: 'Pawn', tag: <Icon path={mdiChessPawn}></Icon> },
    { id: 2, name: 'Rook', tag: <Icon path={mdiChessRook}></Icon> },
    { id: 3, name: 'Knight', tag: <Icon path={mdiChessKnight}></Icon> },
    { id: 4, name: 'Bishop', tag: <Icon path={mdiChessBishop}></Icon> },
    { id: 5, name: 'Queen', tag: <Icon path={mdiChessQueen}></Icon> },
    { id: 6, name: 'King', tag: <Icon path={mdiChessKing}></Icon> }
  ]
  boardPieces = [
    { id: 1, name: '', tag: <></> },
    { id: 2, name: '', tag: <></> },
    { id: 3, name: '', tag: <></> },
    { id: 4, name: '', tag: <></> },
    { id: 5, name: '', tag: <></> },
    { id: 6, name: '', tag: <></> },
    { id: 7, name: '', tag: <></> },
    { id: 8, name: '', tag: <></> },
    { id: 9, name: '', tag: <></> },
    { id: 10, name: '', tag: <></> },
    { id: 11, name: '', tag: <></> },
    { id: 12, name: '', tag: <></> },
    { id: 13, name: '', tag: <></> },
    { id: 14, name: '', tag: <></> },
    { id: 15, name: '', tag: <></> },
    { id: 16, name: '', tag: <></> }
  ]
  pieces = []
  logs = []
  count = 0
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
