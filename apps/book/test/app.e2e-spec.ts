import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { BookModule } from "../src/app/book-app.module";

describe("BookController (e2e)", () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [BookModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});
});
