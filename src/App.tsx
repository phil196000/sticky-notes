import './App.css';
import Delete from './components/Delete/Delete';
import NotesArea from './components/Notes/NotesArea';

function App() {
  return (
    <div className="App">
      <h2 className='title'>Sticky Notes</h2>
      <NotesArea />
      <Delete />
    </div>
  );
}

export default App;
