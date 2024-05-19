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
import { logger } from './utils/Logger'

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
    { id: 1, tag: null },
    { id: 2, tag: null },
    { id: 3, tag: null },
    { id: 4, tag: null },
    { id: 5, tag: null },
    { id: 6, tag: null },
    { id: 7, tag: null },
    { id: 8, tag: null },
    { id: 9, tag: null },
    { id: 10, tag: null },
    { id: 11, tag: null },
    { id: 12, tag: null },
    { id: 13, tag: null },
    { id: 14, tag: null },
    { id: 15, tag: null },
    { id: 16, tag: null }
  ])
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0.01
      }
    }),
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

  function removePiece(index: number) {
    logger.log('remove')
    setBoardPieces(pieces => {
      const temp = [...pieces]
      temp[index].tag = null
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
                    <SortableItem key={piece.id} piece={piece} removePiece={removePiece} />
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
                    i % 2 == 1
                      ? 'col-2 d-flex chess-tile selectable bg-dark'
                      : 'col-2 d-flex chess-tile selectable'
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
