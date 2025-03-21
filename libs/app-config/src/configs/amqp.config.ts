import { registerAs } from "@nestjs/config";
import { Type } from "class-transformer";
import { IsDefined, IsNumber, IsString } from "class-validator";

/**
 * Represents the configuration for AMQP (Advanced Message Queuing Protocol).
 *
 * @property {string} host - The host address of the AMQP server.
 * @property {number} port - The port number of the AMQP server.
 * @property {string} username - The username for authentication with the AMQP server.
 * @property {string} password - The password for authentication with the AMQP server.
 * @property {string} url - The URL of the AMQP server.
 */
export type AmqpConfig = {
	host: string;
	port: number;
	username: string;
	password: string;
	url: string;
};

/**
 * Configuration object for AMQP.
 *
 * This configuration is registered under the name 'amqpConfig' and provides
 * settings for connecting to an AMQP server.
 *
 * @returns {AmqpConfig} The AMQP configuration object.
 *
 * Properties:
 * - `host`: The host address of the AMQP server, derived from the `AMQP_HOST` environment variable.
 * - `port`: The port number of the AMQP server, derived from the `AMQP_PORT` environment variable.
 * - `username`: The username for authentication with the AMQP server, derived from the `AMQP_USERNAME` environment variable.
 * - `password`: The password for authentication with the AMQP server, derived from the `AMQP_PASSWORD` environment variable.
 * - `url`: The URL of the AMQP server, derived from the `AMQP_URL` environment variable.
 */
export const amqpConfig = registerAs(
	"amqpConfig",
	(): AmqpConfig => ({
		host: process.env.AMQP_HOST!,
		port: parseInt(process.env.AMQP_PORT!, 10),
		username: process.env.AMQP_USERNAME!,
		password: process.env.AMQP_PASSWORD!,
		url: process.env.AMQP_URL!,
	}),
);

/**
 * Class representing the environment variables for AMQP configuration.
 *
 * @property {string} AMQP_HOST - The host address of the AMQP server.
 * @property {number} AMQP_PORT - The port number of the AMQP server.
 * @property {string} AMQP_USERNAME - The username for authentication with the AMQP server.
 * @property {string} AMQP_PASSWORD - The password for authentication with the AMQP server.
 * @property {string} AMQP_URL - The URL of the AMQP server.
 */
export class AmpqConfigEnvironmentVariables {
	@IsString()
	@IsDefined()
	AMQP_HOST: string;

	@Type(() => Number)
	@IsNumber()
	@IsDefined()
	AMQP_PORT: number;

	@IsString()
	@IsDefined()
	AMQP_USERNAME: string;

	@IsString()
	@IsDefined()
	AMQP_PASSWORD: string;

	@IsString()
	@IsDefined()
	AMQP_URL: string;
}
