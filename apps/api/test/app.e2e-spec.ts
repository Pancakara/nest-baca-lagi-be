import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { ApiAppModule } from "../src/app/api-app.module";

describe("ApiController (e2e)", () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [ApiAppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});
});
