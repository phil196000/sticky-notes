import { useEffect, useRef, useState } from 'react'
import './style.css'

type Props = {}

const NoteCard = (props: Props) => {
    const noteCardRef = useRef<HTMLDivElement>(null)
    const [pos1, setPos1] = useState(0);
    const [pos2, setPos2] = useState(0);
    const [pos3, setPos3] = useState(0);
    const [pos4, setPos4] = useState(0);
    useEffect(() => {
        console.log('pos1', pos1, 'pos2', pos2, 'pos3', pos3, 'pos4', pos4, ':::ref:::', noteCardRef.current?.style.top, noteCardRef.current?.style.left);

    }, [pos1, pos2, pos3, pos4])

    const dragMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        console.log('mouse drag down ooo', e.clientX, e.clientY);
        setPos3(e.clientX)
        setPos4(e.clientY)
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    const elementDrag = (e: MouseEvent) => {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        setPos1(pos3 - e.clientX);
        setPos2(pos4 - e.clientY);
        setPos3(e.clientX)
        setPos4(e.clientY)
        // set the element's new position:
        if (noteCardRef.current) {
            console.log('in current ref');
            noteCardRef.current.style.top = (noteCardRef?.current?.offsetTop - pos2) + "px";
            noteCardRef.current.style.left = (noteCardRef.current.offsetLeft - pos1) + "px";
        }

    }

    const closeDragElement = () => {
        console.log('drag closed');

        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
    return (
        <div ref={noteCardRef} className='note-card' onMouseDown={dragMouseDown}>
            <span className="material-symbols-outlined edit">
                edit
            </span>

            <textarea rows={5} name="text" placeholder="Enter text"></textarea>


        </div >
    )
}

export default NoteCard