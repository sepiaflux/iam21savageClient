export const useGameCode = () => useState<string|undefined>('gameCode', () => localStorage.getItem('gameCode') || undefined)
export function setGameCode (gameCode: string) {
  const chosenGameCode = useGameCode()
  localStorage.setItem('gameCode', gameCode)
  chosenGameCode.value = gameCode
}
export function resetGameCode () {
  const chosenGameCode = useGameCode()
  localStorage.removeItem('gameCode')
  chosenGameCode.value = undefined
}

export const useViewerId = () => useState<string|undefined>('viewerId', () => localStorage.getItem('viewerId') || undefined)
export function setViewerId (viewerId: string) {
  const chosenViewerId = useViewerId()
  localStorage.setItem('viewerId', viewerId)
  chosenViewerId.value = viewerId
}

export function resetState () {
  localStorage.clear()
  const gameCode = useGameCode()
  gameCode.value = undefined
  const viewerId = useViewerId()
  viewerId.value = undefined
}
