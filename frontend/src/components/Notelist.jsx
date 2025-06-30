import React, { useEffect, useRef, useState } from 'react';
import { BsSortDown } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { getNotes } from '../api/noteApi.js';
import useNoteRefreshStore from '../store/useNoteRefreshStore.js';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const Notelist = () => {
  const [notes, setNotes] = useState([]);
  const [titleFilter, setTitleFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [sortBy, setSortBy] = useState('Date Updated');

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


  const filteredNotes = notes
    .filter(note => !note.archived).filter(note => {
      if (titleFilter && !note.title.toLowerCase().includes(titleFilter.toLowerCase())) return false;

      if (tagFilter && (!note.tags || !note.tags.includes(tagFilter))) return false;

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'Title') return a.title.localeCompare(b.title);
      if (sortBy === 'Date Updated') return dayjs(b.updatedAt).valueOf() - dayjs(a.updatedAt).valueOf();
      if (sortBy === 'Date Created') return dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf();
      return 0;
    });

  return (
    <div className="flex flex-col h-full bg-base-100 border-r border-base-300">
      <div className='m-4'>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-base-content">Notes</h1>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-sm text-gray-500">{filteredNotes.length} notes</span>

          <div className="flex justify-end gap-2">
            <div className="dropdown dropdown-bottom dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-sm btn-ghost btn-square">
                <BsSortDown size={18} />
              </div>
              <ul className="dropdown-content z-[1] menu bg-base-100 rounded-box shadow-md w-48 p-2">
                <p className="text-xs text-gray-500 mb-2 px-2">Sort by</p>
                {['Title', 'Date Updated', 'Date Created'].map(option => (
                  <li key={option}>
                    <button
                      type="button"
                      className={`text-left text-sm w-full ${sortBy === option ? 'font-bold' : ''}`}
                      onClick={() => setSortBy(option)}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="dropdown dropdown-bottom dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-sm btn-ghost btn-square">
                <FiFilter size={18} />
              </div>
              <div className="dropdown-content z-[1] bg-base-100 rounded-box shadow-md w-72 p-4 space-y-4">
                <p className="text-sm font-semibold text-base-content">Filters</p>

                <div className="form-control">
                  <label className="label text-sm text-gray-500">Title</label>
                  <input
                    type="text"
                    className="input input-bordered input-sm w-full"
                    value={titleFilter}
                    onChange={(e) => setTitleFilter(e.target.value)}
                    placeholder="Search by title"
                  />
                </div>

                {/* <div className="form-control">
                  <label className="label text-sm text-gray-500">Tags</label>
                  <select
                    className="select select-bordered select-sm w-full"
                    value={tagFilter}
                    onChange={(e) => setTagFilter(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="ideas">Ideas</option>
                  </select>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 mt-4 m-1">
        {filteredNotes.map((note) => (
          <div
            key={note._id}
            onClick={() => navigate(`/note/${note._id}`)}
            className="bg-base-200 p-4 h-[200px] rounded-sm shadow-sm hover:bg-base-300 transition-colors cursor-pointer"
          >
            <h2 className="text-lg font-semibold text-base-content">{note.title || "Untitled Note"}</h2>
            <div className="mt-2 text-xs text-gray-400">
              {dayjs(note.updatedAt).fromNow()} ({dayjs(note.updatedAt).format('MMM D, YYYY h:mm A')})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notelist;
