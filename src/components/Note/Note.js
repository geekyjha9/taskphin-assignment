import React, { useState } from "react";
import './style.css'
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { createNote, updateNote, deleteNote } from "../../redux/actions";
import NoteList from "../NoteList/NoteList";

const Note = ({ notes, createNote, updateNote, deleteNote }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState(`
  <h2>Hi there,</h2>
  <p>this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kinds of basic text styles you’d probably expect from a text editor. But wait until you see the lists:</p>
  <ul>
      <li>That’s a bullet list with one …</li>
      <li>… or two list items.</li>
  </ul>
  <p>Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:</p>
  <pre><code class="language-css">body { display: none; }</code></pre>
  <p>I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.</p>
  <blockquote>Wow, that’s amazing. Good work, boy! 👏<br/>— Mom</blockquote>
`);
  const [noteIdToUpdate, setNoteIdToUpdate] = useState(null);

  const handleSaveNote = () => {
    if (content.trim() !== "") {
      createOrUpdateNote();
    }
  };

  const createOrUpdateNote = () => {
    if (noteIdToUpdate) {
      // Update existing note
      updateNote(noteIdToUpdate, { id: noteIdToUpdate, content: content });
      setNoteIdToUpdate(null); // Reset the noteIdToUpdate
      setContent(''); // Clear the content after updating
    } else {
      // Create new note
      createNote({
        id: Date.now(),
        content: content,
      });
      setContent(''); // Clear the content after creating
    }
  };

  const handleUpdateNote = (note) => {
    // Set the content of the editor to the content of the note being updated
    setContent(note.content);
    setNoteIdToUpdate(note.id); // Set the noteIdToUpdate to the id of the note being updated
  };

  const handleDeleteNote = (note) => {
    deleteNote(note.id);
  };

  return (
    <div className="note-container">
      <h2>Create or Edit Note</h2>
      <EditorProvider
        extensions={[StarterKit]}
        content={content}
        onUpdate={({ editor }) => setContent(editor.getHTML())}
      >
        <MenuBar />
      </EditorProvider>
      <div className="buttons">
        <button className="save-button" onClick={handleSaveNote}>
          {noteIdToUpdate ? 'Update Note' : 'Save Note'}
        </button>
      </div>
      <NoteList
        notes={notes}
        handleUpdateNote={handleUpdateNote}
        handleDeleteNote={handleDeleteNote}
      />
    </div>
  );
}

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="menu-bar">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        Strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        code
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        redo
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  notes: state.notes.notes,
});

const mapDispatchToProps = {
  createNote,
  updateNote,
  deleteNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(Note);
