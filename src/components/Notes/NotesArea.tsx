import React from 'react'
import './style.css'
import NoteCard from '../NoteCard/NoteCard';
type Props = {}

const NotesArea = (props: Props) => {
    return (
        <div className='notes-area'>
            <div className='cards-area'>
                <NoteCard />
            </div>

            <span>
                +  Click any area to add Notes
            </span>

        </div>
    )
}

export default NotesArea