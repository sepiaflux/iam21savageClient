export const useGameCode = () => useState<string|undefined>('gameCode', () => localStorage.getItem('gameCode') || undefined)
export function setGameCode (gameCode: string) {
  const chosenGameCode = useGameCode()
  localStorage.setItem('gameCode', gameCode)
  chosenGameCode.value = gameCode
}

export const useViewerId = () => useState<string|undefined>('viewerId', () => localStorage.getItem('viewerId') || undefined)
export function setViewerId (viewerId: string) {
  const chosenViewerId = useViewerId()
  localStorage.setItem('viewerId', viewerId)
  chosenViewerId.value = viewerId
}

export function resetState () {
  localStorage.removeItem('gameCode')
  const gameCode = useGameCode()
  gameCode.value = undefined
}
