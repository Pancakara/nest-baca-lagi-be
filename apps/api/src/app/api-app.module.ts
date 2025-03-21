import { AppConfigModule, AppConfigService } from "@config/app-config";
import { Module } from "@nestjs/common";
import {
	ClientProvider,
	ClientsModule,
	Transport,
} from "@nestjs/microservices";
import { ApiDiKey } from "../constants/di.key";
import { AuthsModule } from "./auths/auths.module";

@Module({
	imports: [
		AppConfigModule,
		ClientsModule.registerAsync({
			isGlobal: true,
			clients: [
				{
					imports: [AppConfigModule],
					inject: [AppConfigService],
					name: ApiDiKey.USER_SERVICE_CLIENT,
					useFactory: (
						config: AppConfigService,
					): Promise<ClientProvider> | ClientProvider => ({
						transport: Transport.RMQ,
						options: {
							urls: [config.amqpConfig.url],
							queue: "bacalagi_user_queue",
							queueOptions: {
								durable: false,
							},
						},
					}),
				},
			],
		}),
		AuthsModule,
	],
})
export class ApiAppModule {}
