import express from 'express'
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote, archiveNote, restoreNote } from '../controllers/noteController.js'

const router = express.Router()

router.post('/', createNote)
router.get('/', getAllNotes)
router.get('/:id', getNoteById)
router.put('/:id', updateNote)
router.delete('/:id', deleteNote)
router.patch('/:id/archive', archiveNote);
router.patch('/:id/restore', restoreNote);

export default router