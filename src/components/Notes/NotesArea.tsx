import { useState, useEffect } from 'react'
import './style.css'
import NoteCard from '../NoteCard/NoteCard';
import { useNotesContext } from '../../context/NotesContext';
import Delete from '../Delete/Delete';


const NotesArea = () => {
    const notesContext = useNotesContext()
    const [deleteID, setDeleteID] = useState<string | null>(null)
    return (
        <div className='main-container'>
            <div className='notes-area' onClick={(e) => {
                console.log({
                    id: Date.now().toString(),
                    positionLeft: e.clientX,
                    positionTop: e.clientY,
                    text: '',
                });

                notesContext?.addNote({
                    id: Date.now().toString(),
                    positionLeft: e.clientX,
                    positionTop: e.clientY,
                    text: '',
                })
            }}>
                <div className='cards-area'>
                    {notesContext?.notes.map((value, index) => {
                        return <NoteCard drag={() => {
                            setDeleteID(value.id)
                        }} key={index} />
                    })}
                </div>
                <span>
                    +  Click any area to add Notes
                </span>

            </div>
            <Delete id={deleteID ?? ''} />
        </div>

    )
}

export default NotesArea