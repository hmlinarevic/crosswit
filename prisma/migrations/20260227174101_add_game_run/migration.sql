-- CreateTable
CREATE TABLE "GameRun" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "levelReached" INTEGER NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "totalTimeSpentSeconds" INTEGER NOT NULL,
    "endedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameRun_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GameRun_userId_idx" ON "GameRun"("userId");

-- CreateIndex
CREATE INDEX "GameRun_levelReached_totalTimeSpentSeconds_idx" ON "GameRun"("levelReached", "totalTimeSpentSeconds");

-- AddForeignKey
ALTER TABLE "GameRun" ADD CONSTRAINT "GameRun_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
