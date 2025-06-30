import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import NotFoundPage from './pages/NotFoundPage'
import Home from './pages/Home'
import Trash from './pages/Trash'
import NoteLayout from './layouts/NoteLayout'
import AllNotes from './pages/AllNotes'
import Note from './pages/Note'

const router = createBrowserRouter([
{
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'trash',
        element: <Trash/>
      }
    ],
  },
  {
    path: "/",
    element: <NoteLayout />,
    children: [
      {
        path: 'all-notes',
        element: <AllNotes />,
      },
      {
        path: 'note/:id',
        element: <Note />,
      },
      
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
