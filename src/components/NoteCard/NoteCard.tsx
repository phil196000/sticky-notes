import React from 'react'
import './style.css'

type Props = {}

const NoteCard = (props: Props) => {
    return (
        <div className='note-card'>
            <span className="material-symbols-outlined edit">
                edit
            </span>

            <textarea rows={5} name="text" placeholder="Enter text"></textarea>


        </div >
    )
}

export default NoteCard