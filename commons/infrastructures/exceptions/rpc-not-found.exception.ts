import { IRpcExceptionReply, RpcStatusEnum } from "@contract";
import { RpcException } from "@nestjs/microservices";

export class RpcNotFoundException extends RpcException {
	constructor(message?: string) {
		super({
			status: RpcStatusEnum.ERR_NOT_FOUND,
			message: message ?? RpcStatusEnum.ERR_NOT_FOUND,
			timestamp: +Date.now(),
		} as IRpcExceptionReply);
	}
}
