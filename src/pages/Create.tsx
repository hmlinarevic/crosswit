import { useEffect, useState } from "react"

/*
  {
      1: { size: 8, numOfSquares: 64, numOfWords: 1, maxWordLength: 8 },
      2: { size: 8, numOfSquares: 64, numOfWords: 2, maxWordLength: 8 },
      3: { size: 8, numOfSquares: 64, numOfWords: 3, maxWordLength: 8 },

      4: { size: 10, numOfSquares: 100, numOfWords: 4, maxWordLength: 10 },
      5: { size: 10, numOfSquares: 100, numOfWords: 5, maxWordLength: 10 },
      6: { size: 10, numOfSquares: 100, numOfWords: 6, maxWordLength: 10 },

      7: { size: 12, numOfSquares: 144, numOfWords: 7, maxWordLength: 12 },
      8: { size: 12, numOfSquares: 144, numOfWords: 8, maxWordLength: 12 },
      9: { size: 12, numOfSquares: 144, numOfWords: 9, maxWordLength: 12 },

      10: { size: 14, numOfSquares: 156, numOfWords: 10, maxWordLength: 14 },
  }
*/

const boardSizes: Record<string, number> = {
  1: 8,
  2: 10,
  3: 12,
  4: 14,
}

const createBoard = (size: number) => {
  const arr: number[][] = []

  for (let i = 0; i < size; i++) {
    arr.push([])

    for (let j = 1; j <= size; j++) {
      arr[i].push(j)
    }
  }

  return arr
}

export default function CreateUserBoard() {
  const [userSelectedBoard, setUserSelectedBoard] = useState<number[][]>([])

  useEffect(() => {
    console.log({ userSelectedBoard })
  }, [userSelectedBoard])

  const handleLevelInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("type of value", typeof e.target.value)
    const size = Number(e.target.value)

    const board = createBoard(size)
    setUserSelectedBoard(board)
  }

  const handleCharSelect = (char: string, index: number) => {

  }

  return (
    <>
      <section className="flex justify-center text-white">
        <div className="border-1 border-iris">
          <h2>Create your puzzle</h2>
          <div>
            <p>levels from 1 - 4</p>
            <label htmlFor="numWords">Puzzle size</label>
            <input
              id="numWords"
              type="number"
              name="numWords"
              min={1}
              max={4}
              onChange={handleLevelInput}
            />

            <div className="p-10">
              {userSelectedBoard.map((rows) => {
                console.log({ rows })

                return (
                  <>
                    <div className="flex justify-between">
                      {rows.map((column) => {
                        return (
                          <div className="w-[100px] h-[100px] border-violet-200 border-1 grid place-content-center">
                            <input type="text" />

                            <input
                              id="character"
                              type="text"
                              name="character"
                              onChange={handleCharSelect}
                            />
                            {column}
                          </div>
                        )
                      })}
                    </div>
                  </>
                )
                // return columns.map((row: any, i) => {
                //   console.log({ row })

                //   if (row[i]) {
                //     ;<span>{i + 1}</span>
                //   }
                // })
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
