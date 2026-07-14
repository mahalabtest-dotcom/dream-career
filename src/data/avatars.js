import boy1 from '../assets/avatars/boy-1.png'
import boy2 from '../assets/avatars/boy-2.png'
import boy3 from '../assets/avatars/boy-3.png'
import girl1 from '../assets/avatars/girl-1.png'
import girl2 from '../assets/avatars/girl-2.png'
import girl3 from '../assets/avatars/girl-3.png'

// Real character artwork (resized from img/avatar/). To swap: replace the files
// in src/assets/avatars/ (keep the same names) or update the imports above.
export const AVATARS = {
  boy: [
    { id: 'boy-1', src: boy1, label: 'Avatar 1' },
    { id: 'boy-2', src: boy2, label: 'Avatar 2' },
    { id: 'boy-3', src: boy3, label: 'Avatar 3' },
  ],
  girl: [
    { id: 'girl-1', src: girl1, label: 'Avatar 1' },
    { id: 'girl-2', src: girl2, label: 'Avatar 2' },
    { id: 'girl-3', src: girl3, label: 'Avatar 3' },
  ],
}

export function getAvatarsForGender(gender) {
  return AVATARS[gender] ?? []
}

export function findAvatarById(id) {
  return [...AVATARS.boy, ...AVATARS.girl].find((avatar) => avatar.id === id)
}
