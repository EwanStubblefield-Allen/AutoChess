import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { IChessPiece } from '../interfaces/IChessPiece'
import { movesService } from '../services/MovesService'
import { mdiClose } from '@mdi/js'
import Icon from '@mdi/react'

export default function SortablePiece({ piece }: { piece: IChessPiece }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: piece.id
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  function tileBackground() {
    let className = 'col-3 d-flex flex-column px-0 chess-tile position-relative'
    let val = 1
    if (piece.id <= 4 || (9 <= piece.id && piece.id <= 12)) {
      val = 0
    }
    if (piece.id % 2 == val) {
      className += ' bg-dark'
    }
    return className
  }

  function removePieceIcon() {
    if (Object.keys(piece.tag.props).length) {
      return (
        <button
          type="button"
          onClick={() => {
            movesService.removePiece(piece.id - 1)
          }}
          className="d-flex position-absolute end-0 selectable rounded"
          style={{ all: 'unset' }}>
          <Icon path={mdiClose} size={0.75}></Icon>
        </button>
      )
    }
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={tileBackground()}>
      {removePieceIcon()}
      {piece.tag}
      <p className="position-absolute">{piece.id - 1}</p>
    </div>
  )
}
