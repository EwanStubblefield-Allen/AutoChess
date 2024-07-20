import React from 'react'
import { AppState } from '../AppState'
import { IChessPiece } from '../interfaces/IChessPiece'

class MovesService {
  replacePiece(currentIndex: number, replaceIndex: number): void {
    const captor = AppState.boardPieces[currentIndex]
    const capture = AppState.boardPieces[replaceIndex]
    if (capture.name) {
      AppState.logs = [
        ...AppState.logs,
        {
          currentIndex,
          replaceIndex,
          capture,
          captor
        }
      ]
    }
    this.addPiece(captor, replaceIndex)
    this.removePiece(captor.id - 1)
  }

  addPiece(piece: IChessPiece, index: number): void {
    const temp = [...AppState.boardPieces]
    temp[index] = { id: index + 1, name: piece.name, tag: piece.tag }
    AppState.boardPieces = temp
    AppState.pieces = AppState.boardPieces.filter(piece => piece.name)
  }

  removePiece(index: number): void {
    const temp = [...AppState.boardPieces]
    temp[index] = { id: index + 1, name: '', tag: React.createElement(React.Fragment) }
    AppState.boardPieces = temp
    AppState.pieces = AppState.boardPieces.filter(piece => piece.name)
  }
}

export const movesService = new MovesService()
