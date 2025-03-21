import { IAccountEntity } from "@contract";
import { PrismaSelector, PrismaService } from "@database/prisma";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthsRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findAccountByEmail(email: string): Promise<IAccountEntity | null> {
		return this.prisma.account.findUnique({
			where: {
				email,
			},
			select: {
				...PrismaSelector.ACCOUNT,
				password: true,
				user: {
					select: PrismaSelector.USER_WITH_PROFILE,
				},
			},
		});
	}

	async updateAccountRefreshToken(
		id: string,
		refreshToken: string | null,
	): Promise<IAccountEntity> {
		return this.prisma.account.update({
			where: {
				id,
			},
			data: {
				refreshToken,
			},
			select: {
				...PrismaSelector.ACCOUNT,
				password: true,
				user: {
					select: PrismaSelector.USER_WITH_PROFILE,
				},
			},
		});
	}
}
