export const fetchLevel = async (level: number) => {
  const res = await fetch(`http://localhost:3000/wordsearch/level/${level}`)
  return res.json()
}
