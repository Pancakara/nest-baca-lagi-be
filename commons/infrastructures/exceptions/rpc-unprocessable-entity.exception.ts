import { IRpcExceptionReply, RpcStatusEnum } from "@contract";
import { RpcException } from "@nestjs/microservices";

export class RpcUnprocessableEntityException extends RpcException {
	constructor(message?: string) {
		super({
			status: RpcStatusEnum.ERR_UNPROCESSABLE_ENTITY,
			message: message ?? RpcStatusEnum.ERR_UNPROCESSABLE_ENTITY,
			timestamp: +Date.now(),
		} as IRpcExceptionReply);
	}
}
