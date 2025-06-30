import { create } from 'zustand'

const useNoteRefreshStore = create((set) => ({
    shouldRefreshNotes: false,
    triggerRefresh: () => set({ shouldRefreshNotes: true }),
    resetRefresh: () => set({shouldRefreshNotes: false})
}))

export default useNoteRefreshStore