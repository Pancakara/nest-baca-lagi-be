import { S3Client } from "@aws-sdk/client-s3";
import { Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { userSeeder } from "./seeders/user.seeder";

const prisma = new PrismaClient();
const logger = new Logger("Seeder");

const s3 = new S3Client({
	endpoint: process.env.S3_ENDPOINT!,
	region: process.env.S3_REGION!,
	credentials: {
		accessKeyId: process.env.S3_ACCESS_KEY_ID!,
		secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
	},
	forcePathStyle: true,
});

async function main(): Promise<void> {
	logger.log(`Seeding data in ${process.env.NODE_ENV} environment...`);
	await userSeeder(prisma, s3);
}

main()
	.then(async () => {
		logger.log("Seed data complete");
		await prisma.$disconnect();
		process.exit(0);
	})
	.catch(async (e) => {
		logger.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
