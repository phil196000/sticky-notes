import { createContext, useContext, useEffect, useState } from "react";

const NotesContext = createContext<Notes | undefined>(undefined);
const useNotesContext = () => useContext(NotesContext);

export type Note = {
    id: string;
    text: string;
    positionTop: string;
    positionLeft: string;
    bgColor: string;
};

type Notes = {
    notes: Note[];
    addNote: (value: Note) => void;
    removeNote: (id: string) => void;
    changeItemPostion: (value: Note) => void;
    disableAdd: boolean
    updateDisabledAdd: () => void
};

type NotesProviderProps = {
    children: React.ReactNode;
};

const NotesProvider = ({ children }: NotesProviderProps) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [disableAdd, setDisableAdd] = useState(false);
    useEffect(() => {
        fetchNotes();
    }, []);

    const updateDisabledAdd = () => {
        setDisableAdd(!disableAdd)
    }
    const fetchNotes = () => {
        const data = localStorage.getItem("notes");
        if (data != null) {
            setNotes(JSON.parse(data));
        }
    };

    const addNote = (value: Note) => {
        let updatedNotes: Note[] = [];
        const findNote = notes.find((item) => item.id === value.id);
        if (findNote !== undefined) {
            updatedNotes = notes.map((item) => {
                if (item.id === value.id) {
                    return value;
                } else {
                    return item;
                }
            });
        } else {
            updatedNotes = [...notes, value];
        }
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
        setNotes(updatedNotes);
    };
    const removeNote = (id: string) => {
        const updatedNotes = notes.filter((value) => value.id !== id);
        // set updated notes to storage
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
        setNotes(updatedNotes);
    };

    // To change the focus of the card
    const changeItemPostion = (value: Note) => {
        const updatedNotes = notes.filter((item) => item.id !== value.id);
        updatedNotes.push(value);
        setNotes(updatedNotes);
    };

    return (
        <NotesContext.Provider
            value={{
                notes,
                disableAdd,
                addNote,
                removeNote,
                changeItemPostion,
                updateDisabledAdd,
            }}
        >
            {children}
        </NotesContext.Provider>
    );
};
export { useNotesContext };

export default NotesProvider;
