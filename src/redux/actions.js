// Action Types
export const CREATE_NOTE = 'CREATE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

// Action Creators
export const createNote = (note) => ({
    type: CREATE_NOTE,
    payload: note,
});

export const updateNote = (noteId, updatedNote) => ({
    type: UPDATE_NOTE,
    payload: { noteId, updatedNote },
});

export const deleteNote = (noteId) => ({
    type: DELETE_NOTE,
    payload: noteId,
});
