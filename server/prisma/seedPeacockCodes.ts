import { PrismaClient } from "@prisma/client";
import { encrypt } from "../src/lib/encryption";

const prisma = new PrismaClient();

// Example dummy users and codes
const seedData = [
    { email: "alekseipigin@gmail.com", code: "PEACOCK-ABC123" },
    { email: "alekseipigin319@gmail.com", code: "PEACOCK-XYZ456" },
    { email: "124@gmail.com", code: "PEACOCK-TEST789" },
];

async function main() {
    for (const { email, code } of seedData) {
        // const user = await prisma.user.findUnique({ where: { email } });

        // if (!user) {
        //     console.warn(`User with email ${email} not found. Skipping.`);
        //     continue;
        // }

        const encrypted = encrypt(code);

        // await prisma.peacockCode.upsert({
        //     // where: { userId: user.id },
        //     update: { encrypted },
        //     create: {
        //         userId: user.id,
        //         encrypted,
        //     },
        // });

        await prisma.peacockCode.create({
            data: {
                encrypted
            },
        });

        console.log(`Assigned code to ${email}`);
    }
}

main()
    .then(() => {
        console.log("Seeding complete.");
        return prisma.$disconnect();
    })
    .catch((err) => {
        console.error("Seeding failed:", err);
        return prisma.$disconnect().then(() => process.exit(1));
    });
