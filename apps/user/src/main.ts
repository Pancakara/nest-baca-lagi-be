import { AppConfigLoaded } from "@config/app-config";
import {
	MainRpcExceptionFilter,
	rpcValidationExceptionFactory,
} from "@infrastructue";
import { ConsoleLogger, Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { UserAppModule } from "./app/user-app.module";

async function bootstrap(): Promise<void> {
	const config = await AppConfigLoaded.amqpConfig();

	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		UserAppModule,
		{
			logger: new ConsoleLogger({
				json: true,
				colors: true,
			}),
			transport: Transport.RMQ,
			options: {
				urls: [config.url],
				queue: "bacalagi_user_queue",
				noAck: true,
				queueOptions: {
					durable: false,
				},
			},
		},
	);

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
			forbidUnknownValues: true,
			exceptionFactory: (errors): void => rpcValidationExceptionFactory(errors),
		}),
	);

	// app.useGlobalInterceptors(new RpcReplyInterceptor());

	app.useGlobalFilters(new MainRpcExceptionFilter());

	const logger = new Logger("UserServiceBootstrap");

	await app.listen().then(() => {
		logger.log(`User Service is listening to AMQP on ${config.host}`);
	});
}

void bootstrap();
