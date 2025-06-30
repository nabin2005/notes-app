import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import ListItem from '@tiptap/extension-list-item';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { useParams, useNavigate } from 'react-router-dom';
import { getNoteById, createNote, deleteNote, updateNote, archiveNote } from '../api/noteApi';
import { FaTrash } from 'react-icons/fa';
import useNoteRefreshStore from '../store/useNoteRefreshStore';
import debounce from 'lodash.debounce';
import TipTapMenuBar from '../components/TipTapMenubar';



const extensions = [
  TextStyle,
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: { keepMarks: true },
    orderedList: { keepMarks: true },
  }),
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  Highlight,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
];


const Note = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { triggerRefresh } = useNoteRefreshStore();

  const [noteId, setNoteId] = useState(id || null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingNote, setIsFetchingNote] = useState(false);


  const editor = useEditor({
    extensions,
    content: '',
  });

  useEffect(() => {
    if (!editor) return;
    const updateHandler = () => {
      if (isFetchingNote) return;
      setContent(editor.getHTML());
    };
    editor.on('update', updateHandler);
    return () => editor.off('update', updateHandler);
  }, [editor, isFetchingNote]);

  useEffect(() => {
    if (!editor || !id || id === 'new') return;

    const fetchNote = async () => {
      setIsLoading(true);
      setIsFetchingNote(true);
      try {
        const res = await getNoteById(id);
        setNoteId(res.data._id);
        setTitle(res.data.title || '');
        setUpdatedAt(res.data.updatedAt);
        editor.commands.setContent(res.data.content || '');
        setContent(res.data.content || '');
      } catch (err) {
        console.error('Failed to load note:', err);
      } finally {
        setIsLoading(false);
        setIsFetchingNote(false);
      }
    };

    fetchNote();
  }, [id, editor]);



  const debouncedSave = React.useRef(
    debounce(async (idToUpdate, titleToUpdate, contentToUpdate) => {
      try {
        await updateNote(idToUpdate, { title: titleToUpdate, content: contentToUpdate, tags: [] });
        setUpdatedAt(new Date().toISOString());
        triggerRefresh();
      } catch (err) {
        console.error('Auto-save failed:', err);
      }
    }, 1000)
  ).current;


  useEffect(() => {
    if (!noteId || noteId === 'new' || !editor || isLoading || isFetchingNote) return;
    debouncedSave(noteId, title, content);
  }, [title, content, noteId, editor, debouncedSave, isLoading, isFetchingNote]);



  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, [debouncedSave]);



  if (isLoading) {
    return <div className="text-center p-10">Loading...</div>;
  }


  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="bg-base-100 rounded-xl p-4 space-y-6 shadow">
        <div className="flex justify-between items-center">
          {updatedAt && (
            <p className="text-sm text-gray-400">Last edited on {new Date(updatedAt).toLocaleString()}</p>
          )}
          <button
            className="btn btn-square btn-ghost text-error"
            title="Move to Trash"
            onClick={async () => {
              const confirmed = window.confirm('Are you sure you want to move this note to Trash?');
              if (!confirmed) return;
              try {
                await archiveNote(noteId);
                navigate('/all-notes');
                triggerRefresh();
              } catch (err) {
                console.error('Failed to archive note:', err);
                alert('Error move note to trash.');
              }
            }}
          >
            <FaTrash />
          </button>
        </div>

        <div className="divider my-0" />
        <TipTapMenuBar editor={editor} />

        <input
          type="text"
          placeholder="Title"
          className="input input-ghost text-3xl font-semibold w-full focus:outline-none"
          maxLength={100}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div
          className="min-h-[500px] overflow-auto p-4 tiptap cursor-text"
          onClick={() => editor?.commands.focus()}
        >
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default Note;
