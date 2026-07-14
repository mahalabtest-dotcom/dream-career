import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

const initialState = {
  name: '',
  gender: '',
  avatarId: '',
  avatarUrl: '',
  selectedSkills: [],
  chosenCareer: null,
}

export function AppProvider({ children }) {
  const [name, setName] = useState(initialState.name)
  const [gender, setGender] = useState(initialState.gender)
  const [avatarId, setAvatarId] = useState(initialState.avatarId)
  const [avatarUrl, setAvatarUrl] = useState(initialState.avatarUrl)
  const [selectedSkills, setSelectedSkills] = useState(initialState.selectedSkills)
  const [chosenCareer, setChosenCareer] = useState(initialState.chosenCareer)

  function resetAll() {
    setName(initialState.name)
    setGender(initialState.gender)
    setAvatarId(initialState.avatarId)
    setAvatarUrl(initialState.avatarUrl)
    setSelectedSkills(initialState.selectedSkills)
    setChosenCareer(initialState.chosenCareer)
  }

  const value = {
    name,
    setName,
    gender,
    setGender,
    avatarId,
    setAvatarId,
    avatarUrl,
    setAvatarUrl,
    selectedSkills,
    setSelectedSkills,
    chosenCareer,
    setChosenCareer,
    resetAll,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
