import { Module } from "@nestjs/common";
import { AuthsController } from "./controllers/auths.controller";
import { AuthsService } from "./services/auths.service";

@Module({
	controllers: [AuthsController],
	providers: [AuthsService],
})
export class AuthsModule {}
