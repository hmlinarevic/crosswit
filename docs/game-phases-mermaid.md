# Play Page – Game Phases (Mermaid)

## Phase flow

```mermaid
flowchart LR
    subgraph phases[" "]
        A[1. Memorize]
        B[2. Game]
        C[3. GameEnd]
    end
    A -->|timer ends| B
    B -->|win or time up| C
    C -->|Next level| A
    C -->|Retry| A
    C -->|Quit| EXIT[/ or home]
```

## State machine (showUi)

```mermaid
stateDiagram-v2
    [*] --> Memorize: isMemorizeNext=true

    Memorize --> Game: handleMemorizeEnd()\nisMemorizeNext=false, isGameNext=true

    Game --> GameEnd: handleGameEnd()\nisGameDone=true, isGameNext=false

    GameEnd --> Memorize: handleNextClick()\nlevel++, isMemorizeNext=true
    GameEnd --> Memorize: handleRetryGame()\nisRetry=true, reset showUi
    GameEnd --> [*]: onQuitClick() / Esc
```

## Component tree by phase

```mermaid
flowchart TB
    subgraph PlayContent["PlayContent (orchestrator)"]
        direction TB
        subgraph Phase1["Phase 1: Memorize"]
            M[Memorize]
            M --> F1[Fade × several]
            M --> T1[Timer]
        end
        subgraph Phase2["Phase 2: Game"]
            G[Game]
            G --> F2[Fade × several]
            G --> Board[Board]
            G --> T2[Timer]
            G --> Logo[Logo]
            G --> Hints[HintLogo / HintTimer]
            Board --> Square[Square × N]
        end
        subgraph Phase3["Phase 3: GameEnd"]
            GE[GameEnd]
            GE --> GEC[GameEndCompleted]
            GE --> GEF[GameEndFailed]
            GEC --> ScoreRow[ScoreRow]
            GEC --> B1[Button]
            GEF --> B2[Button]
        end
    end
```

## Component tree (text)

Plain hierarchy of components used on the play page (one phase visible at a time):

```
Play (route)
  └── PlayContent
        ├── [phase 1] Memorize
        │     ├── Fade (× several)
        │     └── Timer
        ├── [phase 2] Game
        │     ├── Fade (× several)
        │     ├── Board → Square (× N)
        │     ├── Timer
        │     ├── Logo
        │     └── HintLogo / HintTimer
        └── [phase 3] GameEnd
              ├── GameEndCompleted
              │     ├── Fade
              │     ├── ScoreRow (× several)
              │     └── Button (× 2)
              └── GameEndFailed
                    ├── Fade
                    └── Button (× 2)
```

## Data flow

```mermaid
flowchart LR
    API["/api/wordsearch/level/:level"] --> Puzzle[puzzle]
    Puzzle --> Memorize
    Puzzle --> Game
    Puzzle --> GameEnd

    DELAYS[DELAYS_MS] --> Memorize
    DELAYS --> Game

    backgroundClassName --> Memorize
    backgroundClassName --> Game
    backgroundClassName --> GameEnd
```

## Phase summary table (for reference)

| Phase   | Condition              | Main component | Sub-components / UI                         |
|---------|-------------------------|----------------|---------------------------------------------|
| Memorize | `isMemorizeNext`       | Memorize       | Fade, Timer                                 |
| Game   | `isGameNext`            | Game           | Fade, Board, Square, Timer, Logo, Hint*     |
| GameEnd | `isGameDone`           | GameEnd        | GameEndCompleted / GameEndFailed, Button    |

\* HintLogo, HintTimer (dismissible)
