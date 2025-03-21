import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { UserAppModule } from "../src/app/user-app.module";

describe("UserController (e2e)", () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [UserAppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});
});
