import Sidebar from '../components/Sidebar';
import Notelist from '../components/Notelist';
import { Outlet } from 'react-router-dom';

const NoteLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-base-200 text-base-content">
      <div className="w-1/5 min-w-[200px] border-r border-base-300 bg-base-100">
        <Sidebar />
      </div>

      <div className="w-1/4 border-r border-base-300 bg-base-100">
        <Notelist />
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto bg-base-100">
        <Outlet />
      </div>
    </div>
  );
}

export default NoteLayout