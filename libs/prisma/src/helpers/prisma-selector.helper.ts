import { Prisma } from "@prisma/client";

export abstract class PrismaSelector {
	static readonly ACCOUNT = {
		id: true,
		email: true,
	} satisfies Prisma.AccountSelect;

	static readonly PROFILE = {
		id: true,
		name: true,
		image: true,
		bio: true,
	} satisfies Prisma.ProfileSelect;

	static readonly USER = {
		id: true,
		username: true,
	} satisfies Prisma.UserSelect;

	static readonly USER_WITH_PROFILE = {
		id: true,
		username: true,
		profile: {
			select: PrismaSelector.PROFILE,
		},
	} satisfies Prisma.UserSelect;

	static readonly BOOK = {
		id: true,
		title: true,
		author: true,
		buyPrice: true,
		isbn: true,
		publisher: true,
		publishYear: true,
		language: true,
	} satisfies Prisma.BookSelect;

	static readonly PREDICTION_RESULT = {
		id: true,
		buyPrice: true,
		recommendPrice: true,
		percentage: true,
		rippedRatio: true,
		wornOutRatio: true,
		overallRatio: true,
	} satisfies Prisma.PredictionResultSelect;
}
