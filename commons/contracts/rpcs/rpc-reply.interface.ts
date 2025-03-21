import moment from "moment";

export enum RpcStatusEnum {
	OK = "OK",
	ERR_VALIDATION = "ERR_VALIDATION",
	ERR_UNAUTHORIZED = "ERR_UNAUTHORIZED",
	ERR_NOT_FOUND = "ERR_NOT_FOUND",
	ERR_UNPROCESSABLE_ENTITY = "ERR_UNPROCESSABLE_ENTITY",
	ERR_CONFLICT = "ERR_CONFLICT",
}

export interface IRpcReply<T> {
	status: RpcStatusEnum;
	timestamp: number;
	message: string;
	data: T;
}

export interface IRpcExceptionReply {
	status: RpcStatusEnum;
	message: string;
	timestamp: number;
}

export class BaseRpcReply<T> implements IRpcReply<T> {
	status: RpcStatusEnum;
	message: string;
	timestamp: number;
	data: T;

	constructor({ status, message, data }: Omit<IRpcReply<T>, "timestamp">) {
		this.status = status;
		this.timestamp = moment().unix();
		this.message = message || status;
		this.data = data;
	}

	static success<R>({
		message,
		data,
	}: Pick<BaseRpcReply<R>, "message" | "data">): BaseRpcReply<R> {
		return new BaseRpcReply<R>({
			status: RpcStatusEnum.OK,
			message: message,
			data,
		});
	}

	static errValidation({
		message,
	}: Pick<BaseRpcReply<undefined>, "message">): BaseRpcReply<undefined> {
		return new BaseRpcReply<undefined>({
			status: RpcStatusEnum.ERR_VALIDATION,
			message: message,
			data: undefined,
		});
	}

	static errUnauthorized({
		message,
	}: Pick<BaseRpcReply<undefined>, "message">): BaseRpcReply<undefined> {
		return new BaseRpcReply<undefined>({
			status: RpcStatusEnum.ERR_UNAUTHORIZED,
			message: message,
			data: undefined,
		});
	}

	static errNotFound({
		message,
	}: Pick<BaseRpcReply<undefined>, "message">): BaseRpcReply<undefined> {
		return new BaseRpcReply<undefined>({
			status: RpcStatusEnum.ERR_NOT_FOUND,
			message: message,
			data: undefined,
		});
	}

	static errUnprocessableEntity({
		message,
	}: Pick<BaseRpcReply<undefined>, "message">): BaseRpcReply<undefined> {
		return new BaseRpcReply<undefined>({
			status: RpcStatusEnum.ERR_UNPROCESSABLE_ENTITY,
			message: message,
			data: undefined,
		});
	}

	static errConflict({
		message,
	}: Pick<BaseRpcReply<undefined>, "message">): BaseRpcReply<undefined> {
		return new BaseRpcReply<undefined>({
			status: RpcStatusEnum.ERR_CONFLICT,
			message: message,
			data: undefined,
		});
	}
}
