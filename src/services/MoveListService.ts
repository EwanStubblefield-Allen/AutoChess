import { IChessPiece } from '../interfaces/IChessPiece'

const boardMatrix: number[][] = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15]
]

class MoveListService {
  getPieceMoveList(piece: IChessPiece): number[] {
    let moveList: number[] = []
    let position: number = piece.id - 1

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

  pawnMoves(position: number): number[] {
    const moveList: number[] = []
    // Top
    if (Math.floor(position / 4) != 0) {
      // Left
      if (position % 4 != 0) {
        moveList.push(position - 5)
      }
      // Right
      if (position % 4 != 3) {
        moveList.push(position - 3)
      }
    }
    // Bottom
    if (Math.floor(position / 4) != 3) {
      // Left
      if (position % 4 != 0) {
        moveList.push(position + 3)
      }
      // Right
      if (position % 4 != 3) {
        moveList.push(position + 5)
      }
    }
    return moveList
  }

  rookMoves(position: number): number[] {
    let moveList: number[] = []
    const vIndex: number = Math.floor(position / 4)
    const hIndex: number = position % 4

    for (let i = 0; i < 4; i++) {
      const rowMoves: number[] = this.straightMoves(i, vIndex, hIndex, position)
      moveList = moveList.concat(rowMoves)
    }
    return moveList
  }

  knightMoves(position: number): number[] {
    const moveList: number[] = []
    const vIndex: number = Math.floor(position / 4)
    const hIndex: number = position % 4

    for (let i = 0; i < 2; i++) {
      // Top
      const tMoves: number[] = boardMatrix[vIndex - i - 1]
      if (tMoves != undefined) {
        // Left
        const tlMove: number = tMoves[hIndex - (2 - i)]
        tlMove != undefined && moveList.push(tlMove)
        // Right
        const trMove: number = tMoves[hIndex + (2 - i)]
        trMove != undefined && moveList.push(trMove)
      }

      // Bottom
      const bMoves: number[] = boardMatrix[vIndex + i + 1]
      if (bMoves != undefined) {
        // Left
        const blMove: number = bMoves[hIndex - (2 - i)]
        blMove != undefined && moveList.push(blMove)
        // Right
        const brMove: number = bMoves[hIndex + (2 - i)]
        brMove != undefined && moveList.push(brMove)
      }
    }
    return moveList
  }

  bishopMoves(position: number): number[] {
    let moveList: number[] = []
    const vIndex: number = Math.floor(position / 4)
    const hIndex: number = position % 4

    for (let i = 0; i < 4; i++) {
      const rowMoves: number[] = this.diagonalMoves(i, vIndex, hIndex)
      if (rowMoves != undefined) {
        moveList = moveList.concat(rowMoves)
      }
    }
    return moveList
  }

  queenMoves(position: number): number[] {
    let moveList: number[] = []
    const vIndex: number = Math.floor(position / 4)
    const hIndex: number = position % 4

    for (let i = 0; i < 4; i++) {
      let rowMoves = this.diagonalMoves(i, vIndex, hIndex)
      if (rowMoves != undefined) {
        moveList = moveList.concat(rowMoves)
      }
      rowMoves = this.straightMoves(i, vIndex, hIndex, position)
      moveList = moveList.concat(rowMoves)
    }
    return moveList
  }

  kingMoves(position: number): number[] {
    const moveList: number[] = []
    const vIndex: number = Math.floor(position / 4)
    const hIndex: number = position % 4

    for (let i = 0; i < 3; i++) {
      const moves: number[] = boardMatrix[vIndex - 1 + i]
      if (moves == undefined) {
        continue
      }
      for (let j = 0; j < 3; j++) {
        const move: number = moves[hIndex - 1 + j]
        if (move != undefined && move != position) {
          moveList.push(move)
        }
      }
    }
    return moveList
  }

  straightMoves(row: number, vIndex: number, hIndex: number, position: number): number[] {
    const moveList: number[] = []
    // Horizontal
    const hMove: number = boardMatrix[vIndex][row]
    if (hMove != position) {
      moveList.push(hMove)
    }
    // Vertical
    const vMove: number = boardMatrix[row][hIndex]
    if (vMove != position) {
      moveList.push(vMove)
    }
    return moveList
  }

  diagonalMoves(row: number, vIndex: number, hIndex: number): number[] {
    const moveList: number[] = []
    if (row == vIndex) {
      return []
    }
    const moves: number[] = boardMatrix[row]
    // Left
    const lMove: number = moves[hIndex - Math.abs(vIndex - row)]
    lMove != undefined && moveList.push(lMove)
    // Right
    const rMove: number = moves[hIndex + Math.abs(vIndex - row)]
    rMove != undefined && moveList.push(rMove)
    return moveList
  }
}

export const moveListService = new MoveListService()
