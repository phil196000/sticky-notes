import { FC } from 'react'
import { useNotesContext } from '../../context/NotesContext'
import './style.css'
type Props = {
  id: string
}

const Delete: FC<Props> = ({ id }: Props) => {
  const notesContext = useNotesContext()
  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }
  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    notesContext?.removeNote(id)
  }

  return (
    <div className='delete' onDrop={drop} onDragOver={dragOver}>Delete</div>
  )
}

export default Delete