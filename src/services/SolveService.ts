import { IChessPiece } from '../interfaces/IChessPiece'
import { moveListService } from './MoveListService'
import Pop from '../utils/Pop'

class SolveService {
  solve(boardPieces: IChessPiece[], replacePiece: Function) {
    const foundPieces = boardPieces.filter(p => p.name)

    if (!foundPieces) {
      return Pop.error('Add a piece to the board!')
    }
    let index = 0
    while (foundPieces.length != 1) {
      let newPiece = foundPieces[index]
      const moveList = moveListService.getPieceMoveList(newPiece)
      const foundMove = moveList.find(m => boardPieces[m - 1].name)
      if (!foundMove) {
        index++
        if (index > foundPieces.length - 1) {
          throw new Error('The Board Is Unsolvable')
        }
        continue
      }
      const replaceIndex = boardPieces[foundMove - 1].id - 1
      replacePiece(newPiece, replaceIndex)
      foundPieces.splice(index, 1)
      index = 0
    }
    Pop.success('The Board Was Solved')
  }
}

export const solveService = new SolveService()
