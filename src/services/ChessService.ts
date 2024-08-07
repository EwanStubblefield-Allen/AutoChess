import { AppState } from '../AppState'
import { IChessPiece } from '../interfaces/IChessPiece'
import { movesService } from './MovesService'

let board: IChessPiece[]
let grid: number
let col: number
let row: number

class ChessService {
  solveBoard(): void {
    const pieceCount = AppState.pieces.length
    if (pieceCount == 1) {
      return
    }
    board = AppState.boardPieces
    grid = Math.sqrt(board.length)
    for (let i = 0; i < pieceCount; i++) {
      const currentIndex = AppState.pieces[i].id - 1
      const moves = this.getPieceMoveList(currentIndex)

      for (let replaceIndex of moves) {
        movesService.replacePiece(currentIndex, replaceIndex)
        this.solveBoard()

        if (pieceCount != AppState.pieces.length) {
          return
        }
      }
    }

    if (pieceCount > 1) {
      const temp = AppState.logs
      const lastMove = temp.pop()
      AppState.logs = temp

      if (!lastMove) {
        throw new Error('This Board Is Unsolvable')
      }
      const { currentIndex, replaceIndex, capture } = lastMove
      movesService.replacePiece(replaceIndex, currentIndex)
      movesService.addPiece(capture, replaceIndex)
    }
  }

  getPieceMoveList(position: number): number[] {
    let moveList: number[] = []
    col = position % grid
    row = Math.floor(position / grid)

    switch (board[position].name) {
      case 'Pawn':
        if (row > 0) {
          // Top Left Position
          if (board[position - 5].name) {
            moveList.push(position - 5)
          }
          // Top Right Position
          if (board[position - 3].name) {
            moveList.push(position - 3)
          }
        }
        break
      case 'Rook':
        moveList = this.getStraightMoves(position)
        break
      case 'Knight':
        for (let i = -2; i <= 2; i++) {
          if (!i) {
            continue
          }
          const dif = 3 - Math.abs(i)
          const curRow = row + i
          const m = grid * curRow + col
          // Left Position
          const l = m - dif
          if (board[l].name && Math.floor(l / grid) == curRow) {
            moveList.push(l)
          }
          // Right Position
          const r = m + dif
          if (board[r].name && Math.floor(r / grid) == curRow) {
            moveList.push(r)
          }
        }
        break
      case 'Bishop':
        moveList = this.getDiagonalMoves(moveList)
        break
      case 'Queen':
        moveList = this.getStraightMoves(position)
        moveList = this.getDiagonalMoves(moveList)
        break
      case 'King':
        for (let i = -1; i <= 1; i++) {
          // Current Middle Position
          const m = grid * (row + i) + col

          if (m < 0 || m > board.length - 1) {
            continue
          }
          // Left Position
          if (board[m - 1].name && m % grid != 0) {
            moveList.push(m - 1)
          }
          // Middle Position
          if (board[m].name && m != position) {
            moveList.push(m)
          }
          // Left Position
          if (board[m + 1].name && m % grid != grid - 1) {
            moveList.push(m + 1)
          }
        }
        break
    }
    return moveList
  }

  getStraightMoves(position: number): number[] {
    const moveList: number[] = []
    // Horizontal
    for (let i = 0; i < 2; i++) {
      for (let j = 1; j < grid; j++) {
        // Left Position
        let cur = position - j
        // Right Position
        if (i == 1) {
          cur = position + j
        }
        // Current Column is Out of Bounds
        if (Math.floor(cur / grid) != row) {
          break
        }

        if (board[cur].name) {
          moveList.push(cur)
          break
        }
      }
    }
    // Vertical
    for (let i = 0; i < 2; i++) {
      for (let j = 1; j < grid; j++) {
        // Top Row
        let curRow = row - j
        // Bottom Row
        if (i == 1) {
          curRow = row + j
        }
        // Row is Out of Bounds
        if (curRow < 0 || curRow > grid - 1) {
          break
        }
        // Current Position
        const cur = grid * curRow + col
        // Current Column is Out of Bounds
        if (Math.floor(cur / grid) != curRow) {
          break
        }

        if (board[cur].name) {
          moveList.push(cur)
          break
        }
      }
    }
    return moveList
  }

  getDiagonalMoves(moveList: number[]): number[] {
    for (let i = 0; i < 4; i++) {
      for (let j = 1; j < grid; j++) {
        // Top Position
        let curRow = row - j
        // Bottom Position
        if (i > 1) {
          curRow = row + j
        }
        // Row is Out of Bounds
        if (curRow < 0 || curRow > grid - 1) {
          break
        }
        // Current Column
        const curCol = grid * curRow + col
        // Left Diagonal
        let cur = curCol - j
        // Right Diagonal
        if (i % 2 == 1) {
          cur = curCol + j
        }
        // Current Column is Out of Bounds
        if (Math.floor(cur / grid) != curRow) {
          break
        }

        if (board[cur].name) {
          moveList.push(cur)
          break
        }
      }
    }
    return moveList
  }
}

export const chessService = new ChessService()
