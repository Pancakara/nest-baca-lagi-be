import { registerAs } from "@nestjs/config";
import { IsDefined, IsEnum, IsString } from "class-validator";

/**
 * Enum representing different environments for the application.
 *
 * @enum {string}
 * @property {string} Dev - Represents the development environment.
 * @property {string} Staging - Represents the staging environment.
 * @property {string} Prod - Represents the production environment.
 * @property {string} Test - Represents the test environment.
 */
export enum Environment {
	LOCAL = "local",
	DEV = "dev",
	STAGING = "staging",
	PROD = "prod",
	TEST = "test",
}

/**
 * Represents the application configuration.
 *
 * @property {Environment | string | undefined} env - The environment in which the application is running.
 * @property {string} appName - The name of the application.
 */
export type AppConfig = {
	env: Environment;
	appName: string;
	timezone: string;
};

/**
 * Configuration object for the application.
 *
 * This configuration is registered under the name 'appConfig' and provides
 * environment-specific settings for the application.
 *
 * @returns {AppConfig} The application configuration object.
 *
 * Properties:
 * - `env`: The current environment of the application, derived from the `NODE_ENV` environment variable.
 *          Defaults to `Environment.Dev` if `NODE_ENV` is not set or does not match any known environment.
 * - `host`: The host address of the application, derived from the `APP_HOST` environment variable.
 */
export const appConfig = registerAs(
	"appConfig",
	(): AppConfig => ({
		env:
			(process.env.NODE_ENV &&
				Environment[
					process.env.NODE_ENV.toUpperCase() as keyof typeof Environment
				]) ||
			Environment.DEV,
		appName: process.env.APP_NAME!,
		timezone: process.env.TZ!,
	}),
);

/**
 * Class representing the environment variables for the application configuration.
 *
 * @property {Environment} NODE_ENV - The environment in which the application is running.
 * @property {string} APP_NAME - The name of the application.
 */
export class AppConfigEnvironmentVariables {
	@IsEnum(Environment)
	@IsDefined()
	NODE_ENV: Environment;

	@IsString()
	@IsDefined()
	APP_NAME: string;

	@IsString()
	@IsDefined()
	TZ: string;
}
