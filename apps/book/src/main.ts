import { NestFactory } from "@nestjs/core";
import { BookModule } from "./app/book-app.module";

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(BookModule);
	await app.listen(process.env.port ?? 3000);
}
bootstrap();
