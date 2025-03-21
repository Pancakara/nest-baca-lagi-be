import { IRpcExceptionReply, RpcStatusEnum } from "@contract";
import { RpcException } from "@nestjs/microservices";

export class RpcUnauthorizedException extends RpcException {
	constructor(message?: string) {
		super({
			status: RpcStatusEnum.ERR_UNAUTHORIZED,
			message: message ?? RpcStatusEnum.ERR_UNAUTHORIZED,
			timestamp: +Date.now(),
		} as IRpcExceptionReply);
	}
}
