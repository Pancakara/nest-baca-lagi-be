import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { PostModule } from "../src/app/post-app.module";

describe("PostController (e2e)", () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [PostModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});
});
