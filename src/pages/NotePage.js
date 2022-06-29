import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = ({ match, history }) => {
  const params = useParams();
  const noteId = params.id;
  const navigate = useNavigate();
  const [note, setNote] = useState(null);

  let CSRF = document.cookie.slice(10);

  const getNote = async () => {
    if (noteId === "new") return;

    const response = await fetch(`/api/notes/${noteId}`);
    const data = await response.json();
    setNote(data);
  };

  const createNote = async () => {
    fetch(`/api/notes/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  const updateNote = async () => {
    fetch(`/api/notes/${noteId}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": CSRF,
      },
      body: JSON.stringify(note),
    });
  };

  const deleteNote = async () => {
    fetch(`/api/notes/${noteId}/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/");
  };

  const handleSubmit = () => {
    console.log("NOTE:", note);
    if (noteId !== "new" && note.body === "") {
      deleteNote();
    } else if (noteId !== "new") {
      updateNote();
    } else if (noteId === "new" && note.body !== null) {
      createNote();
    }

    navigate("/");
  };

  useEffect(() => {
    getNote();
  }, [noteId]);

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit}></ArrowLeft>
        </h3>
        {noteId !== "new" ? (
          <button onClick={deleteNote}>DELETE</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => setNote({ ...note, body: e.target.value })}
        defaultValue={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
