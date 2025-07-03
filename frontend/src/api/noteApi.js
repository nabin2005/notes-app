import axios from 'axios'

const API_URL = 'https://notes-app-qgqf.onrender.com/api/notes'

export const getNotes = () => axios.get(API_URL)

export const getNoteById = (id) => axios.get(`${API_URL}/${id}`);

export const createNote = (note) => axios.post(API_URL, note)

export const updateNote = (id, updatedNote) => axios.put(`${API_URL}/${id}`, updatedNote)

export const deleteNote = (id) => axios.delete(`${API_URL}/${id}`)

export const archiveNote = (id) => axios.patch(`${API_URL}/${id}/archive`)

export const restoreNote = (id) => axios.patch(`${API_URL}/${id}/restore`)
