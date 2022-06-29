import React, { useEffect, useState } from "react";
import ListItem from "../components/ListItem";
import AddButton from "../components/AddButton";

const NotesListPage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    const response = await fetch("/api/notes/");
    const data = await response.json();
    setNotes(data);
    // console.log(data);
  };

  const renderNotes = notes.map((note, index) => (
    <ListItem key={index} note={note}></ListItem>
  ));

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes </h2>
        <p className="notes-count">({notes.length})</p>
      </div>
      <div className="notes-list">{renderNotes}</div>
      <AddButton></AddButton>
    </div>
  );
};

export default NotesListPage;
