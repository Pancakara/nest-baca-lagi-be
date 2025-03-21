import { BaseRpcReply, IAuthResponse } from "@contract";
import { Controller, Logger } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { BasicSignInRequest } from "../dtos/requests/basic-sign-in.request";
import { AuthsService } from "../services/auths.service";

@Controller()
export class AuthsController {
	constructor(private readonly service: AuthsService) {}

	private readonly logger = new Logger(AuthsController.name);

	@MessagePattern({ cmd: "auth_basic_sign_in" })
	async handleSignIn(
		@Payload() data: BasicSignInRequest,
	): Promise<BaseRpcReply<IAuthResponse>> {
		const account = await this.service.signIn(data);

		return BaseRpcReply.success({
			message: "Sign in successfully",
			data: account,
		});
	}

	@MessagePattern({ cmd: "auth_basic_refresh_token" })
	async handleRefreshToken(
		@Payload() refreshToken: string,
	): Promise<BaseRpcReply<IAuthResponse>> {
		const account = await this.service.refreshToken(refreshToken);

		return BaseRpcReply.success({
			message: "Refresh token successfully",
			data: account,
		});
	}
}
