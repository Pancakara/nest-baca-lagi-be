import { ApiResponse } from "@contract";
import { Body, Controller, Post } from "@nestjs/common";
import { BasicSignInRequest } from "../dto/requests/basic-sign-in.request";
import { AuthsService } from "../services/auths.service";

@Controller("auths")
export class AuthsController {
	constructor(private readonly service: AuthsService) {}

	// @Get()
	// async getUser(@Query("id") id: string): Promise<any> {
	// 	return lastValueFrom(this.client.send({ cmd: "get_hello" }, { id: id }));
	// }

	@Post("sign-in")
	async basicSignIn(
		@Body() reqData: BasicSignInRequest,
	): Promise<ApiResponse<any>> {
		const result = await this.service.basicSignIn(reqData);

		return ApiResponse.success({
			message: "Sign in successfully",
			data: result,
		});
	}
}
