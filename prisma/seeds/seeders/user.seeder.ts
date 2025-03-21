import { S3Client } from "@aws-sdk/client-s3";
import { faker } from "@faker-js/faker";
import { Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { downloadAndStoreToS3 } from "../helpers/axios-helper";
import { hashPassword } from "../helpers/hash-helper";
import { deleteObjectsAndDir } from "../helpers/s3.helper";
import * as userRawData from "../raw/user-raw.json";

export async function userSeeder(
	prisma: PrismaClient,
	s3: S3Client,
): Promise<void> {
	const logger = new Logger("UserSeeder");

	await prisma.user.deleteMany();
	await prisma.profile.deleteMany();
	await prisma.account.deleteMany();
	await prisma.geolocation.deleteMany();

	await deleteObjectsAndDir(s3, "users");

	if (process.env.NODE_ENV === "production") {
		logger.log("Skipping patient seed in production...");
		return;
	}

	logger.log("Seeding user data...");

	try {
		const rawDatas: {
			email: string;
			username: string;
		}[] = userRawData.data;

		for (const rawData of rawDatas) {
			const { email, username } = rawData;

			const name = faker.person.fullName();
			const bio = faker.person.bio();

			const user = await prisma.user.create({
				data: {
					username,
					profile: {
						create: {
							name,
							bio,
						},
					},
					account: {
						create: {
							email,
							password: await hashPassword(email),
						},
					},
					geolocation: {
						create: {
							latitude: faker.location.latitude(),
							longitude: faker.location.longitude(),
							city: faker.location.city(),
						},
					},
				},
				select: {
					id: true,
					username: true,
				},
			});

			const image = await downloadAndStoreToS3(
				s3,
				`https://api.dicebear.com/9.x/notionists-neutral/png?seed=${user.username}?size=64`,
				"users",
				user.id,
			);

			await prisma.profile.updateMany({
				where: {
					user: {
						id: user.id,
					},
				},
				data: {
					image,
				},
			});
		}
	} catch (error) {
		logger.error("There's an error when seeding user data");
		throw error;
	}
}
