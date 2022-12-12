import { FC, useState } from "react";
import { useNotesContext } from "../../context/NotesContext";
import "./style.css";

type Props = {
  id: string;
};

const Delete: FC<Props> = ({ id }: Props) => {
  const notesContext = useNotesContext();
  const [draggedOver, setDraggedOver] = useState<boolean>(false);
  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDraggedOver(true);
  };
  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    notesContext?.removeNote(id);
    setDraggedOver(false);
  };
  const dragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDraggedOver(false);
  };
  return (
    <div
      onDragLeave={dragLeave}
      className={`delete ${draggedOver ? "dragOver" : ""}`}
      onDrop={drop}
      onDragOver={dragOver}
    >
      <span className="material-symbols-outlined">delete_forever</span>Trash
    </div>
  );
};

export default Delete;
