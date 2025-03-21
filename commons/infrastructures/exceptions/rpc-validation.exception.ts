import { IRpcExceptionReply, RpcStatusEnum } from "@contract";
import { RpcException } from "@nestjs/microservices";

export class RpcValidationException extends RpcException {
	constructor(message?: string) {
		super({
			status: RpcStatusEnum.ERR_VALIDATION,
			message: message ?? RpcStatusEnum.ERR_VALIDATION,
			timestamp: +Date.now(),
		} as IRpcExceptionReply);
	}
}
