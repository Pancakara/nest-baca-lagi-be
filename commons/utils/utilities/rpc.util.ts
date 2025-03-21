import { IRpcExceptionReply, RpcStatusEnum } from "@contract";
import {
	BadRequestException,
	InternalServerErrorException,
	NotFoundException,
	UnauthorizedException,
	UnprocessableEntityException,
} from "@nestjs/common";

export class RpcUtils {
	static isRpcException(data: unknown): data is IRpcExceptionReply {
		const exception = data as IRpcExceptionReply;
		return exception.message !== undefined && exception.status !== undefined;
	}

	static handleRpcError(error: unknown): void {
		if (!this.isRpcException(error)) {
			throw new InternalServerErrorException(
				"An error occurred while processing your request.",
			);
		}

		switch (error.status) {
			case RpcStatusEnum.ERR_VALIDATION:
				throw new BadRequestException(error.message);
			case RpcStatusEnum.ERR_NOT_FOUND:
				throw new NotFoundException(error.message);
			case RpcStatusEnum.ERR_UNAUTHORIZED:
				throw new UnauthorizedException(error.message);
			case RpcStatusEnum.ERR_CONFLICT:
				throw new BadRequestException(error.message);
			case RpcStatusEnum.ERR_UNPROCESSABLE_ENTITY:
				throw new UnprocessableEntityException(error.message);
			default:
				throw new InternalServerErrorException(error.message);
		}
	}
}
