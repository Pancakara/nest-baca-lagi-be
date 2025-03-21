import { registerAs } from "@nestjs/config";
import { Type } from "class-transformer";
import { IsDefined, IsNumber, IsString, MinLength } from "class-validator";

/**
 * Represents the application configuration.
 *
 * @property {Environment | string | undefined} env - The environment in which the application is running.
 * @property {string} host - The host address of the application.
 */
export type RestApiAppConfig = {
	host: string;
	port: number;
	version: number;
	url: string;
};

/**
 * Configuration object for the application.
 *
 * This configuration is registered under the name 'restApiAppConfig' and provides
 * environment-specific settings for the application.
 *
 * @returns {RestApiAppConfig} The application configuration object.
 *
 * Properties:
 * - `host`: The host address of the application, derived from the `REST_API_APP_HOST` environment variable.
 * - `port`: The port number of the application, derived from the `REST_API_APP_PORT` environment variable.
 * - `version`: The version number of the application, derived from the `REST_API_APP_VERSION` environment variable.
 * - `url`: The URL of the application, derived from the `REST_API_APP_URL` environment variable.
 */
export const restApiAppConfig = registerAs(
	"restApiAppConfig",
	(): RestApiAppConfig => ({
		host: process.env.REST_API_APP_HOST!,
		port: parseInt(process.env.REST_API_APP_PORT!, 10),
		version: parseInt(process.env.REST_API_APP_VERSION!, 10),
		url: process.env.REST_API_APP_URL!,
	}),
);

/**
 * Class representing the environment variables for the application configuration.
 *
 * @property {string} REST_API_APP_HOST - The host address of the application.
 * @property {number} REST_API_APP_PORT - The port number of the application.
 * @property {number} REST_API_APP_VERSION - The version number of the application.
 * @property {string} REST_API_APP_URL - The URL of the application.
 */
export class RestApiAppConfigEnvironmentVariables {
	@IsDefined()
	@IsString()
	@MinLength(1)
	REST_API_APP_HOST: string;

	@Type(() => Number)
	@IsDefined()
	@IsNumber()
	REST_API_APP_PORT: number;

	@Type(() => Number)
	@IsDefined()
	@IsNumber()
	REST_API_APP_VERSION: number;

	@IsDefined()
	@IsString()
	@MinLength(1)
	REST_API_APP_URL: string;
}
