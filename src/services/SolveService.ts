import { AppState } from '../AppState'
import { IChessPiece } from '../interfaces/IChessPiece'
import { moveListService } from './MoveListService'

class SolveService {
  solve(boardPieces: IChessPiece[], addPiece: Function, replacePiece: Function): IChessPiece[] {
    if (AppState.count == 1) {
      return boardPieces
    }

    for (let currentIndex = 0; currentIndex < boardPieces.length; currentIndex++) {
      let newPiece = boardPieces[currentIndex]

      if (newPiece.name) {
        let moveList = moveListService.getPieceMoveList(newPiece)

        for (let i = 0; i < moveList.length; i++) {
          let replaceIndex = moveList[i]

          if (boardPieces[replaceIndex].name) {
            AppState.logs = [
              {
                currentIndex,
                replaceIndex,
                capture: boardPieces[replaceIndex]
              },
              ...AppState.logs
            ]
            replacePiece(newPiece, replaceIndex)
            AppState.count--
            boardPieces = this.solve(boardPieces, addPiece, replacePiece)
            if (AppState.count == 1) {
              return boardPieces
            }
          }
        }
      }
    }

    if (AppState.count > 1) {
      let temp = AppState.logs
      let lastMove = temp.shift()
      AppState.logs = temp

      if (!lastMove) {
        throw new Error('This Board Is Unsolvable')
      }
      replacePiece(boardPieces[lastMove.replaceIndex], lastMove.currentIndex)
      addPiece(lastMove.capture, lastMove.replaceIndex)
      AppState.count++
    }
    return boardPieces
  }
}

export const solveService = new SolveService()
