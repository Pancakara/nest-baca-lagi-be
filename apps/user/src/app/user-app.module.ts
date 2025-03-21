import { AppCacheModule } from "@config/app-cache";
import { AppConfigModule, AppConfigService } from "@config/app-config";
import { PrismaModule } from "@database/prisma";
import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { S3StorageModule } from "@s3storage/s3storage";
import { AccountsModule } from "./accounts/accounts.module";
import { AuthsModule } from "./auths/auths.module";
import { ProfilesModule } from "./profiles/profiles.module";

@Module({
	imports: [
		AppConfigModule,
		AppCacheModule,
		PrismaModule.forRoot({
			logs: false,
		}),
		S3StorageModule.forRootAsync({
			imports: [AppConfigModule],
			inject: [AppConfigService],
			useFactory: (appConfig: AppConfigService) => {
				const s3Config = appConfig.s3Config;

				return {
					s3Options: {
						accessKeyId: s3Config.accessKeyId,
						secretAccessKey: s3Config.secretAccessKey,
						bucketName: s3Config.bucketName,
						endPoint: s3Config.endPoint,
						region: s3Config.region,
					},
				};
			},
		}),
		BullModule.forRootAsync({
			imports: [AppConfigModule],
			inject: [AppConfigService],
			useFactory: (appConfig: AppConfigService) => ({
				redis: {
					host: appConfig.redisConfig.host,
					port: appConfig.redisConfig.port,
					db: 1,
				},
			}),
		}),

		// Main modules
		AuthsModule,
		ProfilesModule,
		AccountsModule,
	],
})
export class UserAppModule {}
