const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();
async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Web Development" },
        { name: "Development-Tooling" },
        { name: "AI-Integration" },
        { name: "Documentation" },
      ],
    });
    console.log("Successfully seeded the database categories.");
  } catch (error) {
    console.error("Error while seeding the database categories:\n", error);
  } finally {
    await database.$disconnect();
  }
}
main();
