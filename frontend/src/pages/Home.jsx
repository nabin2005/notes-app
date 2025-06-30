import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useNoteRefreshStore from '../store/useNoteRefreshStore';
import { getNotes } from '../api/noteApi.js';


const Home = () => {
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();
  const { shouldRefreshNotes, resetRefresh } = useNoteRefreshStore();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await getNotes();
        console.log("Fetched notes:", res.data);
        setNotes(res.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        resetRefresh();
      }
    };
    fetchNotes();
  }, [shouldRefreshNotes]);

  return (
    <div className="w-full">
      <div className="flex-1 overflow-y-auto m-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {notes.filter(note => !note.archived).map((note) => (
            <div
              key={note._id}
              onClick={() => navigate(`/note/${note._id}`)}
              className="
                  bg-base-100 
                  rounded-xl 
                  shadow-md
                  hover:shadow-lg 
                  hover:-translate-y-1 
                  transition 
                  duration-200 
                  cursor-pointer 
                  border border-base-300
                "
            >
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold text-base-content truncate">{note.title}</h2>
                <div className='mt-40'>

                  <p className="text-xs text-gray-500">
                    Updated {dayjs(note.updatedAt).fromNow()}
                  </p>
                  <p className="text-xs text-gray-400">
                    {dayjs(note.updatedAt).format('MMM D, YYYY h:mm A')}
                  </p>
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
