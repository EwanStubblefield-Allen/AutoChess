import React from 'react'
import { AppState } from '../AppState'
import { IChessPiece } from '../interfaces/IChessPiece'

class MovesService {
  replacePiece(newPiece: IChessPiece, replaceIndex: number) {
    this.addPiece(newPiece, replaceIndex)
    this.removePiece(newPiece.id - 1)
  }

  addPiece(piece: IChessPiece, index: number) {
    const temp: IChessPiece[] = [...AppState.boardPieces]
    temp[index] = { id: index + 1, name: piece.name, tag: piece.tag }
    AppState.boardPieces = temp
  }

  removePiece(index: number) {
    const temp: IChessPiece[] = [...AppState.boardPieces]
    temp[index] = { id: index + 1, name: '', tag: React.createElement(React.Fragment) }
    AppState.boardPieces = temp
  }
}

export const movesService = new MovesService()
