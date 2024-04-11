import { CREATE_NOTE, UPDATE_NOTE, DELETE_NOTE } from '../actions';

const initialState = {
    notes: [],
};

const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NOTE:
            return {
                ...state,
                notes: [...state.notes, action.payload],
            };
        case UPDATE_NOTE:
            return {
                ...state,
                notes: state.notes.map((note) =>
                    note.id === action.payload.noteId ? action.payload.updatedNote : note
                ),
            };
        case DELETE_NOTE:
            return {
                ...state,
                notes: state.notes.filter((note) => note.id !== action.payload),
            };
        default:
            return state;
    }
};

export default notesReducer;
