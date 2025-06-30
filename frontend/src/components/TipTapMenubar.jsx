import {
  FaBold, FaItalic, FaStrikethrough, FaCode, FaHighlighter, FaParagraph,
  FaFileCode, FaAlignLeft, FaAlignCenter, FaAlignRight
} from "react-icons/fa";
import {
  TbClearFormatting
} from "react-icons/tb";
import { BsChatLeftQuoteFill } from "react-icons/bs";
import { RxDividerHorizontal } from "react-icons/rx";
import { GoListUnordered, GoListOrdered } from "react-icons/go";
import { LuUndo2, LuRedo2, LuListTodo } from "react-icons/lu";
import '../styles/TiptapStyle.css';

const TipTapMenuBar = ({ editor }) => {
  if (!editor) return null;

  const buttonClass = (active) =>
    `btn btn-sm ${active ? 'btn-primary' : 'btn-ghost'} transition-all`;

  return (
    <div className="flex flex-wrap  gap-2 py-2 px-1 mb-4 scrollbar-thin scrollbar-thumb-base-content/20">

      {/* Inline formatting */}
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={buttonClass(editor.isActive('bold'))}><FaBold /></button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={buttonClass(editor.isActive('italic'))}><FaItalic /></button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()} className={buttonClass(editor.isActive('strike'))}><FaStrikethrough /></button>
      <button onClick={() => editor.chain().focus().toggleCode().run()} className={buttonClass(editor.isActive('code'))}><FaCode /></button>
      <button onClick={() => editor.chain().focus().toggleHighlight().run()} className={buttonClass(editor.isActive('highlight'))}><FaHighlighter /></button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()} className="btn btn-sm btn-outline"><TbClearFormatting /></button>

      {/* Paragraph */}
      <button onClick={() => editor.chain().focus().setParagraph().run()} className={buttonClass(editor.isActive('paragraph'))}><FaParagraph /></button>

      {/* Headings Dropdown */}
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-sm btn-ghost">H ▾</div>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-1 shadow bg-base-200 rounded-box w-16">
          {[1, 2, 3].map((level) => (
            <li key={level}>
              <button onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                className={editor.isActive('heading', { level }) ? "active" : ""}>
                H{level}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Lists Dropdown */}
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-sm btn-ghost">Lists ▾</div>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-1 shadow bg-base-200 rounded-box w-28">
          <li>
            <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? "active" : ""}>
              <GoListUnordered /> Bullet
            </button>
          </li>
          <li>
            <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? "active" : ""}>
              <GoListOrdered /> Numbered
            </button>
          </li>
          <li>
            <button onClick={() => editor.chain().focus().toggleTaskList().run()} className={editor.isActive('taskList') ? "active" : ""}>
              <LuListTodo /> Task
            </button>
          </li>
        </ul>
      </div>

      {/* Alignment Dropdown */}
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-sm btn-ghost">Align ▾</div>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-1 shadow bg-base-200 rounded-box w-28">
          <li>
            <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? "active" : ""}>
              <FaAlignLeft /> Left
            </button>
          </li>
          <li>
            <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? "active" : ""}>
              <FaAlignCenter /> Center
            </button>
          </li>
          <li>
            <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? "active" : ""}>
              <FaAlignRight /> Right
            </button>
          </li>
        </ul>
      </div>

      {/* Code block & quote */}
      <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={buttonClass(editor.isActive('codeBlock'))}><FaFileCode /></button>
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={buttonClass(editor.isActive('blockquote'))}><BsChatLeftQuoteFill /></button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className="btn btn-sm btn-outline"><RxDividerHorizontal /></button>

      {/* Undo/Redo Dropdown */}
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-sm btn-ghost">↺ ▾</div>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-1 shadow bg-base-200 rounded-box w-20">
          <li>
            <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()}>
              <LuUndo2 /> Undo
            </button>
          </li>
          <li>
            <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()}>
              <LuRedo2 /> Redo
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TipTapMenuBar;
