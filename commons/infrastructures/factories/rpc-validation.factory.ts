import { RpcValidationException } from "@infrastructue";
import { ValidationError } from "class-validator";

export function rpcValidationExceptionFactory(errors: ValidationError[]): void {
	errors.forEach((error) => {
		throw new RpcValidationException(
			`${error.constraints?.[Object.keys(error.constraints)[0]]}`,
		);
	});
}
