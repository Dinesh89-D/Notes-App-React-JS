import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import NotesList from "./components/NotesList.js";
import SearchNote from './SearchNote.js';
import Header from "./components/Header.js";

const App = () => {
  const [notes, setNotes] = useState([
    { id: nanoid(), text: "Dineshkumar", date: "15/04/2021" },
    { id: nanoid(), text: "Dineshkumar2", date: "15/04/2021" },
    { id: nanoid(), text: "Dineshkumar3", date: "15/04/2021" },
    { id: nanoid(), text: "Dineshkumar4", date: "15/04/2021" },
  ]);

  const [searchText, setSearchText] = useState("");
  const [darkMode,setDarkMode] = useState(false);
  useEffect(()=>{
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'));
    if(savedNotes){
      setNotes(savedNotes);
    }
  },[])
  useEffect(()=>{
    localStorage.setItem('react-notes-app-data',JSON.stringify(notes))
  },[notes])

  const addNote = (text) => {
    if (!text.trim()) return; // Prevent empty notes
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text.trim(),
      date: date.toLocaleDateString(),
    };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
    <div className="container">
      <Header handleToggleDarkMode={setDarkMode}/>
      <SearchNote handleSearchNote={setSearchText} />
      <NotesList
        notes={notes.filter((note) =>
          note.text.toLowerCase().includes(searchText.toLowerCase())
        )}

        handleAddNote={addNote}
        handleDeleteNote={deleteNote}
      />
    </div>
    </div>
  );
};

export default App;
