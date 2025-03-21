import { AppConfigService } from "@config/app-config";
import { DB } from "@contract";
import {
	Inject,
	Injectable,
	Logger,
	OnModuleDestroy,
	OnModuleInit,
} from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { PRISMA_MODULE_OPTIONS } from "../constants/di.key";
import { PrismaModuleOptions } from "../interfaces/prisma.interface";

@Injectable()
export class PrismaService
	extends PrismaClient<Prisma.PrismaClientOptions, "query">
	implements OnModuleInit, OnModuleDestroy
{
	private readonly logger = new Logger(PrismaService.name);
	private kysely: Kysely<DB>;

	constructor(
		private readonly appConfig: AppConfigService,
		@Inject(PRISMA_MODULE_OPTIONS)
		private readonly options?: PrismaModuleOptions,
	) {
		super({
			datasources: {
				db: {
					url: process.env.DATABASE_URL,
				},
			},
			log: [
				{
					emit: "event",
					level: "query",
				},
				{
					emit: "stdout",
					level: "error",
				},
				{
					emit: "stdout",
					level: "info",
				},
				{
					emit: "stdout",
					level: "warn",
				},
			],
		});

		this._databaseLogging();
	}

	async onModuleInit(): Promise<void> {
		await this.$connect();

		this.kysely = new Kysely<DB>({
			dialect: new PostgresDialect({
				pool: new Pool({
					connectionString: this.appConfig.databaseConfig.url,
				}),
			}),
		});

		this.logger.log(
			`Prisma connected to ${this.appConfig.databaseConfig.host}:${this.appConfig.databaseConfig.port}/${this.appConfig.databaseConfig.name}`,
		);
	}

	async onModuleDestroy(): Promise<void> {
		await this.$disconnect();
		await this.kysely.destroy();
	}

	queryBuilder(): Kysely<DB> {
		if (!this.kysely) {
			throw new Error("Kysely instance is not initialized yet");
		}
		return this.kysely;
	}

	private _databaseLogging(): void {
		if (this.options?.logs) {
			this.$on("query", (e) => {
				this.logger.verbose(e.query, e.params);
			});
		}
	}
}
