import { IRpcExceptionReply, RpcStatusEnum } from "@contract";
import { RpcException } from "@nestjs/microservices";

export class RpcConflictException extends RpcException {
	constructor(message?: string) {
		super({
			status: RpcStatusEnum.ERR_CONFLICT,
			message: message ?? RpcStatusEnum.ERR_CONFLICT,
			timestamp: +Date.now(),
		} as IRpcExceptionReply);
	}
}
