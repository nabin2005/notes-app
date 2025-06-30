import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNotes, restoreNote, deleteNote } from '../api/noteApi';
import dayjs from 'dayjs';
import useNoteRefreshStore from '../store/useNoteRefreshStore';

const Trash = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const { shouldRefreshNotes, resetRefresh } = useNoteRefreshStore();

  
  useEffect(() => {
    const fetchArchivedNotes = async () => {
      try {
        const res = await getNotes();
        const archivedNotes = res.data.filter(note => note.archived);
        setNotes(archivedNotes);
      } catch (error) {
        console.error('Error fetching archived notes:', error);
      } finally {
        resetRefresh();
      }
    };
    fetchArchivedNotes();
  }, [shouldRefreshNotes]);


  return (
    <div className="w-full">
      <div className="m-4">
        <h1 className="text-xl font-bold mb-4">Trash</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {notes.map(note => (
            <div
              key={note._id}
              className="card bg-base-200 border border-base-300 shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="card-body p-4">
                <h2 className="card-title text-base-content">{note.title}</h2>
                <p className="text-xs text-gray-500 mt-2">
                  Updated {dayjs(note.updatedAt).fromNow()}
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={async () => {
                      try {
                        await restoreNote(note._id);
                        navigate(`/note/${note._id}`);
                        resetRefresh();
                      } catch (err) {
                        console.error('Failed to restore note:', err);
                        alert('Error restoring note.');
                      }
                    }}
                  >
                    Restore
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={async () => {
                      const confirmDelete = window.confirm(
                        'Are you sure you want to permanently delete this note? This action cannot be undone.'
                      );
                      if (!confirmDelete) return;
                      try {
                        await deleteNote(note._id);
                        setNotes(prev => prev.filter(n => n._id !== note._id));
                        resetRefresh();
                      } catch (err) {
                        console.error('Failed to delete note:', err);
                        alert('Error deleting note.');
                      }
                    }}
                  >
                    Delete Permanently
                  </button>
                </div>
              </div>
            </div>
          ))}
          {notes.length === 0 && <p className="text-gray-500">Trash is empty.</p>}
        </div>
      </div>
    </div>
  );
};

export default Trash;
