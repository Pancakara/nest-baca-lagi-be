export interface IApiResponse<T> {
	message: string;
	timestamp: number;
	data: T;
}

export interface IPagination {
	page: number;
	totalPages: number;
	limit: number;
	total: number;
}

export interface IApiResponsePagination<T>
	extends Omit<IApiResponse<T>, "data"> {
	meta: IPagination;
	data: T[];
}

export class ApiResponse<T> implements IApiResponse<T> {
	constructor({ message, timestamp, data }: IApiResponse<T>) {
		this.message = message;
		this.timestamp = timestamp;
		this.data = data;
	}

	message: string;
	timestamp: number;
	data: T;

	static success<R>({
		message,
		data,
	}: Pick<IApiResponse<R>, "message" | "data">): ApiResponse<R> {
		return new ApiResponse<R>({
			message: message,
			timestamp: +Date.now(),
			data,
		});
	}

	static exception({
		message,
	}: Pick<IApiResponse<undefined>, "message">): ApiResponse<undefined> {
		return new ApiResponse<undefined>({
			message: message,
			timestamp: +Date.now(),
			data: undefined,
		});
	}
}

export class ApiResponsePagination<T> implements IApiResponsePagination<T> {
	constructor({ message, timestamp, data, meta }: IApiResponsePagination<T>) {
		this.message = message;
		this.timestamp = timestamp;
		this.data = data;
		this.meta = meta;
	}

	message: string;
	timestamp: number;
	meta: IPagination;
	data: T[];

	static success<R>({
		message,
		data,
		meta,
	}: Pick<
		IApiResponsePagination<R>,
		"message" | "data" | "meta"
	>): ApiResponsePagination<R> {
		return new ApiResponsePagination<R>({
			message: message,
			timestamp: +Date.now(),
			meta,
			data,
		});
	}
}
