import { registerAs } from "@nestjs/config";
import { IsDefined, IsString } from "class-validator";

/**
 * Represents the configuration for JWT settings.
 *
 * @typedef {Object} JwtConfig
 * @property {string} accessTokenSecret - The secret key for access tokens.
 * @property {string} accessTokenExpiresIn - The expiration time for access tokens.
 * @property {string} refreshTokenSecret - The secret key for refresh tokens.
 * @property {string} refreshTokenExpiresIn - The expiration time for refresh tokens.
 * @property {string} signatureTokenSecret - The secret key for signature tokens.
 * @property {string} signatureTokenExpiresIn - The expiration time for signature tokens.
 */
export type JwtConfig = {
	accessTokenSecret: string;
	accessTokenExpiresIn: string;
	refreshTokenSecret: string;
	refreshTokenExpiresIn: string;
	signatureTokenSecret: string;
	signatureTokenExpiresIn: string;
};

/**
 * Configuration for JWT (JSON Web Token) settings.
 *
 * This configuration is registered under the name 'jwtConfig' and provides
 * the necessary secrets and expiration times for access tokens, refresh tokens,
 * and signature tokens.
 *
 * @returns {JwtConfig} The JWT configuration object.
 *
 * Properties:
 * - `accessTokenSecret`: The secret key for access tokens, derived from the `JWT_SECRET` environment variable.
 * - `accessTokenExpiresIn`: The expiration time for access tokens, derived from the `JWT_EXPIRES_IN` environment variable.
 * - `refreshTokenSecret`: The secret key for refresh tokens, derived from the `JWT_REFRESH_SECRET` environment variable.
 * - `refreshTokenExpiresIn`: The expiration time for refresh tokens, derived from the `JWT_REFRESH_EXPIRES_IN` environment variable.
 * - `signatureTokenSecret`: The secret key for signature tokens, derived from the `JWT_SIGNATURE_SECRET` environment variable.
 * - `signatureTokenExpiresIn`: The expiration time for signature tokens, derived from the `JWT_SIGNATURE_EXPIRES_IN` environment variable.
 */
export const jwtConfig = registerAs(
	"jwtConfig",
	(): JwtConfig => ({
		accessTokenSecret: process.env.JWT_SECRET!,
		accessTokenExpiresIn: process.env.JWT_EXPIRES_IN!,
		refreshTokenSecret: process.env.JWT_REFRESH_SECRET!,
		refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN!,
		signatureTokenSecret: process.env.JWT_SIGNATURE_SECRET!,
		signatureTokenExpiresIn: process.env.JWT_SIGNATURE_EXPIRES_IN!,
	}),
);

/**
 *
 * Class representing the environment variables required for JWT configuration.
 *
 */
export class JwtConfigEnvironmentVariables {
	@IsString()
	@IsDefined()
	JWT_SECRET: string;

	@IsString()
	@IsDefined()
	JWT_EXPIRES_IN: string;

	@IsString()
	@IsDefined()
	JWT_REFRESH_SECRET: string;

	@IsString()
	@IsDefined()
	JWT_REFRESH_EXPIRES_IN: string;

	@IsString()
	@IsDefined()
	JWT_SIGNATURE_SECRET: string;

	@IsString()
	@IsDefined()
	JWT_SIGNATURE_EXPIRES_IN: string;
}
