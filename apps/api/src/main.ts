import { AppConfigService } from "@config/app-config";
import { apiValidationExceptionFactory } from "@infrastructue";
import HttpExceptionFilter from "@infrastructue/filters/http-exception.fitler";
import { ConsoleLogger, Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ApiAppModule } from "./app/api-app.module";

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(ApiAppModule, {
		logger: new ConsoleLogger({
			json: true,
			colors: true,
		}),
	});

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			exceptionFactory: (errors): any => apiValidationExceptionFactory(errors),
		}),
	);

	app.useGlobalFilters(new HttpExceptionFilter());

	const config = app.get(AppConfigService).restApiAppConfig;

	await app.listen(config.port, config.host);

	new Logger("Api App Service").log(
		`Api App Service is running on: ${await app.getUrl()}`,
	);
}

void bootstrap();
