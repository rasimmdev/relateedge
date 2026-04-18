'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import WaitlistModal from './WaitlistModal'

type WaitlistContextValue = {
  open: () => void
}

const WaitlistContext = createContext<WaitlistContextValue | null>(null)

export function useWaitlist() {
  const ctx = useContext(WaitlistContext)
  if (!ctx) {
    throw new Error('useWaitlist must be used within WaitlistProvider')
  }
  return ctx
}

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const openModal = useCallback(() => setOpen(true), [])
  const closeModal = useCallback(() => setOpen(false), [])

  const value = useMemo(() => ({ open: openModal }), [openModal])

  return (
    <WaitlistContext.Provider value={value}>
      {children}
      <WaitlistModal open={open} onClose={closeModal} />
    </WaitlistContext.Provider>
  )
}
