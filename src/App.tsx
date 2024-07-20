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
      movesService.replacePiece(active.id - 1, over.id - 1)
    }
  }

  function solve() {
    try {
      if (AppState.pieces.length <= 1) {
        throw new Error('Add more piece to the board!')
      }
      AppState.logs = []
      chessService.solveBoard()
      logger.log(AppState.logs)
      Pop.success('The Board Was Solved')
    } catch (error: any) {
      Pop.error(error.message)
    }
  }

  function clearLogs() {
    AppState.logs = []
  }

  return (
    <div className="container-fluid d-flex flex-column justify-content-between vh-100">
      <main className="row justify-content-around align-content-center">
        <div className="col-sm-8 col-md-3 col-xl-2 p-2">
          <div className="bg-dark rounded logs p-2">
            <div className="d-flex justify-content-between">
              <button onClick={solve} className="btn btn-outline-light">
                Solve
              </button>

              <button onClick={clearLogs} className="btn btn-outline-light">
                Clear List
              </button>
            </div>

            <p className="fs-3 text-decoration-underline">Move List:</p>
            <section className="row mx-2">
              {AppState.logs.map((log, i) => (
                <div key={`log-${i}`} className="col-6 col-md-12 d-flex justify-content-center p-1">
                  {log.captor.tag}
                  <p className="d-flex align-self-center">
                    {String.fromCharCode(
                      (log.replaceIndex % Math.sqrt(AppState.boardPieces.length)) + 97
                    ) + Math.floor(log.replaceIndex / 4 + 1)}
                  </p>
                </div>
              ))}
            </section>
          </div>
        </div>

        <div className="col-sm-8 col-md-6 col-xl-4">
          <section className="row p-2">
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
        <div className="col-md-3 col-xl-2"></div>
      </main>

      <footer className="row justify-content-center p-2">
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
      </footer>
    </div>
  )
})

export default App
