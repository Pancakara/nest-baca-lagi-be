import { NestFactory } from "@nestjs/core";
import { PostModule } from "./app/post-app.module";

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(PostModule);
	await app.listen(process.env.port ?? 3000);
}
bootstrap();
