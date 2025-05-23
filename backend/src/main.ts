import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { Swagger } from "./shared/setup/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import { Configuration } from "./shared/setup/env-config/configuration";

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	const configService = app.get(ConfigService);
	const PORT = configService.get<Configuration["port"]>("port")!;

	app.set("query parser", "extended");

	app.useGlobalPipes(
		new ValidationPipe({
			// Автоматически трансформирует plain object в DTO на уровне методов контроллера
			transform: true,
			// Удаляет из объекта все свойства, которые не определены в DTO (у которых отсутствуют декораторы, то есть метаданные).
			// Можно использовать @Allow для того, чтобы оставить свойство.
			whitelist: true,
			skipUndefinedProperties: false,
			skipNullProperties: false,
		})
	);
	app.setGlobalPrefix("api");

	new Swagger().setup(app);

	await app.listen(PORT);
}

void bootstrap();
