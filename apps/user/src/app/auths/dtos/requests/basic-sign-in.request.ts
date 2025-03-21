import { IBasicAuthRequest } from "@contract";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class BasicSignInRequest implements IBasicAuthRequest {
	@IsEmail()
	@IsString()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}
