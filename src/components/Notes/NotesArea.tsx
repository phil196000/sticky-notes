import { useState } from "react";
import "./style.css";
import NoteCard from "../NoteCard/NoteCard";
import { useNotesContext } from "../../context/NotesContext";
import Delete from "../Delete/Delete";

const NotesArea = () => {
    const notesContext = useNotesContext();
    const [deleteID, setDeleteID] = useState<string | null>(null);

    const addNote = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!notesContext?.disableAdd) {
            e.preventDefault()
            e.stopPropagation()
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            const finalColor = "#" + randomColor;
            notesContext?.addNote({
                id: Date.now().toString(),
                positionLeft: e.clientX + 'px',
                positionTop: e.clientY + 'px',
                text: "",
                bgColor: finalColor,
            });
        }

    }

    return (
        <div className="main-container">
            <div
                className="notes-area"
                onClick={addNote}
            >
                <div className="cards-area">
                    {notesContext?.notes.map((value, index) => {
                        //TODO check on color of text for card
                        return (
                            <NoteCard
                                index={index}
                                note={value}
                                drag={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation()
                                    setDeleteID(value.id);
                                }}
                                key={index}
                            />
                        );
                    })}
                </div>
                <span className="placeholder">+ Click any area to add Notes</span>
            </div>
            <Delete id={deleteID ?? ""} />
        </div>
    );
};

export default NotesArea;
