import { FC, useEffect, useRef, useState } from "react";
import { Note, useNotesContext } from "../../context/NotesContext";
import "./style.css";

type Props = {
    drag: (e: React.DragEvent<HTMLDivElement>) => void;
    note: Note;
    index: number;
};

const NoteCard: FC<Props> = ({ drag, note, index }: Props) => {
    const noteContext = useNotesContext();
    const noteCardRef = useRef<HTMLDivElement>(null);
    // const [pos1, setPos1] = useState(0);
    // const [pos2, setPos2] = useState(0);
    // const [pos3, setPos3] = useState(0);
    // const [pos4, setPos4] = useState(0);
    const [value, setValue] = useState("");
    const [edit, setEdit] = useState(true);

    useEffect(() => {
        setEdit(note.text.length < 1);
        setValue(note.text);
    }, [note.text]);

    // const dragMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //     e = e || window.event;
    //     e.preventDefault();
    //     // get the mouse cursor position at startup:
    //     console.log("mouse drag down ooo", e.clientX, e.clientY);
    //     setPos3(e.clientX);
    //     setPos4(e.clientY);
    //     document.onmouseup = closeDragElement;
    //     // call a function whenever the cursor moves:
    //     document.onmousemove = elementDrag;
    // };

    // const elementDrag = (e: MouseEvent) => {
    //     e = e || window.event;
    //     e.preventDefault();
    //     // calculate the new cursor position:
    //     setPos1(pos3 - e.clientX);
    //     setPos2(pos4 - e.clientY);
    //     setPos3(e.clientX);
    //     setPos4(e.clientY);
    //     // set the element's new position:
    //     if (noteCardRef.current) {
    //         console.log("in current ref");
    //         noteCardRef.current.style.top =
    //             noteCardRef?.current?.offsetTop - pos2 + "px";
    //         noteCardRef.current.style.left =
    //             noteCardRef.current.offsetLeft - pos1 + "px";
    //     }
    // };

    // const closeDragElement = () => {
    //     console.log("drag closed");

    //     // stop moving when mouse button is released:
    //     document.onmouseup = null;
    //     document.onmousemove = null;
    // };

    return (
        <div
            onFocus={() => {
                console.log(note.text);
            }}
            onBlur={() => {
                console.log("lost", note.text);
            }}
            style={{
                top: note.positionTop,
                left: note.positionLeft,
                backgroundColor: note.bgColor,
                zIndex: index + 1,
            }}
            onDrag={drag}
            draggable={true}
            ref={noteCardRef}
            className="note-card"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
            }}
        // onMouseDown={dragMouseDown} for dragging item
        >
            <div className="title-container">
                <span
                    onClick={() => {
                        noteContext?.changeItemPostion(note);
                    }}
                    className="material-symbols-outlined"
                >
                    flip_to_front
                </span>
                <h4>Note {index + 1}</h4>
                <span
                    onClick={(e) => {
                        e.stopPropagation();
                        setEdit(!edit);
                    }}
                    className="material-symbols-outlined edit"
                >
                    {edit ? "close" : "edit"}
                </span>
            </div>

            <textarea
                disabled={!edit}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                onFocus={(e: React.FocusEvent<HTMLTextAreaElement>) => {
                    e.stopPropagation();
                }}
                rows={5}
                name="text"
                placeholder="Enter text"
            ></textarea>

            {edit && (
                <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        noteContext?.addNote({
                            ...note,
                            text: value,
                        });
                        setEdit(false);
                    }}
                >
                    Save
                </button>
            )}
        </div>
    );
};

export default NoteCard;
