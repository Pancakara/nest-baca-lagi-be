import { SetCache } from "@config/app-cache";
import { AppConfigService } from "@config/app-config";
import { IAuthResponse, IBasicAuthRequest } from "@contract";
import { RpcNotFoundException, RpcUnauthorizedException } from "@infrastructue";
import { Injectable, Logger } from "@nestjs/common";
import { AppJwtService } from "apps/user/src/modules/app-jwt/services/app-jwt.service";
import * as bcrypt from "bcrypt";
import { AuthsRepository } from "../repositories/auths.repository";

@Injectable()
export class AuthsService {
	constructor(
		private readonly repository: AuthsRepository,
		private readonly config: AppConfigService,
		private readonly jwtService: AppJwtService,
	) {}

	private readonly logger = new Logger(AuthsService.name);

	async signIn({ email, password }: IBasicAuthRequest): Promise<IAuthResponse> {
		const account = await this.repository.findAccountByEmail(email);

		if (!account) {
			throw new RpcNotFoundException("Akun tidak ditemukan");
		}

		const isPasswordMatch = await bcrypt.compare(password, account.password!);

		if (!isPasswordMatch) {
			throw new RpcUnauthorizedException("Password salah");
		}

		const accessToken = await this.jwtService.generateAccessToken({
			id: account.user?.id ?? "",
			username: account.user?.username ?? "",
			email: account.email,
		});

		const refreshToken = await this.jwtService.generateRefreshToken({
			id: account.id,
			username: account.user?.username ?? "",
			email: account.email,
		});

		await this.repository.updateAccountRefreshToken(account.id, refreshToken);

		return {
			accessToken,
			refreshToken,
		};
	}

	@SetCache((refreshToken: string) => `auth:refresh-token:${refreshToken}`, {
		ttl: 60,
		unit: "minute",
	})
	async refreshToken(refreshToken: string): Promise<IAuthResponse> {
		const { email } = await this.jwtService.verifyRefreshToken(refreshToken);

		const account = await this.repository.findAccountByEmail(email);

		if (!account) {
			throw new RpcNotFoundException("Akun tidak ditemukan");
		}

		if (account.refreshToken !== refreshToken) {
			throw new RpcUnauthorizedException("Refresh token tidak valid");
		}

		const accessToken = await this.jwtService.generateAccessToken({
			id: account.user?.id ?? "",
			username: account.user?.username ?? "",
			email: account.email,
		});

		const newRefreshToken = await this.jwtService.generateRefreshToken({
			id: account.id,
			username: account.user?.username ?? "",
			email: account.email,
		});

		await this.repository.updateAccountRefreshToken(
			account.id,
			newRefreshToken,
		);

		return {
			accessToken,
			refreshToken: newRefreshToken,
		};
	}
}
