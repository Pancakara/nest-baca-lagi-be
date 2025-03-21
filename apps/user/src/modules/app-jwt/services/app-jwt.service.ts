import { AppConfigService } from "@config/app-config";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IJwtPayload } from "../../../commons/contracts/jwt.interface";

@Injectable()
export class AppJwtService {
	constructor(
		private readonly config: AppConfigService,
		private readonly jwtService: JwtService,
	) {}

	async generateAccessToken(payload: IJwtPayload): Promise<string> {
		return await this.jwtService.signAsync(payload);
	}

	async generateRefreshToken(payload: IJwtPayload): Promise<string> {
		return await this.jwtService.signAsync(payload, {
			expiresIn: this.config.jwtConfig.refreshTokenExpiresIn,
		});
	}

	async verifyAccessToken(token: string): Promise<IJwtPayload> {
		return this.jwtService.verifyAsync(token, {
			secret: this.config.jwtConfig.accessTokenSecret,
		});
	}

	async verifyRefreshToken(token: string): Promise<IJwtPayload> {
		return this.jwtService.verifyAsync(token, {
			secret: this.config.jwtConfig.refreshTokenSecret,
		});
	}
}
