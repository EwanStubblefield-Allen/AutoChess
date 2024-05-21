import { IChessPiece } from '../interfaces/IChessPiece'

const boardMatrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16]
]

class MoveListService {
  getPiece(piece: IChessPiece) {
    let moveList: number[] = []
    let position = piece.id

    switch (piece.name) {
      case 'Pawn':
        moveList = this.pawnMoves(position)
        break
      case 'Rook':
        moveList = this.rookMoves(position)
        break
      case 'Knight':
        moveList = this.knightMoves(position)
        break
      case 'Bishop':
        moveList = this.bishopMoves(position)
        break
      case 'Queen':
        moveList = this.queenMoves(position)
        break
      case 'King':
        moveList = this.kingMoves(position)
        break
    }
    return moveList
  }

  pawnMoves(position: number) {
    const moveList: number[] = []
    // Top
    if (Math.ceil(position / 4) != 1) {
      // Left
      if (position % 4 != 1) {
        moveList.push(position - 5)
      }
      // Right
      if (position % 4 != 0) {
        moveList.push(position - 3)
      }
    }
    // Bottom
    if (Math.ceil(position / 4) != 4) {
      // Left
      if (position % 4 != 1) {
        moveList.push(position + 3)
      }
      // Right
      if (position % 4 != 0) {
        moveList.push(position + 5)
      }
    }
    return moveList
  }

  rookMoves(position: number) {
    let moveList: number[] = []
    const vIndex = Math.ceil(position / 4) - 1
    const hIndex = (position - 1) % 4

    for (let i = 0; i < 4; i++) {
      const rowMoves = this.straightMoves(i, vIndex, hIndex, position)
      moveList = moveList.concat(rowMoves)
    }
    return moveList
  }

  knightMoves(position: number) {
    const moveList: number[] = []
    const vIndex = Math.ceil(position / 4) - 1
    const hIndex = (position - 1) % 4

    for (let i = 0; i < 2; i++) {
      // Top
      const tMoves = boardMatrix[vIndex - i - 1]
      if (tMoves) {
        // Left
        const tlMove = tMoves[hIndex - (2 - i)]
        tlMove && moveList.push(tlMove)
        // Right
        const trMove = tMoves[hIndex + (2 - i)]
        trMove && moveList.push(trMove)
      }

      // Bottom
      const bMoves = boardMatrix[vIndex + i + 1]
      if (bMoves) {
        // Left
        const blMove = bMoves[hIndex - (2 - i)]
        blMove && moveList.push(blMove)
        // Right
        const brMove = bMoves[hIndex + (2 - i)]
        brMove && moveList.push(brMove)
      }
    }
    return moveList
  }

  bishopMoves(position: number) {
    let moveList: number[] = []
    const vIndex = Math.ceil(position / 4) - 1
    const hIndex = (position - 1) % 4

    for (let i = 0; i < 4; i++) {
      const rowMoves = this.diagonalMoves(i, vIndex, hIndex)
      if (rowMoves) {
        moveList = moveList.concat(rowMoves)
      }
    }
    return moveList
  }

  queenMoves(position: number) {
    let moveList: number[] = []
    const vIndex = Math.ceil(position / 4) - 1
    const hIndex = (position - 1) % 4

    for (let i = 0; i < 4; i++) {
      let rowMoves = this.diagonalMoves(i, vIndex, hIndex)
      if (rowMoves) {
        moveList = moveList.concat(rowMoves)
      }
      rowMoves = this.straightMoves(i, vIndex, hIndex, position)
      moveList = moveList.concat(rowMoves)
    }
    return moveList
  }

  kingMoves(position: number) {
    const moveList: number[] = []
    const vIndex = Math.ceil(position / 4) - 1
    const hIndex = (position - 1) % 4

    for (let i = 0; i < 3; i++) {
      const moves = boardMatrix[vIndex - 1 + i]
      if (!moves) {
        continue
      }
      for (let j = 0; j < 3; j++) {
        const move = moves[hIndex - 1 + j]
        if (move && move != position) {
          moveList.push(move)
        }
      }
    }
    return moveList
  }

  straightMoves(row: number, vIndex: number, hIndex: number, position: number) {
    const moveList = []
    // Horizontal
    const hMove = boardMatrix[vIndex][row]
    if (hMove != position) {
      moveList.push(hMove)
    }
    // Vertical
    const vMove = boardMatrix[row][hIndex]
    if (vMove != position) {
      moveList.push(vMove)
    }
    return moveList
  }

  diagonalMoves(row: number, vIndex: number, hIndex: number) {
    const moveList = []
    if (row == vIndex) {
      return
    }
    const moves = boardMatrix[row]
    // Left
    const lMove = moves[hIndex - Math.abs(vIndex - row)]
    lMove && moveList.push(lMove)
    // Right
    const rMove = moves[hIndex + Math.abs(vIndex - row)]
    rMove && moveList.push(rMove)
    return moveList
  }
}

export const moveListService = new MoveListService()
