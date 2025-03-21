import { Module } from "@nestjs/common";
import { AppJwtModule } from "../../modules/app-jwt/app-jwt.module";
import { AuthsController } from "./controllers/auths.controller";
import { AuthsRepository } from "./repositories/auths.repository";
import { AuthsService } from "./services/auths.service";

@Module({
	imports: [AppJwtModule],
	controllers: [AuthsController],
	providers: [AuthsService, AuthsRepository],
})
export class AuthsModule {}
