import { IRpcExceptionReply } from "@contract";
import {
	ArgumentsHost,
	Catch,
	Logger,
	RpcExceptionFilter,
} from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { RpcUtils } from "@util";
import { Observable, throwError } from "rxjs";

@Catch(RpcException)
export class MainRpcExceptionFilter
	implements RpcExceptionFilter<RpcException>
{
	private readonly logger = new Logger(MainRpcExceptionFilter.name);

	catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
		const error = exception.getError();

		if (!RpcUtils.isRpcException(error)) {
			return throwError(() => error);
		}

		const errorResponse: IRpcExceptionReply = {
			message: error.message,
			status: error.status,
			timestamp: Date.now(),
		};

		return throwError(() => errorResponse);
	}
}
