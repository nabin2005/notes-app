import { IoIosSearch } from "react-icons/io";
import { MdNoteAdd } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { createNote } from '../api/noteApi';

const Sidebar = () => {


const navigate = useNavigate();

const handleNewNote = async () => {
  try {
    const res = await createNote({ title: '', content: '', tags: [] });
    const newId = res.data._id;
    navigate(`/note/${newId}`, {replace: true});
  } catch (error) {
    console.error("Failed to create new note:", error);
  }
};


    return (
        <div className="flex flex-col h-full bg-base-200 p-4 gap-4">
            <div className="text-2xl font-bold text-base-content mb-2">
                Notes
            </div>

            {/* <div className="relative">
                <input
                    type="text"
                    placeholder="Search..."
                    className="input input-bordered w-full pl-10 rounded-md"
                />
                <IoIosSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content" />
            </div> */}

            <button className="btn bg-[#03C755] border-[#591660] w-full flex items-center gap-1" onClick={handleNewNote}>
                <MdNoteAdd size={20} />
                New Note
            </button>
           
            <div className="flex-1 overflow-y-auto mt-2">
                <ul className="menu p-0 text-base w-full">
                    <li><Link to="/" className="truncate"> <CgNotes /> Home</Link></li>
                    <li><Link to="/all-notes" className="truncate"> <CgNotes /> All Notes</Link></li>
                    <div className="divider"></div>
                    <li><Link to='/trash' className="truncate"><FaTrash /> Trash</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
