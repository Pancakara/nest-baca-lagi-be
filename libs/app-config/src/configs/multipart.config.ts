import { registerAs } from "@nestjs/config";
import { Type } from "class-transformer";
import { IsDefined, IsNumber } from "class-validator";

/**
 * Configuration settings for handling multipart form data.
 *
 * @typedef {Object} MultipartConfig
 * @property {number} fieldMaxCount - The maximum number of fields allowed in the form.
 * @property {number} fieldMaxSize - The maximum size (in bytes) allowed for each field.
 * @property {number} fileMaxCount - The maximum number of files allowed in the form.
 * @property {number} fileMaxSize - The maximum size (in bytes) allowed for each file.
 */
export type MultipartConfig = {
	fieldMaxCount: number;
	fieldMaxSize: number;
	fileMaxCount: number;
	fileMaxSize: number;
};

/**
 * Configuration for multipart handling.
 *
 * This configuration is registered under the name 'multipartConfig' and provides
 * settings for handling multipart form data, such as the maximum number of fields,
 * maximum size of fields, maximum number of files, and maximum size of files.
 *
 * @returns {MultipartConfig} The multipart configuration object.
 *
 * Properties:
 * - `fieldMaxCount` (number): The maximum number of fields allowed in the form, derived from the `MULTIPART_FIELD_MAX_COUNT` environment variable.
 * - `fieldMaxSize` (number): The maximum size (in bytes) allowed for each field, derived from the `MULTIPART_FIELD_MAX_SIZE` environment variable.
 * - `fileMaxCount` (number): The maximum number of files allowed in the form, derived from the `MULTIPART_FILE_MAX_COUNT` environment variable.
 * - `fileMaxSize` (number): The maximum size (in bytes) allowed for each file, derived from the `MULTIPART_FILE_MAX_SIZE` environment variable.
 */
export const multipartConfig = registerAs(
	"multipartConfig",
	(): MultipartConfig => ({
		fieldMaxCount: parseInt(process.env.MULTIPART_FIELD_MAX_COUNT!, 10),
		fieldMaxSize: parseInt(process.env.MULTIPART_FIELD_MAX_SIZE!, 10),
		fileMaxCount: parseInt(process.env.MULTIPART_FILE_MAX_COUNT!, 10),
		fileMaxSize: parseInt(process.env.MULTIPART_FILE_MAX_SIZE!, 10),
	}),
);

/**
 * Class representing the environment variables for multipart configuration.
 *
 * This class uses decorators to enforce validation rules on the environment variables.
 *
 * @class
 */
export class MultipartConfigEnvironmentVariables {
	@Type(() => Number)
	@IsNumber()
	@IsDefined()
	MULTIPART_FIELD_MAX_COUNT: number;

	@Type(() => Number)
	@IsNumber()
	@IsDefined()
	MULTIPART_FIELD_MAX_SIZE: number;

	@Type(() => Number)
	@IsNumber()
	@IsDefined()
	MULTIPART_FILE_MAX_COUNT: number;

	@Type(() => Number)
	@IsNumber()
	@IsDefined()
	MULTIPART_FILE_MAX_SIZE: number;
}
