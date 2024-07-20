import React from 'react'
import { AppState } from '../AppState'
import { IChessPiece } from '../interfaces/IChessPiece'

class MovesService {
  replacePiece(newPiece: IChessPiece, replaceIndex: number): void {
    this.addPiece(newPiece, replaceIndex)
    this.removePiece(newPiece.id - 1)
  }

  addPiece(piece: IChessPiece, index: number): void {
    const temp = [...AppState.boardPieces]
    temp[index] = { id: index + 1, name: piece.name, tag: piece.tag }
    AppState.boardPieces = temp
    // TODO Change to Binary Search Then Splice?
    AppState.pieces = AppState.boardPieces.filter(piece => piece.name)
  }

  removePiece(index: number): void {
    const temp = [...AppState.boardPieces]
    temp[index] = { id: index + 1, name: '', tag: React.createElement(React.Fragment) }
    AppState.boardPieces = temp
    // TODO Change to Binary Search Then Splice?
    AppState.pieces = AppState.boardPieces.filter(piece => piece.name)
  }
}

export const movesService = new MovesService()
