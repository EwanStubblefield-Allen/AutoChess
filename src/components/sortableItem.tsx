import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ChessPiece } from '../interfaces/chessPiece'

export default function SortableItem(props: ChessPiece) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.id
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  function tileBackground() {
    let className = 'col-3 d-flex justify-content-center chess-tile'
    let val = 1
    if (props.id <= 4 || (9 <= props.id && props.id <= 12)) {
      val = 0
    }
    if (props.id % 2 == val) {
      className += ' bg-dark'
    }
    return className
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={tileBackground()}>
      {props.tag}
    </div>
  )
}
