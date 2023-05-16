export const useGameCode = () => useState<string|undefined>('gameCode', () => localStorage.getItem('gameCode') || undefined)
export function setGameCode (gameCode: string) {
  const chosenGameCode = useGameCode()
  localStorage.setItem('gameCode', gameCode)
  chosenGameCode.value = gameCode
}

export function resetState () {
  const gameCode = useGameCode()
  gameCode.value = undefined
}
