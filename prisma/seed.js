const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const SEED_USERS = [
  { name: "Alex", email: "alex@example.com", password: "seed1234" },
  { name: "Sam", email: "sam@example.com", password: "seed1234" },
  { name: "Jordan", email: "jordan@example.com", password: "seed1234" },
  { name: "Riley", email: "riley@example.com", password: "seed1234" },
  { name: "Casey", email: "casey@example.com", password: "seed1234" },
];

const SEED_RUNS = [
  { levelReached: 10, totalScore: 1842, totalTimeSpentSeconds: 312, endedBy: "quit" },
  { levelReached: 9, totalScore: 1520, totalTimeSpentSeconds: 289, endedBy: "failed" },
  { levelReached: 10, totalScore: 1698, totalTimeSpentSeconds: 335, endedBy: "quit" },
  { levelReached: 8, totalScore: 1204, totalTimeSpentSeconds: 256, endedBy: "failed" },
  { levelReached: 10, totalScore: 1920, totalTimeSpentSeconds: 298, endedBy: "quit" },
  { levelReached: 7, totalScore: 980, totalTimeSpentSeconds: 198, endedBy: "failed" },
  { levelReached: 9, totalScore: 1450, totalTimeSpentSeconds: 302, endedBy: "quit" },
  { levelReached: 6, totalScore: 720, totalTimeSpentSeconds: 165, endedBy: "failed" },
  { levelReached: 8, totalScore: 1150, totalTimeSpentSeconds: 245, endedBy: "quit" },
  { levelReached: 5, totalScore: 520, totalTimeSpentSeconds: 132, endedBy: "failed" },
];

async function main() {
  const hashedPassword = await bcrypt.hash("seed1234", 10);
  const userIds = [];

  for (let i = 0; i < SEED_USERS.length; i++) {
    const u = SEED_USERS[i];
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        name: u.name,
        email: u.email,
        hashedPassword,
      },
    });
    userIds.push(user.id);
  }

  // Remove existing runs by seed users so re-running seed is idempotent
  await prisma.gameRun.deleteMany({
    where: { userId: { in: userIds } },
  });

  for (let i = 0; i < SEED_RUNS.length; i++) {
    const run = SEED_RUNS[i];
    const userId = userIds[i % userIds.length];
    await prisma.gameRun.create({
      data: {
        userId,
        levelReached: run.levelReached,
        totalScore: run.totalScore,
        totalTimeSpentSeconds: run.totalTimeSpentSeconds,
        endedBy: run.endedBy,
      },
    });
  }

  console.log("Seed complete: users and leaderboard runs created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
