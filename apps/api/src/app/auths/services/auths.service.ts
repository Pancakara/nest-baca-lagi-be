import { BaseRpcReply, IAccountEntity, IBasicAuthRequest } from "@contract";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { RpcUtils } from "@util";
import { ApiDiKey } from "apps/api/src/constants/di.key";
import { lastValueFrom } from "rxjs";

@Injectable()
export class AuthsService {
	constructor(
		@Inject(ApiDiKey.USER_SERVICE_CLIENT) private readonly client: ClientProxy,
	) {}

	private readonly logger = new Logger(AuthsService.name);

	async basicSignIn(
		reqData: IBasicAuthRequest,
	): Promise<IAccountEntity | undefined> {
		try {
			const result = this.client.send<
				BaseRpcReply<IAccountEntity>,
				IBasicAuthRequest
			>({ cmd: "auth_basic_sign_in" }, reqData);

			return (await lastValueFrom(result)).data;
		} catch (error) {
			RpcUtils.handleRpcError(error);
		}
	}
}
