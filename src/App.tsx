import { ReactElement, useState } from 'react'
import { ChessPiece } from './interfaces/chessPiece'
import Icon from '@mdi/react'
import SortableItem from './components/sortableItem'
import {
  mdiChessBishop,
  mdiChessKing,
  mdiChessKnight,
  mdiChessPawn,
  mdiChessQueen,
  mdiChessRook
} from '@mdi/js'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  SortableContext,
  rectSwappingStrategy,
  sortableKeyboardCoordinates
} from '@dnd-kit/sortable'
import './assets/App.css'

export default function App() {
  const defaultPieces = [
    { id: 'Pawn', tag: <Icon path={mdiChessPawn}></Icon> },
    { id: 'Rook', tag: <Icon path={mdiChessRook}></Icon> },
    { id: 'Knight', tag: <Icon path={mdiChessKnight}></Icon> },
    { id: 'Bishop', tag: <Icon path={mdiChessBishop}></Icon> },
    { id: 'Queen', tag: <Icon path={mdiChessQueen}></Icon> },
    { id: 'King', tag: <Icon path={mdiChessKing}></Icon> }
  ]
  const [boardPieces, setBoardPieces] = useState<ChessPiece[]>([
    { id: 1, tag: <></> },
    { id: 2, tag: <></> },
    { id: 3, tag: <></> },
    { id: 4, tag: <></> },
    { id: 5, tag: <></> },
    { id: 6, tag: <></> },
    { id: 7, tag: <></> },
    { id: 8, tag: <></> },
    { id: 9, tag: <></> },
    { id: 10, tag: <></> },
    { id: 11, tag: <></> },
    { id: 12, tag: <></> },
    { id: 13, tag: <></> },
    { id: 14, tag: <></> },
    { id: 15, tag: <></> },
    { id: 16, tag: <></> }
  ])
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  function handleDragEnd({ active, over }: any) {
    if (active.id !== over.id) {
      setBoardPieces(items => {
        const oldIndex = active.id - 1
        const newIndex = over.id - 1
        const temp = [...items]
        temp[oldIndex].id = over.id
        temp[newIndex].id = active.id
        ;[temp[oldIndex], temp[newIndex]] = [temp[newIndex], temp[oldIndex]]
        return temp
      })
    }
  }

  function addPiece(tag: ReactElement) {
    setBoardPieces(pieces => {
      const temp = [...pieces]
      temp[15].tag = tag
      return temp
    })
  }

  return (
    <>
      <header className="pt-4 text-center">
        <button className="btn btn-primary">Start</button>
      </header>

      <main className="container-fluid">
        <section className="row px-3">
          <div className="col-sm-2 col-md-3 col-lg-4"></div>
          <div className="col-sm-8 col-md-6 col-lg-4">
            <section className="row">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}>
                <SortableContext items={boardPieces} strategy={rectSwappingStrategy}>
                  {boardPieces.map(piece => (
                    <SortableItem key={piece.id} id={piece.id} tag={piece.tag} />
                  ))}
                </SortableContext>
              </DndContext>
            </section>
          </div>
          <div className="col-sm-2 col-md-3 col-lg-4"></div>
        </section>
      </main>

      <footer className="container-fluid pb-4 fixed-bottom">
        <section className="row justify-content-center px-3">
          <div className="col-md-8 d-flex justify-content-center">
            <section className="row">
              {defaultPieces.map((piece, i) => (
                <div
                  onClick={() => addPiece(piece.tag)}
                  key={piece.id}
                  className={
                    i % 2 == 1 ? 'col-2 d-flex chess-tile bg-dark' : 'col-2 d-flex chess-tile'
                  }>
                  {piece.tag}
                </div>
              ))}
            </section>
          </div>
        </section>
      </footer>
    </>
  )
}
