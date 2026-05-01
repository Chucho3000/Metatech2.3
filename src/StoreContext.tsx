import React, { createContext, useContext, useState, useEffect } from 'react'

interface StoreState {
  totalRecycled: number
  totalEarned: number
  addRecycled: (weight: number, pricePerKg: number) => void
}

const StoreContext = createContext<StoreState | undefined>(undefined)

export function StoreProvider({ children }: { children: React.ReactNode }) {
const [totalRecycled, setTotalRecycled] = useState(0)
const [totalEarned, setTotalEarned] = useState(0)

  // Load from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('metatech_stats')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (typeof parsed.totalRecycled === 'number') setTotalRecycled(parsed.totalRecycled)
        if (typeof parsed.totalEarned === 'number') setTotalEarned(parsed.totalEarned)
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('metatech_stats', JSON.stringify({ totalRecycled, totalEarned }))
  }, [totalRecycled, totalEarned])

  const addRecycled = (weight: number, pricePerKg: number) => {
    setTotalRecycled(prev => prev + weight)
    setTotalEarned(prev => prev + (weight * pricePerKg))
  }

  return (
    <StoreContext.Provider value={{ totalRecycled, totalEarned, addRecycled }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}
