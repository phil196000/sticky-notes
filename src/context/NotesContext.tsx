import { createContext, useContext, useEffect, useState } from "react";

const NotesContext = createContext<Notes | undefined>(undefined);
const useNotesContext = () => useContext(NotesContext);

type Note = {
    id: string;
    text: string;
    positionTop: number;
    positionLeft: number;
};

type Notes = {
    notes: Note[]
    addNote: (value: Note) => void
    removeNote: (id: string) => void
}

type NotesProviderProps = {
    children: React.ReactNode
}

const NotesProvider = ({ children }: NotesProviderProps) => {
    const [notes, setNotes] = useState<Note[]>([])

    useEffect(() => {
        fetchNotes()
    }, [])

    const fetchNotes = () => {
        const data = localStorage.getItem('notes');
        if (data != null) {
            setNotes(JSON.parse(data));
        }
    }

    const addNote = (value: Note) => {
        const updatedNotes = [...notes, value]
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
        setNotes(updatedNotes)
    }
    const removeNote = (id: string) => {
        const updatedNotes = notes.filter((value) => {
            if (value.id !== id) {
                return value;
            }
        })
        // set updated notes to storage
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
        setNotes(updatedNotes)


    }

    return (
        <NotesContext.Provider
            value={{
                notes,
                addNote,
                removeNote,
            }}>
            {children}
        </NotesContext.Provider>
    );
};
export { useNotesContext };

export default NotesProvider;

