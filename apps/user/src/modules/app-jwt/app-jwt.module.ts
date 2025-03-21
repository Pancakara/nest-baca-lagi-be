import { AppCacheModule } from "@config/app-cache";
import { AppConfigModule, AppConfigService } from "@config/app-config";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AppJwtService } from "./services/app-jwt.service";

@Module({
	imports: [
		AppConfigModule,
		AppCacheModule,
		JwtModule.registerAsync({
			inject: [AppConfigService],
			useFactory: (config: AppConfigService) => ({
				secret: config.jwtConfig.accessTokenSecret,
				signOptions: { expiresIn: config.jwtConfig.accessTokenExpiresIn },
			}),
		}),
	],
	providers: [AppJwtService],
	exports: [AppJwtService],
})
export class AppJwtModule {}
