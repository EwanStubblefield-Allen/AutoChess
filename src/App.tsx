import { observer } from 'mobx-react'
import { AppState } from './AppState'
import { chessService } from './services/ChessService'
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
import SortablePiece from './components/sortablePiece'
import Pop from './utils/Pop'
import { movesService } from './services/MovesService'
import { logger } from './utils/Logger'

const App = observer(() => {
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
      movesService.replacePiece(AppState.boardPieces[active.id - 1], over.id - 1)
    }
  }

  function solve() {
    try {
      if (AppState.pieces.length == 0) {
        throw new Error('Add a piece to the board!')
      }
      AppState.logs = []
      chessService.solveBoard()
      logger.log(AppState.logs)
      Pop.success('The Board Was Solved')
    } catch (error: any) {
      Pop.error(error.message)
    }
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
                <SortableContext items={AppState.boardPieces} strategy={rectSwappingStrategy}>
                  {AppState.boardPieces.map(piece => (
                    <SortablePiece key={piece.id} piece={piece} />
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
              {AppState.defaultPieces.map((piece, i) => (
                <div
                  onClick={() => movesService.addPiece(piece, 15)}
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
})

export default App
