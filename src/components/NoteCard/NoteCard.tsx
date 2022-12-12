import { createRef, FC, useEffect, useRef, useState } from "react";
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
    const pos3 = useRef<number>(0);
    const pos4 = useRef<number>(0);

    const [value, setValue] = useState("");
    const [edit, setEdit] = useState(true);

    useEffect(() => {
        setEdit(note.text.length < 1);
        setValue(note.text);
    }, [note.text]);

    const dragMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        noteContext?.updateDisabledAdd();
        e.preventDefault();
        e.stopPropagation();

        pos3.current = e.clientX;
        pos4.current = e.clientY;

        document.onmouseup = closeDragElement;
        // // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    };

    const elementDrag = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (noteCardRef.current) {
            noteCardRef.current.style.top = e.clientY + "px";
            noteCardRef.current.style.left = e.clientX + "px";
        }
    };

    const closeDragElement = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        if (noteCardRef.current) {
            noteContext?.addNote({
                ...note,
                positionLeft: noteCardRef?.current?.style?.left,
                positionTop: noteCardRef?.current?.style?.top,
            });
        }

        noteContext?.updateDisabledAdd();
    };

    return (
        <div
            style={{
                top: note.positionTop,
                left: note.positionLeft,
                backgroundColor: note.bgColor,
                zIndex: index + 1,
            }}
            draggable={true}
            onDrag={drag}
            ref={noteCardRef}
            className="note-card"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
                noteContext?.changeItemPostion(note);
            }}
        >
            <div
                className="title-container"
                onMouseDown={dragMouseDown} // for dragging item
            >
                <div />
                <h4>Note</h4>
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
            <p>Drag from here into trash to delete</p>
        </div>
    );
};

export default NoteCard;
