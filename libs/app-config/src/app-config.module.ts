import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { amqpConfig } from "./configs/amqp.config";
import { appConfig } from "./configs/app.config";
import { bcryptConfig } from "./configs/bcrypt.config";
import { databaseConfig } from "./configs/database.config";
import { jwtConfig } from "./configs/jwt.config";
import { multipartConfig } from "./configs/multipart.config";
import { redisConfig } from "./configs/redis.config";
import { restApiAppConfig } from "./configs/rest-api-app.config";
import { s3Config } from "./configs/s3.config";
import { throttleConfig } from "./configs/throttle.config";
import { AppConfigService } from "./providers/app-config.service";
import { validateConfig } from "./validators/app-confing.validator";

@Global()
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			expandVariables: true,
			envFilePath: [
				".env.local",
				".env.development",
				".env.staging",
				".env.test",
				".env.production",
				".env",
			],
			load: [
				amqpConfig,
				bcryptConfig,
				restApiAppConfig,
				appConfig,
				jwtConfig,
				s3Config,
				redisConfig,
				throttleConfig,
				multipartConfig,
				databaseConfig,
			],
			validate: validateConfig,
		}),
	],
	providers: [AppConfigService],
	exports: [AppConfigService],
})
export class AppConfigModule {}
