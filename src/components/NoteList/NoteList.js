import React from 'react';
import './style.css';
import { connect } from 'react-redux';

const NoteList = ({ notes, handleUpdateNote, handleDeleteNote }) => {
    console.log("notes", notes);
    return (
        <div className="note-list-container">
            <h2>Saved Notes</h2>
            {notes.length > 0 ? (
                <ul>
                    {notes.map(note => (
                        <li key={note.id}>
                            <div dangerouslySetInnerHTML={{ __html: note.content }} />
                            <div className="note-buttons">
                                <button className="update-button" onClick={() => handleUpdateNote(note)}>
                                    Update Note
                                </button>
                                <button className="delete-button" onClick={() => handleDeleteNote(note)}>
                                    Delete Note
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No notes saved yet.</p>
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    notes: state.notes.notes,
});

export default connect(mapStateToProps)(NoteList);
