import Icon from '@mdi/react'
import './assets/App.css'
import {
  mdiChessBishop,
  mdiChessKing,
  mdiChessKnight,
  mdiChessPawn,
  mdiChessQueen,
  mdiChessRook
} from '@mdi/js'
import { useState } from 'react'
import { ChessPiece } from './interfaces/chessPiece'

function App() {
  const [defaultPieces, setDefaultPieces] = useState<ChessPiece[]>([
    { name: 'Pawn', tag: <Icon path={mdiChessPawn}></Icon> },
    { name: 'Rook', tag: <Icon path={mdiChessRook}></Icon> },
    { name: 'Knight', tag: <Icon path={mdiChessKnight}></Icon> },
    { name: 'Bishop', tag: <Icon path={mdiChessBishop}></Icon> },
    { name: 'Queen', tag: <Icon path={mdiChessQueen}></Icon> },
    { name: 'King', tag: <Icon path={mdiChessKing}></Icon> }
  ])
  const [boardPieces, setBoardPieces] = useState<ChessPiece[][]>([[]])

  function board() {
    let template = []
    for (let i = 1; i <= 4; i++) {
      const oddBackground = i % 2 == 1 ? 'bg-dark' : ''
      const evenBackground = i % 2 == 0 ? 'bg-dark' : ''
      template.push(
        <tr key={`row-${i}`}>
          <td className={oddBackground}></td>
          <td className={evenBackground}></td>
          <td className={oddBackground}></td>
          <td className={evenBackground}></td>
        </tr>
      )
    }
    return template
  }

  return (
    <>
      <header className="pt-4 text-center">
        <button className="btn btn-primary">Start</button>
      </header>
      <main className="container-fluid">
        <section className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 d-flex justify-content-center">
            <table className="chess-board">
              <tbody>{board()}</tbody>
            </table>
          </div>
          <div className="col-md-3"></div>
        </section>
      </main>
      <footer className="container-fluid pb-4 fixed-bottom">
        <section className="row justify-content-center">
          <div className="col-8 d-flex justify-content-center">
            <table className="chess-board">
              <tbody>
                <tr>
                  {defaultPieces.map((piece, i) => (
                    <td key={piece.name} className={i % 2 == 1 ? 'bg-dark' : ''}>
                      {piece.tag}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </footer>
    </>
  )
}

export default App
