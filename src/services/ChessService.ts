import { AppState } from '../AppState'
import { IChessPiece } from '../interfaces/IChessPiece'
import { ILog } from '../interfaces/ILog'
import { movesService } from './MovesService'

class ChessService {
  solveBoard(): IChessPiece[] {
    const boardPieces: IChessPiece[] = AppState.boardPieces
    if (AppState.count == 1) {
      return boardPieces
    }

    for (let currentIndex = 0; currentIndex < boardPieces.length; currentIndex++) {
      const newPiece: IChessPiece = boardPieces[currentIndex]

      if (newPiece.name) {
        const moveList: number[] = this.getPieceMoveList(newPiece)

        for (let i = 0; i < moveList.length; i++) {
          const replaceIndex: number = moveList[i]

          if (boardPieces[replaceIndex].name) {
            AppState.logs = [
              {
                currentIndex,
                replaceIndex,
                capture: boardPieces[replaceIndex]
              },
              ...AppState.logs
            ]
            movesService.replacePiece(newPiece, replaceIndex)
            AppState.count--
            this.solveBoard()
            if (AppState.count == 1) {
              return boardPieces
            }
          }
        }
      }
    }

    if (AppState.count > 1) {
      const temp: ILog[] = AppState.logs
      const lastMove: ILog | undefined = temp.shift()
      AppState.logs = temp

      if (!lastMove) {
        throw new Error('This Board Is Unsolvable')
      }
      movesService.replacePiece(boardPieces[lastMove.replaceIndex], lastMove.currentIndex)
      movesService.addPiece(lastMove.capture, lastMove.replaceIndex)
      AppState.count++
    }
    return boardPieces
  }

  getPieceMoveList(piece: IChessPiece): number[] {
    const position: number = piece.id - 1
    if (position < 0 || position > 15) {
      throw new Error('Invalid Index')
    }
    const name = piece.name
    const moveList: number[] = []
    const col: number = position % 4
    const row: number = Math.floor(position / 4)

    if (name == 'Pawn' || name == 'King') {
      // Pawn and King
      for (let i = 0; i < 3; i++) {
        const mid: number = 4 * i + position - 4

        if (mid < 0 || mid > 15 || (i == 1 && name == 'Pawn')) {
          continue
        }
        // Left
        if (mid % 4 != 0) {
          moveList.push(mid - 1)
        }
        // Middle
        if (mid != position && name != 'Pawn') {
          moveList.push(mid)
        }
        // Right
        if (mid % 4 != 3) {
          moveList.push(mid + 1)
        }
      }
    } else {
      // Rook, Knight, Bishop, and Queen
      for (let i = 0; i < 4; i++) {
        const current: number = 4 * i + col
        // Straight Moves
        if (name == 'Rook' || name == 'Queen') {
          // Horizontal
          if (col != i) {
            moveList.push(4 * row + i)
          }
          // Vertical
          if (row != i) {
            moveList.push(current)
          }
        }
        // Diagonal Moves
        if (name == 'Knight' || name == 'Bishop' || name == 'Queen') {
          let dif: number = Math.abs(row - i)
          if (row == i) {
            continue
          }
          // Rework to Knight Moves
          if (name == 'Knight') {
            if (dif > 2) {
              continue
            }
            dif = 3 - dif
          }
          const l: number = current - dif
          // Left
          if (Math.floor(l / 4) == i) {
            moveList.push(l)
          }
          // Right
          const r: number = current + dif
          if (Math.floor(r / 4) == i) {
            moveList.push(r)
          }
        }
      }
    }
    return moveList
  }
}

export const chessService = new ChessService()
