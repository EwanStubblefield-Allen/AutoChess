import { useState } from 'react'
import { IChessPiece } from './interfaces/IChessPiece'
import { AppState } from './AppState'
import { moveListService } from './services/MoveListService'
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
import SortableItem from './components/sortableItem'
import Pop from './utils/Pop'
import { logger } from './utils/Logger'

export default function App() {
  const [boardPieces, setBoardPieces] = useState<IChessPiece[]>([
    { id: 1, name: '', tag: <></> },
    { id: 2, name: '', tag: <></> },
    { id: 3, name: '', tag: <></> },
    { id: 4, name: '', tag: <></> },
    { id: 5, name: '', tag: <></> },
    { id: 6, name: '', tag: <></> },
    { id: 7, name: '', tag: <></> },
    { id: 8, name: '', tag: <></> },
    { id: 9, name: '', tag: <></> },
    { id: 10, name: '', tag: <></> },
    { id: 11, name: '', tag: <></> },
    { id: 12, name: '', tag: <></> },
    { id: 13, name: '', tag: <></> },
    { id: 14, name: '', tag: <></> },
    { id: 15, name: '', tag: <></> },
    { id: 16, name: '', tag: <></> }
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
      setBoardPieces(pieces => {
        const oldIndex = active.id - 1
        const newIndex = over.id - 1
        const temp = [...pieces]
        temp[oldIndex].id = over.id
        temp[newIndex].id = active.id
        ;[temp[oldIndex], temp[newIndex]] = [temp[newIndex], temp[oldIndex]]
        return temp
      })
    }
  }

  function solve() {
    const foundPiece = boardPieces.find(p => p.name)
    if (!foundPiece) {
      return Pop.error('Add a piece to the board!')
    }
    const moveList = moveListService.getPiece(foundPiece)
    logger.log(moveList)
  }

  function addPiece(piece: IChessPiece) {
    setBoardPieces(pieces => {
      const temp = [...pieces]
      temp[15].name = piece.name
      temp[15].tag = piece.tag
      return temp
    })
  }

  function removePiece(index: number) {
    setBoardPieces(pieces => {
      const temp = [...pieces]
      temp[index].name = ''
      temp[index].tag = <></>
      return temp
    })
  }

  return (
    <>
      <header className="pt-4 text-center">
        <button onClick={() => solve()} className="btn btn-primary">
          Start
        </button>
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
              {AppState.defaultPieces.map((piece: IChessPiece, i: number) => (
                <div
                  onClick={() => addPiece(piece)}
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
