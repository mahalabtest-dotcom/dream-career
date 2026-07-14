import boy1 from '../assets/avatars/boy-1.svg'
import boy2 from '../assets/avatars/boy-2.svg'
import boy3 from '../assets/avatars/boy-3.svg'
import girl1 from '../assets/avatars/girl-1.svg'
import girl2 from '../assets/avatars/girl-2.svg'
import girl3 from '../assets/avatars/girl-3.svg'

// Placeholder art — swap these files in src/assets/avatars/ for the real
// character illustrations (keep the same filenames, or update the imports
// above if the new files use different names/extensions).
export const AVATARS = {
  boy: [
    { id: 'boy-1', src: boy1, label: 'Explorer' },
    { id: 'boy-2', src: boy2, label: 'Astronaut' },
    { id: 'boy-3', src: boy3, label: 'Champion' },
  ],
  girl: [
    { id: 'girl-1', src: girl1, label: 'Explorer' },
    { id: 'girl-2', src: girl2, label: 'Astronaut' },
    { id: 'girl-3', src: girl3, label: 'Princess' },
  ],
}

export function getAvatarsForGender(gender) {
  return AVATARS[gender] ?? []
}

export function findAvatarById(id) {
  return [...AVATARS.boy, ...AVATARS.girl].find((avatar) => avatar.id === id)
}
