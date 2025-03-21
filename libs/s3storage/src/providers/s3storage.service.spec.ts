import { Test, TestingModule } from "@nestjs/testing";
import { S3storageService } from "./s3storage.service";

describe("S3storageService", () => {
	let service: S3storageService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [S3storageService],
		}).compile();

		service = module.get<S3storageService>(S3storageService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
