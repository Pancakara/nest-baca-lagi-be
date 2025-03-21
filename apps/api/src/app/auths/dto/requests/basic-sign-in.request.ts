import { IBasicAuthRequest } from "@contract";
import { IsNotEmpty, IsString } from "class-validator";

export class BasicSignInRequest implements IBasicAuthRequest {
	@IsString()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}
